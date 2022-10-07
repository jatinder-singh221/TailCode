import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

/*
    ! Caution donot provide initial value 
    application may behave unexpected 
*/

const initialState = {}

export const editor = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        TREE: (state, action) => {
            state.tree = action.payload
        },
        TAB: (state, action) => {
            if (!state.tab) {
                state.tab = action.payload
            }
            else {
                state.tab = [].concat(state.tab, action.payload)
            }
        },
        CLOSETAB: (state, action) => {
            state.tab = action.payload
        },
        SAVEUNSAVEDATA: (state, action) => {
            const file = state.tab.find(element => element.path === action.payload.path)
            file.saved = action.payload.bool
            file.data = action.payload.value
        },
        THEME: (state, action) => {
            state.themes = action.payload
        },
        FONT: (state, action) => {
            state.font = action.payload
        },
        ACTIVETAB: (state, action) => {
            state.activetab = action.payload
        },
        EDITORLANG: (state, action) => {
            state.editorlang = action.payload
        },
        EDITORVALUE: (state, action) => {
            state.editorvalue = action.payload
        }
    },
    // HYDRATION
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return { ...state, ...action.payload.editor }
        }
    }
})

// actions
export const { 
    TREE, 
    TAB, 
    THEME, 
    FONT, 
    EDITORLANG, 
    ACTIVETAB, 
    EDITORVALUE, 
    CLOSETAB, 
    SAVEUNSAVEDATA 
} = editor.actions

// value
export const tree = state => state.editor.tree
export const tab = state => state.editor.tab
export const font = state => state.editor.font
export const themes = state => state.editor.themes
export const activetab = state => state.editor.activetab
export const editorlang = state => state.editor.editorlang
export const editorvalue = state => state.editor.editorvalue

// reducers
export default editor.reducer