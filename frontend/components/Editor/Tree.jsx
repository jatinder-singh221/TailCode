import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import TreeFiles from './TreeFiles'
import EditorNewFileFolder from './EditorNewFileFolder'
import EditorRename from './EditorRename'
import {
    PencilIcon,
    DocumentAddIcon,
    FolderAddIcon,
    TrashIcon
}
    from '@heroicons/react/outline'
import { FolderIcon } from '@heroicons/react/solid'
import { deleteFolder } from '@/redux/api/redux.editor'

export default function Tree(props) {

    const dispatch = useDispatch()

    const [hoverIndex, sethoverIndex] = useState(null)
    const [createNew, setcreateNew] = useState({})
    const [rename, setrename] = useState({})

    const handleHover = useCallback((name) => {
        sethoverIndex(name)
    }, [])

    const handleHoverLeave = useCallback(() => {
        sethoverIndex(null)
    }, [])

    const handleNewFileOrFolder = useCallback((typeOf, name) => {
        const getSiblings = props.data.find(object => object.name === name)
        const siblingType = getSiblings.children.filter(object => object.type === typeOf)
        const current = document.getElementById(name)
        if (typeOf === 'directory') {
            const setData = { type: typeOf, name: name, dataSet: siblingType }
            current.open = true
            setcreateNew(setData)
        }
        else {
            const setData = { type: typeOf, name: name, dataSet: siblingType }
            current.open = true
            setcreateNew(setData)
        }
    }, [props])

    const handleRename = useCallback((typeOf, name, src) => {
        const sibling = props.data.filter(object => object.type === typeOf)
        if (typeOf === 'directory') {
            const setData = { type: typeOf, name: name, src: src, dataSet: sibling }
            setrename(setData)
        }
        else {
            const setData = { type: typeOf, name: name, src: src, dataSet: sibling }
            setrename(setData)
        }
    }, [props])

    const handleDelete = (name, src) => {
        const confirmation = confirm(`Do you want to delete ${name}`)
        if (confirmation)
            dispatch(deleteFolder(props.playgroundId, src))
    }

    return (
        <div className='space-y-1 border-l ml-2 my-1 border-black/10 dark:border-white/10'>
            {props.data?.map((data, index) => {
                if (data.type === 'directory') {
                    return <div className='relative' key={index}>
                        {hoverIndex === data.name &&
                            <div className=' absolute h-7 top-0 right-2 px-2 backdrop-blur backdrop-filter' onMouseOver={() => handleHover(data.name)} onMouseLeave={handleHoverLeave}>
                                <div className='flex items-center h-full w-full space-x-2 cursor-pointer'>
                                    <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => handleRename(data.type, data.name, data.src)} />
                                    <DocumentAddIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => handleNewFileOrFolder('file', data.name)} />
                                    <FolderAddIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => handleNewFileOrFolder('directory', data.name)} />
                                    <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(data.name, data.src)} />
                                </div>
                            </div>
                        }
                        <details id={data.name}>
                            <summary className={`flex h-7 items-center text-xs px-2 font-medium cursor-pointer space-x-2 hover:bg-black/10 dark:hover:bg-white/10 ${hoverIndex === data.name && 'bg-slate-200 dark:bg-[#1A1F24]'}`}
                                onMouseEnter={() => handleHover(data.name)} onMouseLeave={handleHoverLeave}
                            >
                                <FolderIcon className={`h-5 w-5 text-[#fee440]`} />
                                <span className='w-11/12 truncate'>
                                    {data.name}
                                </span>
                            </summary>
                            {Object.keys(createNew).length !== 0 && createNew.name === data.name &&
                                <EditorNewFileFolder data={createNew} destination={data.src} escHandler={setcreateNew} playgroundId={props.playgroundId} />
                            }
                            <div className='px-2 w-full '>
                                <Tree data={data.children} folderNames={props.folderNames}
                                    fileNames={props.fileNames} playgroundId={props.playgroundId} />
                            </div>
                        </details>
                        {Object.keys(rename).length > 0 && rename.name === data.name &&
                            <div className='absolute top-0 left-0 w-11/12 h-5 bg-white dark:bg-[#1A1F24]'>
                                <EditorRename playgroundId={props.playgroundId} data={rename} destination={data.src} escHandler={setrename} />
                            </div>}
                    </div>
                } else {
                    return <TreeFiles {...data} key={index} handleRename={handleRename} data={data} rename={rename} escHandler={setrename} playgroundId={props.playgroundId} />
                }
            })}
        </div>
    )
}
