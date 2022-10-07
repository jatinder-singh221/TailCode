import Image from 'next/image'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Html from '@/public/html.png'
import Css from '@/public/css.png'
import Javascript from '@/public/javascript.png'
import Typescript from '@/public/typescript.png'
import Jsx from '@/public/react.png'
import Text from '@/public/text.png'
import Json from '@/public/json.png'

import { PencilIcon, TrashIcon, DocumentIcon } from '@heroicons/react/outline'
import EditorRename from './EditorRename'
import { deleteFile, openTab } from '@/redux/api/redux.editor'

export default function TreeFiles(props) {
    const dispatch = useDispatch()

    const handleDelete = (name, src) => {
        const confirmation = confirm(`Do you want to delete ${name}`)
        if (confirmation)
            dispatch(deleteFile(props.playgroundId, src))
    }

    const handleopenFile = useCallback((name, src) => {
        dispatch(openTab(props.playgroundId, name, src))
    }, [props.playgroundId, dispatch])

    const handleDragStart = useCallback((e, name, src) => {
        e.dataTransfer.setData('name', name)
        e.dataTransfer.setData('src', src)
    }, [])

    return (
        <>
            {props.name?.split('.').pop() === 'js' ?
                <div className='flex w-full items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 relative' draggable onDragStart={(e) => handleDragStart(e, props.name, props.src)}>
                    <div className='peer flex items-center w-full space-x-2'>
                        <div className='relative w-4 h-4'>
                            <Image src={Javascript} alt="text" layout='fill' objectFit='cover' priority />
                        </div>
                        <span className='text-xs w-9/12 truncate' onClick={() => handleopenFile(props.name, props.src)}>{props.name}</span>
                    </div>
                    <div className="hidden peer-hover:block hover:block absolute px-2 h-full top-0 right-2 backdrop-blur backdrop-filter">
                        <div className='flex items-center w-full h-full space-x-2'>
                            <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => props.handleRename(props.type, props.name, props.src)} />
                            <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(props.name, props.src)} />
                        </div>
                    </div>
                    {Object.keys(props.rename).length > 0 && props.rename.name === props.name &&
                        <div className='absolute top-0 left-0 w-11/12 h-full bg-white dark:bg-[#1A1F24] '>
                            <EditorRename playgroundId={props.playgroundId} data={props.rename} destination={props.src} escHandler={props.escHandler} />
                        </div>}
                </div>
            : props.name?.split('.').pop() === 'ts' ?
                <div className='flex w-full items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 relative' draggable onDragStart={(e) => handleDragStart(e, props.name, props.src)}>
                    <div className='peer flex items-center w-full space-x-2'>
                        <div className='relative w-4 h-4'>
                            <Image src={Typescript} alt="text" layout='fill' objectFit='cover' priority />
                        </div>
                        <span className='text-xs w-9/12 truncate' onClick={() => handleopenFile(props.name, props.src)}>{props.name}</span>
                    </div>
                    <div className="hidden peer-hover:block hover:block absolute px-2 h-full top-0 right-2 backdrop-blur backdrop-filter">
                        <div className='flex items-center w-full h-full space-x-2'>
                            <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => props.handleRename(props.type, props.name, props.src)} />
                            <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(props.name, props.src)} />
                        </div>
                    </div>
                    {Object.keys(props.rename).length > 0 && props.rename.name === props.name &&
                        <div className='absolute top-0 left-0 w-11/12 h-full bg-white dark:bg-[#1A1F24]'>
                            <EditorRename playgroundId={props.playgroundId} data={props.rename} destination={props.src} escHandler={props.escHandler} />
                        </div>}
                </div>
            : props.name?.split('.').pop() === 'tsx' || props.name?.split('.').pop() === 'jsx' ?
                <div className='flex w-full items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 relative' draggable onDragStart={(e) => handleDragStart(e, props.name, props.src)}>
                    <div className='peer flex items-center w-full space-x-2'>
                        <div className='relative w-4 h-4'>
                            <Image src={Jsx} alt="text" layout='fill' objectFit='cover' priority />
                        </div>
                        <span className='text-xs w-9/12 truncate' onClick={() => handleopenFile(props.name, props.src)}>{props.name}</span>
                    </div>
                    <div className="hidden peer-hover:block hover:block absolute px-2 h-full top-0 right-2 backdrop-blur backdrop-filter">
                        <div className='flex items-center w-full h-full space-x-2'>
                            <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => props.handleRename(props.type, props.name, props.src)} />
                            <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(props.name, props.src)} />
                        </div>
                    </div>
                    {Object.keys(props.rename).length > 0 && props.rename.name === props.name &&
                        <div className='absolute top-0 left-0 w-11/12 h-full bg-white dark:bg-[#1A1F24]'>
                            <EditorRename playgroundId={props.playgroundId} data={props.rename} destination={props.src} escHandler={props.escHandler} />
                        </div>}
                </div>
            : props.name?.split('.').pop() === 'html' ?
                <div className='flex w-full items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 relative' draggable onDragStart={(e) => handleDragStart(e, props.name, props.src)}>
                    <div className='peer flex items-center w-full space-x-2'>
                        <div className='relative w-4 h-4'>
                            <Image src={Html} alt="text" layout='fill' objectFit='cover' priority />
                        </div>
                        <span className='text-xs w-9/12 truncate' onClick={() => handleopenFile(props.name, props.src)}>{props.name}</span>
                    </div>
                    <div className="hidden peer-hover:block hover:block absolute px-2 h-full top-0 right-2 backdrop-blur backdrop-filter">
                        <div className='flex items-center w-full h-full space-x-2'>
                            <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => props.handleRename(props.type, props.name, props.src)} />
                            <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(props.name, props.src)} />
                        </div>
                    </div>
                    {Object.keys(props.rename).length > 0 && props.rename.name === props.name &&
                        <div className='absolute top-0 left-0 w-11/12 h-full bg-white dark:bg-[#1A1F24]'>
                            <EditorRename playgroundId={props.playgroundId} data={props.rename} destination={props.src} escHandler={props.escHandler} />
                        </div>}
                </div>
            : props.name?.split('.').pop() === 'css' ?
                <div className='flex w-full items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 relative' draggable onDragStart={(e) => handleDragStart(e, props.name, props.src)}>
                    <div className='peer flex items-center w-full space-x-2'>
                        <div className='relative w-4 h-4'>
                            <Image src={Css} alt="text" layout='fill' objectFit='cover' priority />
                        </div>
                        <span className='text-xs w-9/12 truncate' onClick={() => handleopenFile(props.name, props.src)}>{props.name}</span>
                    </div>
                    <div className="hidden peer-hover:block hover:block absolute px-2 h-full top-0 right-2 backdrop-blur backdrop-filter">
                        <div className='flex items-center w-full h-full space-x-2'>
                            <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => props.handleRename(props.type, props.name, props.src)} />
                            <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(props.name, props.src)} />
                        </div>
                    </div>
                    {Object.keys(props.rename).length > 0 && props.rename.name === props.name &&
                        <div className='absolute top-0 left-0 w-11/12 h-full bg-white dark:bg-[#1A1F24]'>
                            <EditorRename playgroundId={props.playgroundId} data={props.rename} destination={props.src} escHandler={props.escHandler} />
                        </div>}
                </div>
            : props.name?.split('.').pop() === 'txt' ?
                <div className='flex w-full items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 relative' draggable onDragStart={(e) => handleDragStart(e, props.name, props.src)}>
                    <div className='peer flex items-center w-full space-x-2'>
                        <div className='relative w-4 h-4'>
                            <Image src={Text} alt="text" layout='fill' objectFit='cover' priority />
                        </div>
                        <span className='text-xs w-9/12 truncate' onClick={() => handleopenFile(props.name, props.src)}>{props.name}</span>
                    </div>
                    <div className="hidden peer-hover:block hover:block absolute px-2 h-full top-0 right-2 backdrop-blur backdrop-filter">
                        <div className='flex items-center w-full h-full space-x-2'>
                            <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => props.handleRename(props.type, props.name, props.src)} />
                            <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(props.name, props.src)} />
                        </div>
                    </div>
                    {Object.keys(props.rename).length > 0 && props.rename.name === props.name &&
                        <div className='absolute top-0 left-0 w-11/12 h-full bg-white dark:bg-[#1A1F24]'>
                            <EditorRename playgroundId={props.playgroundId} data={props.rename} destination={props.src} escHandler={props.escHandler} />
                        </div>}
                </div>
            : props.name?.split('.').pop() === 'json' ?
                <div className='flex w-full items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 relative' draggable onDragStart={(e) => handleDragStart(e, props.name, props.src)}>
                    <div className='peer flex items-center w-full space-x-2'>
                        <div className='relative w-4 h-4'>
                            <Image src={Json} alt="text" layout='fill' objectFit='cover' priority />
                        </div>
                        <span className='text-xs w-9/12 truncate' onClick={() => handleopenFile(props.name, props.src)}>{props.name}</span>
                    </div>
                    <div className="hidden peer-hover:block hover:block absolute px-2 h-full top-0 right-2 backdrop-blur backdrop-filter">
                        <div className='flex items-center w-full h-full space-x-2'>
                            <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => props.handleRename(props.type, props.name, props.src)} />
                            <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(props.name, props.src)} />
                        </div>
                    </div>
                    {Object.keys(props.rename).length > 0 && props.rename.name === props.name &&
                        <div className='absolute top-0 left-0 w-11/12 h-full bg-white dark:bg-[#1A1F24]'>
                            <EditorRename playgroundId={props.playgroundId} data={props.rename} destination={props.src} escHandler={props.escHandler} />
                        </div>}
                </div>
                :
                <div className='flex w-full items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 relative'>
                    <div className='peer flex items-center w-full space-x-2'>
                        <DocumentIcon className='w-4 h-4 text-yellow-300' />
                        <span className='text-xs w-9/12 truncate'>{props.name}</span>
                    </div>
                    <div className="hidden peer-hover:block hover:block absolute px-2 h-full top-0 right-2 backdrop-blur backdrop-filter">
                        <div className='flex items-center w-full h-full space-x-2'>
                            <PencilIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => props.handleRename(props.type, props.name, props.src)} />
                            <TrashIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-red-500' onClick={() => handleDelete(props.name, props.src)} />
                        </div>
                    </div>
                    {Object.keys(props.rename).length > 0 && props.rename.name === props.name &&
                        <div className='absolute top-0 left-0 w-11/12 h-full bg-white dark:bg-[#1A1F24]'>
                            <EditorRename playgroundId={props.playgroundId} data={props.rename} destination={props.src} escHandler={props.escHandler} />
                        </div>}
                </div>
            }
        </>
    )
}
