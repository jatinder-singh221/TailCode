import localforage from "localforage"

import { GetHeader, PostHeader } from "@/provider/provider.Headers"
import {
    TREE,
    TAB,
    ACTIVETAB,
    EDITORVALUE,
    CLOSETAB,
    EDITORLANG,
    SAVEUNSAVEDATA
} from "../reducers/editorSlice"
import { fetchSsr, setRedirect } from "./redux.comman"
import { UPDATE } from "../reducers/appSlice"


export const loadTree = (id) => async (dispatch) => {
    try {
        const query = await localforage.getItem(`${id}-tree`) ?? false
        if (query) {
            dispatch(TREE(query))
        }
        else {
            const location = `/api/${id}/tree`
            const api = await fetch(location, GetHeader)
            switch (api.status) {
                case 200:
                    const apiRes = await api.json()
                    dispatch(TREE(apiRes))
                    await localforage.setItem(`${id}-tree`, apiRes)
                    break;
                case 401:
                    dispatch(setRedirect('/signin'))
                    break;
                case 400:
                case 404:
                case 500:
                    dispatch(setRedirect(`/${api.status}`))
                    break;
            }
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const addFolder = (id, path, name) => async (dispatch) => {
    try {
        const location = `/api/${id}/addFolder`
        const body = JSON.stringify({ path: path, name: name })
        const api = await fetch(location, { ...PostHeader, body: body })

        switch (api.status) {
            case 201:
                const apiRes = await api.json()
                dispatch(TREE(apiRes))
                dispatch(UPDATE('Folder created'))
                await localforage.setItem(`${id}-tree`, apiRes)
                break;
            case 401:
                dispatch(setRedirect('/signin'))
                break;
            case 400:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const deleteFolder = (id, path) => async (dispatch) => {
    try {
        const location = `/api/${id}/deleteFolder`
        const body = JSON.stringify({ path: path })
        const api = await fetch(location, { ...PostHeader, body: body })

        switch (api.status) {
            case 202:
                const apiRes = await api.json()
                dispatch(TREE(apiRes))
                dispatch(UPDATE('Folder deleted'))
                await localforage.setItem(`${id}-tree`, apiRes)
                break;
            case 401:
                dispatch(setRedirect('/signin'))
                break;
            case 400:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const addFile = (id, path, name) => async (dispatch) => {
    try {
        const location = `/api/${id}/addFile`
        const body = JSON.stringify({ path: path, name: name })
        const api = await fetch(location, { ...PostHeader, body: body })

        switch (api.status) {
            case 201:
                const apiRes = await api.json()
                dispatch(TREE(apiRes))
                dispatch(UPDATE('File created'))
                await localforage.setItem(`${id}-tree`, apiRes)
                break;
            case 401:
                dispatch(setRedirect('/signin'))
                break;
            case 400:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const deleteFile = (id, path) => async (dispatch) => {
    try {
        const location = `/api/${id}/deleteFile`
        const body = JSON.stringify({ path: path })
        const api = await fetch(location, { ...PostHeader, body: body })

        switch (api.status) {
            case 202:
                const apiRes = await api.json()
                dispatch(TREE(apiRes))
                dispatch(UPDATE('File Deleted'))
                await localforage.setItem(`${id}-tree`, apiRes)
                break;
            case 401:
                dispatch(setRedirect('/signin'))
                break;
            case 400:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const rename = (id, path, renamePath) => async (dispatch) => {
    try {
        const location = `/api/${id}/rename`
        const body = JSON.stringify({ path: path, rename: renamePath })
        const api = await fetch(location, { ...PostHeader, body: body })

        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                dispatch(TREE(apiRes))
                dispatch(UPDATE('Renamed successfull'))
                await localforage.setItem(`${id}-tree`, apiRes)
                break;
            case 401:
                dispatch(setRedirect('/signin'))
                break;
            case 400:
            case 404:
            case 500:
                dispatch(setRedirect(`/${api.status}`))
                break;
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const openTab = (id,name, path) => async (dispatch, getState) => {
    try {
        const query = await localforage.getItem(`${id}-tab`) ?? false
        
        if (query) {
            const queryfile = query.some(element => element.path === path)
            const extension = name.split('.').pop()

            extension === 'js' || extension === 'jsx' || extension === 'ts'
                || extension === 'tsx' ?
                dispatch(EDITORLANG('javascript')) : dispatch(EDITORLANG(extension))

            if (queryfile) {
                const queryFileData = query.find(element => element.path === path)
                const getOpenTab = getState().editor.tab?.find(element => element.path === path)
                if (getOpenTab) {
                    dispatch(EDITORVALUE(''))
                    dispatch(ACTIVETAB({ name: name, path: path }))
                    dispatch(EDITORVALUE(queryFileData.data))
                }
                else {
                    dispatch(TAB([queryFileData]))
                    dispatch(ACTIVETAB({ name: name, path: path }))
                    dispatch(EDITORVALUE(queryFileData.data))
                }
            } else {
                const location = `/api/${id}/openTab`
                const body = JSON.stringify({ path: path })
                const api = await fetch(location, { ...PostHeader, body: body })
                switch (api.status) {
                    case 200:
                        const apiRes = await api.json()
                        let itemData = {
                            name: name,
                            path: path,
                            saved: true,
                            data: apiRes
                        }
                        await localforage.setItem(`${id}-tab`, [].concat(query, itemData))
                        dispatch(TAB([itemData]))
                        dispatch(ACTIVETAB({ name: name, path: path }))
                        dispatch(EDITORVALUE(apiRes))
                        break;
                    case 400:
                    case 404:
                    case 500:
                        dispatch(setRedirect(`/${api.status}`))
                        break;
                }
            }
        } else {
            const location = `/api/${id}/openTab`
            const body = JSON.stringify({ path: path })
            const api = await fetch(location, { ...PostHeader, body: body })

            switch (api.status) {
                case 200:
                    const apiRes = await api.json()
                    let itemData = {
                        name: name, path: path,
                        saved: true, data: apiRes
                    }
                    await localforage.setItem(`${id}-tab`, [itemData])
                    dispatch(TAB([itemData]))
                    dispatch(ACTIVETAB({ name: name, path: path }))
                    const extension = name.split('.').pop()
                    extension === 'js' || extension === 'jsx' || extension === 'ts'
                    || extension === 'tsx' ?
                    dispatch(EDITORLANG('javascript')) : dispatch(EDITORLANG(extension))
                    dispatch(EDITORVALUE(apiRes))
                    break;
                case 401:
                    dispatch(setRedirect('/signin'))
                    break;
                case 400:
                case 404:
                case 500:
                    dispatch(setRedirect(`/${api.status}`))
                    break;
            }
        }

    } catch (error) {
        console.log(error);
        // dispatch(setRedirect('/500'))
    }
}

export const closeTab = (path) => (dispatch, getState) => {
    try {
        const openTabsIndex = getState().editor?.tab
        const closeTabIndex = getState().editor.tab?.findIndex(element => element.path === path)

        if (openTabsIndex.length > 1) {
            if (closeTabIndex !== 0) {
                const extension = openTabsIndex[closeTabIndex - 1].name.split('.').pop()

                extension === 'js' || extension === 'jsx' || extension === 'ts'
                    || extension === 'tsx' ?
                    dispatch(EDITORLANG('javascript')) : dispatch(EDITORLANG(extension))
                dispatch(ACTIVETAB({ name: openTabsIndex[closeTabIndex - 1].name, path: openTabsIndex[closeTabIndex - 1].path }))
                dispatch(EDITORVALUE(openTabsIndex[closeTabIndex - 1].data))
            }
            else {
                const extension = openTabsIndex[1].name.split('.').pop()

                extension === 'js' || extension === 'jsx' || extension === 'ts'
                    || extension === 'tsx' ?
                    dispatch(EDITORLANG('javascript')) : dispatch(EDITORLANG(extension))
                dispatch(ACTIVETAB({ name: openTabsIndex[1].name, path: openTabsIndex[1].path }))
                dispatch(EDITORVALUE(openTabsIndex[1].data))
            }
            const filterOpenTab = getState().editor.tab?.filter(element => element.path !== path)
            dispatch(CLOSETAB(filterOpenTab))
        }
        else dispatch(CLOSETAB(null))
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const changeFileSave = (path, bool, value) => async (dispatch) => {
    try {
        dispatch(SAVEUNSAVEDATA({ path, bool, value }))
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const applyChangeToContainer = () => async (dispatch) => {
    try {   
        const liveData = JSON.parse(sessionStorage.getItem('live')) ?? false
        const url = `/playground/${liveData.containerId}/restartContainer`
        const api = await fetchSsr(url)
        switch (api.status) {
            case 200:
                break;
            case 400:
            case 404:
            case 429:
            case 500:
                router.push(`/${api.status}`)
        }
        
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const deleteContainer = () => async (dispatch) => {
    try {   
        const liveData = JSON.parse(sessionStorage.getItem('live')) ?? false
        if (liveData){
            const url = `/playground/${liveData.containerId}/deleteContainer`
            const api = await fetchSsr(url)
            switch (api.status) {
                case 200:
                    sessionStorage.removeItem('live')
                    break;
                case 400:
                case 404:
                case 429:
                case 500:
                    router.push(`/${api.status}`)
            }
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}

export const saveFile = (id, path, value) => async (dispatch, getState) => {
    try {
        const file = getState().editor.tab?.find(element => element.path === path) ?? false
        if (file) {
            const location = `/api/${id}/write`
            const path = file?.path
            const body = JSON.stringify({ path: path, value: value })

            const api = await fetch(location, { ...PostHeader, body: body })

            switch (api.status) {
                case 200:
                    const query = await localforage.getItem(`${id}-tab`)
                    const file = query?.find(element => element.path === path)
                    file.data = value
                    await localforage.setItem(`${id}-tab`, query)
                    dispatch(changeFileSave(path, true, value))
                    dispatch(applyChangeToContainer())
                    dispatch(UPDATE('Changes saved'))
                    break;
                case 401:
                    dispatch(setRedirect('/signin'))
                    break;
                case 400:
                case 404:
                case 500:
                    dispatch(setRedirect(`/${api.status}`))
                    break;
            }
        }
    } catch (error) {
        dispatch(setRedirect('/500'))
    }
}
