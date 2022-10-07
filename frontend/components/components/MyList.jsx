import { useRef } from 'react'
import { UPDATE } from '@/redux/reducers/appSlice'
import { ClipboardCopyIcon, TrashIcon, EyeIcon, CodeIcon, DotsVerticalIcon, BookmarkIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'
import { Popover, Tab, Transition } from '@headlessui/react'

export default function List(props) {

    const dispatch = useDispatch()
    const ref = useRef()

    const clipToClipboard = (data) => {
        navigator.clipboard.writeText(data)
        dispatch(UPDATE('Code copied'))
    }

    const handleDelete = async (id) => {
        const confirmation = confirm()
        if (confirmation) {
            const api = await fetch(`/api/component/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': '*/*', },
            })
            switch (api.status) {
                case 204:
                    props.update()
                    ref.current.click()
                    dispatch(UPDATE('Component Deleted'))
                    break;
                case 400:
                case 404:
                case 429:
                case 500:
                    router.push(`/${api.status}`)
            }
        }
    }

    const handlePublicComponentRequest = (data) => {
        dispatch(UPDATE('Request sended'))
    }

    return (
        <li className='col-span-4'>
            <Tab.Group as='div' className='space-y-3 block py-5 '>
                <div className='flex items-center flex-row justify-end space-x-1'>
                    <h1 className='text-md text-black flex-1 dark:text-white'>{props.name}
                    <sup className='mx-2 text-blue-600'>{props.status}</sup>
                    </h1>
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
                            <CodeIcon className='w-4 h-4' />
                            <span className='hidden lg:block'>
                                Get code
                            </span>
                        </Tab>
                    </Tab.List>
                    <Popover className='relative'>
                        <Popover.Button ref={ref}>
                            <DotsVerticalIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                                dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' />
                        </Popover.Button>
                        <Transition
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Popover.Panel className='absolute top-0 right-0 w-44 h-auto rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-[110px] backdrop-filter p-2'>
                                {props.status === 'Personal' && <button onClick={() => handlePublicComponentRequest(props)} type='button' 
                                className='flex items-center space-x-3 text-sm p-2 rounded-md  w-full
                                text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'
                                >
                                    <BookmarkIcon className='w-4 h-4'/>
                                    <span>
                                        Request Publish
                                    </span>
                                </button>}
                                <button onClick={() => handleDelete(props.id)} type='button' 
                                className='flex items-center space-x-3 text-sm p-2 rounded-md  w-full
                                text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'
                                >
                                    <TrashIcon className='w-4 h-4'/>
                                    <span>
                                        Remove
                                    </span>
                                </button>
                                <button onClick={() => clipToClipboard(props.code)} type='button' 
                                className='flex items-center space-x-3 text-sm p-2 rounded-md  w-full
                                text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'
                                >
                                    <ClipboardCopyIcon className='w-4 h-4'/>
                                    <span>
                                        Copy code
                                    </span>
                                </button>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </div>
                <Tab.Panels>
                    <Tab.Panel>
                        <img src={props.image} alt="image" className='rounded-md min-h-[50px]'  />
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
