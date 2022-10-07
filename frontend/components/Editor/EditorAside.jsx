import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { isTablet, isDesktop } from 'react-device-detect'

import { ChevronDoubleLeftIcon, DocumentAddIcon, FolderAddIcon } from '@heroicons/react/solid'
import Tree from './Tree'
import EditorNewFileFolder from './EditorNewFileFolder'
import EditorComponentsSearch from './EditorComponentsSearch'
import EditorSettings from './EditorSettings'

import { asideEditor, asideLink } from '@/provider/provider.editor'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE } from '@/redux/reducers/appSlice'
import { loadTree } from '@/redux/api/redux.editor'
import { tree } from '@/redux/reducers/editorSlice'

export default function EditorAside(props) {

    const [activeTab, setactiveTab] = useState(0)
    const [createNew, setcreateNew] = useState({})
    const dispatch = useDispatch()
    const detailRef = useRef()

    const router = useRouter()

    const treeData = useSelector(tree) ?? false

    const handleActiveTab = useCallback((index) => {
        const main = props.refrenceMain.current
        switch (index) {
            case 1:
                try {
                    props.refrenceEditor.current.focus()
                    props.refrenceEditor.current.getAction('actions.find').run()
                } catch (error) {
                    dispatch(UPDATE('OOh! no file is open'))
                }
                break;
            case 2:
            case 3:
                if (activeTab === index) {
                    setactiveTab(0)
                    main.classList.remove('w-full')
                    main.classList.add('w-[calc(100%-13.5rem)]')
                }
                else {
                    setactiveTab(index)
                    main.classList.remove('w-[calc(100%-13.5rem)]')
                    main.classList.add('w-full')
                }
                break;
            default:
                if (activeTab === index && activeTab !== 1) {
                    main.classList.remove('w-[calc(100%-13.5rem)]')
                    main.classList.add('w-full')
                    setactiveTab(null)
                } else {
                    main.classList.remove('w-full')
                    main.classList.add('w-[calc(100%-13.5rem)]')
                    setactiveTab(index)
                }
                break;
        }
    }, [activeTab, props, dispatch])

    const handleEsc = useCallback((e) => {
        if (e.key === 'Escape' && activeTab !== 0){
            handleActiveTab(activeTab)
        }
    }, [ activeTab, handleActiveTab])

    useEffect(() => {
        document.addEventListener('keydown', handleEsc)
    
      return () => {
        document.removeEventListener('keydown', handleEsc)
      }
    }, [handleEsc])
    

    useEffect(() => {
        dispatch(loadTree(props.playgroundId))

        if (isTablet || isDesktop)
            setactiveTab(0)
        else
            setactiveTab(null)
    }, [dispatch, props.playgroundId])

    const handleStartLiveWindow = useCallback(async () => {
        const isPresent = sessionStorage.getItem('live') ?? false
        if (!isPresent) {
            try {
                const api = await fetch(`/api/${props.playgroundId}/startContainer`, {
                    method: 'GET',
                })
                switch (api.status) {
                    case 200:
                       const apiRes = await api.json()
                       sessionStorage.setItem('live', JSON.stringify(apiRes))
                       setTimeout(() => {
                        const url = apiRes.url+`:${apiRes.port}`
                        window.open(url, '_blank')
                       }, 2000);
                        break;
                    case 400:
                    case 404:
                    case 429:
                    case 500:
                        router.push(`/${api.status}`)
                }                
            } catch (error) {
                router.push('/500')
            }
        }
    },[router, props])


    useEffect(() => {
        handleStartLiveWindow()
    },[handleStartLiveWindow])
    
    const handleNewFileOrFolder = useCallback((typeOf) => {
        const sibling = treeData.children.filter(object => object.type === typeOf)
        const current = detailRef.current
        if (typeOf === 'folder') {
            const setData = { type: typeOf, dataSet: sibling }
            current.open = true
            setcreateNew(setData)
        }
        else {
            const setData = { type: typeOf, dataSet: sibling }
            current.open = true
            setcreateNew(setData)
        }
    }, [treeData])

    return (
        <aside className='flex select-none'>
            <section className='w-10 h-full bg-black/10 dark:bg-white/10 flex flex-col justify-between py-4'>
                <ul className='space-y-2 z-40'>
                    {asideEditor.map((data, index) => {
                        return (
                            <li key={index} className={`relative flex items-center space-x-3 text-sm p-2 rounded-md 
                            text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all ${activeTab === index && `
                            before:w-[5px] before:h-1/2 before:absolute 
                            before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                            bg-black/20 dark:bg-white/10
                            `}`}
                                onClick={() => handleActiveTab(index)}
                            >
                                <data.icon className='w-6 h-6 transition-all peer z-30' />
                                <div className='absolute w-48 h-6 bg-black/20 dark:bg-white/10 backdrop-blur-2xl -right-[12.63rem] top-2 lg:peer-hover:block rounded-sm hidden'>
                                    <div className="relative flex items-center h-full  select-none">
                                        <ChevronDoubleLeftIcon className='w-3 h-3 absolute -left-2 font-medium' />
                                        <span className='text-xs font-medium flex items-center justify-evenly w-full text-black dark:text-white'>
                                            {data.hover}
                                            <kbd className='bg-black/20 dark:bg-white/10 px-2 rounded-sm '>{data.shortcut}</kbd>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <ul className='space-y-2 z-40'>
                    {asideLink.map((data, index) => {
                        return (
                            <li key={index} className='relative flex items-center space-x-3 text-sm p-2 rounded-md 
                            text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'                           >
                                <Link href={data.link} passHref>
                                    <data.icon className='w-6 h-6' />
                                </Link>
                                <div className='absolute w-48 h-6 bg-black/20 dark:bg-white/10 backdrop-blur-2xl -right-[12.63rem] top-2 lg:group-hover:block rounded-sm hidden'
                                >
                                    <div className="relative flex items-center h-full">
                                        <ChevronDoubleLeftIcon className='w-3 h-3 absolute -left-2 font-medium' />
                                        <span className='text-xs font-medium ml-4 text-black dark:text-white'>
                                            {data.hover}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
            {activeTab === 0 && <section className='w-52 select-none py-4 space-y-4 transition-all z-10'>
                <p className='text-sm px-2'>Explorer</p>
                <div className='relative'>
                    <details open ref={detailRef} className='overflow-auto'>
                        <summary className='flex bg-black/10 dark:bg-white/10 h-7 items-center text-xs px-2 font-medium text-black dark:text-white cursor-pointer'>
                            <span className='w-11/12 truncate'>
                                {treeData?.name}
                            </span>
                        </summary>
                        <div className='w-full h-[80vh] overflow-y-auto editor-scrollbar'>
                            {Object.keys(createNew).length > 0 &&
                            <EditorNewFileFolder data={createNew} destination={treeData?.src}
                                escHandler={setcreateNew} playgroundId={props.playgroundId} />
                        }
                        <Tree data={treeData.children} playgroundId={props.playgroundId} />
                        </div>
                    </details>
                    <div className='absolute h-7 top-0 right-2 backdrop-blur-2xl px-2'>
                        <div className='flex items-center h-full w-full space-x-2 cursor-pointer'>
                            <DocumentAddIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => handleNewFileOrFolder('file', detailRef)} />
                            <FolderAddIcon className='w-3.5 h-3.5 text-black/70 dark:text-inherit hover:text-black dark:hover:text-white active:text-[#2DAC9D]' onClick={() => handleNewFileOrFolder('directory', detailRef)} />
                        </div>
                    </div>
                </div>
            </section>}
            <EditorComponentsSearch handleActiveTab={handleActiveTab} show={activeTab} />
            <EditorSettings handleActiveTab={handleActiveTab} playgroundId={props.playgroundId} show={activeTab}/>
        </aside>
    )
}
