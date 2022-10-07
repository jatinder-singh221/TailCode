import cookie from 'cookie'
import { GetHeader, PostHeader, PutHeader } from "@/provider/provider.Headers"
import { AUTHENCIATED, USER, NOTIFICATIONS } from "../reducers/authSlice"
import { setRedirect, setError, setMessage } from "./redux.comman"
import { UPDATE } from '../reducers/appSlice'
import localforage from 'localforage'


export const userProfileInfo = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const isAuthenciated = state.auth.authenciated ?? false
        const sessionStorageData = JSON.parse(sessionStorage.getItem('profile')) ?? false
        
        if (!sessionStorageData && isAuthenciated) {
            const location = '/api/account/api.userProfileInfo'
            const api = await fetch(location)
            switch (api.status) {
                case 200:
                    const apiRes = await api.json()
                    dispatch(USER(apiRes))
                    sessionStorage.setItem('profile', JSON.stringify(apiRes))
                    break;
                case 400:
                case 429:
                case 404:
                case 500:
                    dispatch(setRedirect(`/${api.status}`))
                    break;
            }
        } else dispatch(USER(sessionStorageData))
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const sessionVerficiation = async (req, res) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || '')
        const access = cookies._Session_AID_ ?? false
        const refresh = cookies._Session_RID_ ?? false

        if (access && refresh) return 200

        else if (!access && refresh) {
            const location = process.env.NEXT_PUBLIC_API_URL + '/refresh/token'
            const body = JSON.stringify({ refresh: refresh })
            const api = await fetch(location, { ...PostHeader, body: body })
            switch (api.status) {
                case 200:
                    const apiRes = await api.json()
                    res.setHeader('Set-Cookie', [
                        cookie.serialize(
                            '_Session_AID_', String(apiRes.access), {
                            path: '/', httpOnly: true, maxAge: 60 * 60 * 24, 
                            sameSite: 'strict',
                            secure: process.env.NODE_ENV !== 'development',
                        }),

                        cookie.serialize(
                            '_Session_RID_', String(apiRes.refresh), {
                            path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 10, 
                            sameSite: 'strict',
                            secure: process.env.NODE_ENV !== 'development',
                        })
                    ])
                    return 200

                default:
                    return api.status
            }
        } else return 401
    } catch (error) { return 500 }
}

export const OtpProvider = (username) => async (dispatch) => {
    try {
        const location = process.env.NEXT_PUBLIC_API_URL + `/authenciation/${username}/otp`
        const api = await fetch(location)
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                dispatch(setMessage(apiRes.username))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const authenciateUserApi = (credentials) => async (dispatch) => {
    const body = JSON.stringify(credentials)
    const api = await fetch('/api/obtainToken', { ...PostHeader, body: body })
    switch (api.status) {
        case 200:
            dispatch(AUTHENCIATED(true))
            dispatch(UPDATE('Signing in ....'))
            break;
        case 400:
        case 429:
        case 500:
            dispatch(setRedirect(`/${api.status}`))
            break;
        case 401:
            dispatch(setError(true))
            break;
    }
}

export const usernameStatus = async (username) => {
    try {
        const location = process.env.NEXT_PUBLIC_API_URL + `/authenciation/${username}/user`
        const api = await fetch(location)
        return api.status
    } catch (error) {
        return 500
    }
}

export const otpVerfication = async (username, otp) => {
    try {
        const body = JSON.stringify({ 'otp': otp })
        const location = process.env.NEXT_PUBLIC_API_URL + `/authenciation/${username}/otp`
        const api = await fetch(location, { ...PostHeader, body: body })
        return api.status
    } catch (error) {
        return 500
    }
}


export const registerUserApi = (values) => async (dispatch) => {
    try {
        const location = process.env.NEXT_PUBLIC_API_URL + `/authenciation/user/register`
        const body = JSON.stringify(values)
        const api = await fetch(location, { ...PostHeader, body: body })
        switch (api.status) {
            case 201:
                const value = { 'username': values.username, 'password': values.password }
                dispatch(authenciateUserApi(value))
                dispatch(UPDATE('Profile created'))
                break;
            case 400:
            case 429:
            case 500:
                dispatch(setRedirect(api.status))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const resetPasswordApi = (values) => async (dispatch) => {
    try {
        const location = process.env.NEXT_PUBLIC_API_URL + `/authenciation/user/forget`
        const body = JSON.stringify(values)
        const api = await fetch(location, { ...PutHeader, body: body })
        switch (api.status) {
            case 200:
                dispatch(setRedirect('/signin'))
                dispatch(UPDATE('Password change successfull'))
                break;
            case 400:
            case 429:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}


export const updateBasicInfo = (values) => async (dispatch) => {
    try {
        const body = JSON.stringify(values)
        const api = await fetch('/api/account/updateBasicinfo', { ...PutHeader, body: body })
        switch (api.status) {
            case 200:
                sessionStorage.removeItem('profile')
                dispatch(userProfileInfo())
                dispatch(UPDATE('BASIC INFO UPDATED'))
                break;
            case 400:
            case 429:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const updateContactInfo = (values) => async (dispatch) => {
    try {
        const body = JSON.stringify(values)
        const api = await fetch('/api/account/updateContactinfo', { ...PutHeader, body: body })
        switch (api.status) {
            case 200:
                sessionStorage.removeItem('profile')
                dispatch(userProfileInfo())
                dispatch(UPDATE('CONTACT INFO UPDATED'))
                break;
            case 400:
            case 429:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const updateUserProfile = (formData) => async (dispatch) => {
    try {
        const body = formData
        const api = await fetch('/api/account/updateUserProfile', { method: 'PUT', body: body })
        switch (api.status) {
            case 200:
                sessionStorage.removeItem('profile')
                dispatch(userProfileInfo())
                dispatch(UPDATE('Profile image updated'))
                break;
            case 400:
            case 429:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const updatePassword = (values) => async (dispatch) => {
    try {
        const body = JSON.stringify(values)
        const api = await fetch('/api/account/updatePassword', { ...PutHeader, body: body })
        switch (api.status) {
            case 200:
                dispatch(UPDATE('Password Updated'))
                break;
            case 400:
            case 429:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const userNotifications = () => async (dispatch, getState) => {
    try {
        const state = getState()
        const isAuthenciated = state.auth.authenciated ?? false
        const sessionData = JSON.parse(sessionStorage.getItem('notifications')) ?? false
        if (!sessionData && isAuthenciated) {
            const location = '/api/account/userNotifications'
            const api = await fetch(location)
            switch (api.status) {
                case 200:
                    const apiRes = await api.json()
                    dispatch(NOTIFICATIONS(apiRes))
                    sessionStorage.setItem('notifications', JSON.stringify(apiRes))
                    break;
                case 400:
                case 429:
                case 404:
                case 500:
                    dispatch(setRedirect(`/${api.status}`))
                    break;
            }
        } else dispatch(NOTIFICATIONS(sessionData))
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const signOutUser = () => async (dispatch) => {
    const api = await fetch('/api/logout', { ...GetHeader })
    switch (api.status) {
        case 200:
            dispatch(AUTHENCIATED(false))
            localStorage.clear()
            sessionStorage.clear()
            localforage.clear()
            break;
        case 400:
        case 429:
        case 500:
            dispatch(setRedirect(`/${api.status}`))
            break;;
    }
}
