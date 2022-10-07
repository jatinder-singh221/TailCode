import { UPDATE } from '@/redux/reducers/appSlice'
import { ClipboardCopyIcon, CodeIcon, EyeIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { Tab } from '@headlessui/react'

export default function List(props) {

    const dispatch = useDispatch()

    const clipToClipboard = (data) => {
        navigator.clipboard.writeText(data)
        dispatch(UPDATE('Code copied'))
    }

    return (
        <li className='col-span-4 relative'>
            <Tab.Group as='div' className='space-y-3 block py-5 '>
                <div className='flex items-center flex-row justify-end space-x-1'>
                    <h1 className='text-md text-black flex-1 dark:text-white'>{props.name}</h1>
                    <Tab.List className='flex items-center space-x-2 bg-black/10 dark:bg-white/10 rounded-md'>
                        <Tab className={({ selected }) => `relative flex items-center space-x-1 text-xs p-2 rounded-md 
                            text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all ${selected && `
                            before:w-[5px] before:h-1/2 before:absolute 
                            before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                            bg-black/20 dark:bg-white/10
                            `}`}
                            >
                                <EyeIcon className='w-4 h-4' />
                                <span className='hidden lg:block'>
                                    Preview
                                </span>
                            </Tab>
                        <Tab className={({ selected }) => `relative flex items-center space-x-3 text-xs p-2 rounded-md 
                            text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all ${selected && `
                            before:w-[5px] before:h-1/2 before:absolute 
                            before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                            bg-black/20 dark:bg-white/10
                            `}`}
                            >
                                <CodeIcon className='w-4 h-4'/>
                                <span className='hidden lg:block'>
                                    Get code
                                </span>
                            </Tab>
                    </Tab.List>
                    <ClipboardCopyIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                        dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => clipToClipboard(props.code)} />
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <img src={props.image} alt="image" className='rounded-md min-h-[50px]' />
                    </Tab.Panel>
                    <Tab.Panel className='custom-html-style'>
                        <code>
                            <pre>
                                {props.code}
                            </pre>
                        </code>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </li>
    )
}
