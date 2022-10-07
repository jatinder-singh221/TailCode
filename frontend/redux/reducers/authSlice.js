import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

/*
    ! Caution donot provide initial value 
    application may behave unexpected 
*/

const initialState = {}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        AUTHENCIATED: (state, action) => {
            state.authenciated = action.payload
        },
        USER: (state, action) => {
            state.user = action.payload
        },
        NOTIFICATIONS: (state, action) => {
            state.notification = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return { ...state, ...action.payload.auth }
        }
    }
})

export const { AUTHENCIATED, USER, NOTIFICATIONS } = auth.actions

export const authenciated = state => state.auth.authenciated
export const notification = state => state.auth.notification
export const user = state => state.auth.user

export default auth.reducer