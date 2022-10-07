import cookie from 'cookie'
import { REDIRECT, ERROR, MESSAGE } from "../reducers/appSlice"
import { GetHeader } from "@/provider/provider.Headers";

export const setRedirect = (redirectUrl) => async (dispatch) => {
    dispatch(REDIRECT(redirectUrl))
    setTimeout(() => {
        dispatch(REDIRECT(null))
    }, 100);
}

export const setError = (error) => async (dispatch) => {
    dispatch(ERROR(error))
    setTimeout(() => {
        dispatch(ERROR(null))
    }, 100);
}

export const setMessage = (message) => async (dispatch) => {
    dispatch(MESSAGE(message))
}

export const fetchSsr = async (url) => {
    try {
        const location = process.env.NEXT_PUBLIC_API_URL + url
        const api = await fetch(location, GetHeader)
        return api
    } catch (error) {
        const err = { status: 500 }
        return err
    }
}

