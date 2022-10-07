import { useCallback, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"

import { XIcon, ArrowLeftIcon } from "@heroicons/react/outline"
import { Transition } from "@headlessui/react"
import { theme, fonts } from '@/provider/provider.editor'
import { themes, font, THEME, FONT } from "@/redux/reducers/editorSlice"

export default function EditorSettings(props) {

    const dispatch = useDispatch()

    const preferedTheme = useSelector(themes) ?? 'Tomorrow-Night'
    const preferedFont = useSelector(font) ?? '16px'


    const handleThemeChange = useCallback((e) => {
        try {
            localStorage.setItem('theme', e.target.value)
            if (e.target.value === 'vs-dark' || e.target.value === 'vs-light') {
                dispatch(THEME(e.target.value))
            }
            else {
                import(`monaco-themes/themes/${e.target.value}.json`)
                    .then(data => {
                        monaco.editor.defineTheme(e.target.value, data)
                        monaco.editor.setTheme(e.target.value);
                    })
                    .catch(error => alert('Ooh! it seems no file is open'))
                dispatch(THEME(e.target.value))
            }
        } catch (error) {
            alert('Ooh! it seems no file is open')
        }
    }, [dispatch])

    const handleFontChange = useCallback((e) => {
        try {
            dispatch(FONT(e.target.value))
            localStorage.setItem('fontSize', e.target.value)
        } catch (error) {
            alert('Ooh! it seems no file is open')
        }
    }, [dispatch])

    return (
        <Transition
            show={props.show === 3 ? true : false}
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className='fixed top-0 left-0 p-3 backdrop-blur
        h-screen w-full bg-black/10 dark:bg-white/10 backdrop-filter
        z-20 space-y-1' >
                <ArrowLeftIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                    dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => props.handleActiveTab(3)} />
                <div className='px-4 py-2 text-sm text-inherit w-full lg:w-1/2 mx-auto space-y-3 bg-white dark:bg-[#14181B]  rounded-md'>
                    <div >
                        <div className='w-full h-10 mt-2'>
                            <div htmlFor="search" className='w-full h-full flex items-center px-5 justify-between'>
                                <p className='text-lg'>Settings</p>
                                <XIcon className='w-5 h-5 cursor-pointer' onClick={() => props.handleActiveTab(3)} />
                            </div>
                        </div>
                        <hr className='border-0 h-[1px] bg-[#95A1AC] mt-1' />
                        <p className='text-xs py-3'>Note Change in Font Size and Theme change font size and theme of other project</p>
                        <div className="flex items-center justify-between w-full h-10 px-4 mt-4">
                            <p className='text-xs text-[#2DAC9D]'>Theme</p>
                            <select value={preferedTheme} onChange={handleThemeChange} className='h-7  outline-none rounded-sm px-2 bg-transparent text-[#2DAC9D] border-2 border-[#2DAC9D] text-xs'>
                                {theme.map((data, index) => <option key={index} value={data} >{data}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center justify-between w-full h-10 px-4">
                            <p className='text-xs text-[#2DAC9D]'>Font Size</p>
                            <select value={preferedFont} onChange={handleFontChange} className='h-7 outline-none rounded-sm px-2 bg-transparent text-[#2DAC9D] border-2 border-[#2DAC9D] text-xs'>
                                {fonts.map((data, index) => <option key={index} value={data} >{data}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}
