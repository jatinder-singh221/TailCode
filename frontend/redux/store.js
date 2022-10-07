import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import root from './reducers/root'

const Mode = process.env.NODE_ENV

const initStore = () => {
    if (Mode === 'development') {
        return configureStore({
            reducer: root,
            devTools: true
        })
    }
    return configureStore({
        reducer: root,
        devTools: false
    })
}

export const wrapper = createWrapper(initStore)