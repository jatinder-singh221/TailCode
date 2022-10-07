import { combineReducers } from "redux"
import editor from "./editorSlice"
import app from "./appSlice"
import auth  from "./authSlice"

const root = combineReducers({
    editor: editor,
    app: app,
    auth: auth
})

export default root