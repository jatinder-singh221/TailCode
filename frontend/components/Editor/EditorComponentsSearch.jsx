import { useState, useEffect, useCallback, Fragment } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import { LinkIcon, SearchIcon, XIcon, ArrowLeftIcon } from "@heroicons/react/outline"
import { useDispatch } from "react-redux"
import { Transition } from "@headlessui/react"

import { ClipboardCopyIcon } from "@heroicons/react/outline"
import { fetchSsr } from "@/redux/api/redux.comman"
import { UPDATE } from "@/redux/reducers/appSlice"

export default function EditorComponentsSearch(props) {

    const [searchResult, setsearchResult] = useState([])
    const [searchQuery, setsearchQuery] = useState('')
    const [result, setresult] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await fetchSsr(`/components/search?search=${searchQuery}`)
            switch (result.status) {
                case 200:
                    const apiRes = await result.json()
                    setsearchResult(apiRes)
                    setresult(true)
                    break;
                case 400:
                case 404:
                case 429:
                case 500:
                    router.push(`/${result.status}`)
            }
        } catch (error) {
            router.push('/500')
        }
    }

    const clipToClipboard = (data) => {
        navigator.clipboard.writeText(data)
        dispatch(UPDATE('Code copied'))
    }

    return (
        <Transition
            show={props.show === 2 ? true: false}
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <section className='fixed top-0 left-0 p-3 backdrop-blur
        h-screen w-full bg-black/10 dark:bg-white/10 backdrop-filter
        z-20 space-y-1' >
                <ArrowLeftIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                    dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => props.handleActiveTab(2)} />
                <div className='px-4 py-2 text-sm text-inherit w-full lg:w-1/2 mx-auto space-y-3 bg-white dark:bg-[#14181B]  rounded-md'>
                    <form className='w-full' onSubmit={handleSubmit}>
                        <label htmlFor="search"
                            className='flex h-10 items-center space-x-3  mx-auto px-3 text-sm 
                                '
                        >
                            <input type="text" id='search' placeholder='Type something to search' value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)}
                                className='w-full h-full bg-transparent outline-none placeholder:text-black/50 dark:placeholder:text-white/50'
                            />
                            <XIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                                dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => setsearchQuery('')} />
                            <SearchIcon type='submit' className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                                dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={handleSubmit} />
                        </label>
                    </form>
                    {result && <div className="h-[calc(100vh-30vh)] border-t border-[#2DAC9D] pt-2  w-full overflow-y-auto hidden-scrollbar space-y-4 ">
                        {searchResult.length > 0 ? <ul>
                            {searchResult.map((data, index) => {
                                return <li className='col-span-4' key={index}>
                                    <div className='space-y-3 block border-b py-5 border-black/10 dark:border-white/10 '>
                                        <div className='flex items-center justify-between'>
                                            <h1 className='text-sm font-bold text-black dark:text-white mx-4 lg:mx-0'>{data.name}</h1>
                                            <div className="flex items-center space-x-2">
                                                <ClipboardCopyIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                                            dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => clipToClipboard(data.code)} />
                                                <Link href={`/components/${data.catagory}`} passHref>
                                                    <a target='_blank' rel="noopener noreferrer">
                                                        <LinkIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                                                    dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => clipToClipboard(data.code)} />
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <img src={data.image} alt="image" className='rounded-md min-h-[50px]' />
                                    </div>
                                </li>
                            })}
                        </ul>
                            :
                            <div className='w-full h-full flex my-4'>
                                <div className='w-full space-y-10'>
                                    <h1 className='text-sm text-black font-medium dark:text-white'>No Component Founded</h1>
                                    <div className='relative w-1/2 h-56 mx-auto'>
                                        <Image src="/notfounded.svg" alt="emptypng" layout='fill' />
                                    </div>
                                </div>
                            </div>}
                    </div>}
                </div>
            </section >
        </Transition>
    )
}
