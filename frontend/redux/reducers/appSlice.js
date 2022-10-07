import { createSlice } from '@reduxjs/toolkit'

/*
    ! Caution donot provide initial value 
    application may behave unexpected 
*/

const initialState = {}

export const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        REDIRECT: (state, action) => {
            state.redirect = action.payload
        },
        ERROR: (state, action) => {
            state.error = action.payload
        },
        MESSAGE: (state, action) => {
            state.message = action.payload
        },
        UPDATE: (state, action) => {
            state.update = action.payload
        },
        DIALOG: (state, action) => {
            state.dialog = action.payload
        }
    }
})

export const { REDIRECT, ERROR, MESSAGE, UPDATE, DIALOG } = app.actions

export const redirect = state => state.app.redirect
export const error = state => state.app.error
export const message = state => state.app.message
export const update = state => state.app.update
export const dialog = state => state.app.dialog

export default app.reducer