import { useState, useCallback, Fragment } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Dialog, Transition } from '@headlessui/react'

import { fetchSsr } from '@/redux/api/redux.comman'
import { ArrowLeftIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import { GetHeader } from '@/provider/provider.Headers'
import List from './List'

export default function Search(props) {

    const [searchString, setsearchString] = useState('')
    const [searchResult, setsearchResult] = useState([])
    const [result, setresult] = useState(false)

    const router = useRouter()

    const handleSearchChange = useCallback(async (e) => {
        e.preventDefault()
        if (searchString.length > 0) {
            const result = await fetchSsr(`/blog/list?search=${searchString}`)
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
        }
    }, [router, searchString])

    const handlePrevious = useCallback(async () => {
        const url = searchResult.previous ?? false
        if (url) {
            const result = await fetch(url, GetHeader)
            switch (result.status) {
                case 200:
                    window.scrollTo(0, 0)
                    const apiRes = await result.json()
                    setsearchResult(apiRes)
                    break;
                case 400:
                case 404:
                case 429:
                case 500:
                    router.push(`/${result.status}`)
            }
        }
    }, [searchResult, router])

    const handleNext = useCallback(async () => {
        const url = searchResult.next ?? false
        if (url) {
            const result = await fetch(url, GetHeader)
            switch (result.status) {
                case 200:
                    const apiRes = await result.json()
                    setsearchResult(apiRes)
                    break;
                case 400:
                case 404:
                case 429:
                case 500:
                    router.push(`/${result.status}`)
            }
        }
    }, [searchResult, router])

    const handleClose = () => {
        setsearchString('')
        setsearchResult([])
        setresult(false)
        props.handleClose()
    }

    return (
        <Transition
            show={props.state}
            as={Fragment}
            enter="transition-opacity ease-linear duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"

        >
            <Dialog onClose={() => props.handleClose()} className='fixed top-0 left-0 p-3 backdrop-blur
                    h-screen w-full bg-black/10 dark:bg-white/10 backdrop-filter
                    z-50 space-y-1'>
                <Dialog.Panel >
                    <Dialog.Description className='px-4 py-2 text-sm text-inherit w-full lg:w-1/2 mx-auto space-y-3 bg-white dark:bg-[#14181B]  rounded-md'>
                        <form className='w-full' onSubmit={handleSearchChange}>
                            <label htmlFor="search"
                                className='flex h-10 items-center space-x-3  mx-auto px-1 text-sm 
                                '
                            >
                                <ArrowLeftIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                                dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={handleClose} />
                                <input type="text" id='search' placeholder='Type something to search' value={searchString} onChange={(e) => setsearchString(e.target.value)}
                                    className='w-full h-full bg-transparent outline-none placeholder:text-black/50 dark:placeholder:text-white/50'
                                />
                                <XIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                                dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => setsearchString('')} />
                                <SearchIcon type='submit' className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                                dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={handleSearchChange} />
                            </label>
                        </form>
                        {result && <div className="h-[calc(100vh-30vh)] border-t border-[#2DAC9D] py-2 overflow-y-auto hidden-scrollbar space-y-4 ">
                            {searchResult.results.length > 0 ? searchResult.results.map((data, index) => {
                                return <ul key={index} className='relative'>
                                    <List {...data} />
                                </ul>
                            }) :
                                <div className='w-full h-full flex my-4'>
                                    <div className='w-full space-y-10'>
                                        <h1 className='text-sm text-black font-medium dark:text-white'>No Blog Post Founded</h1>
                                        <div className='relative w-1/2 h-56 mx-auto'>
                                            <Image src="/notfounded.svg" alt="emptypng" layout='fill' />
                                        </div>
                                    </div>
                                </div>}
                        </div>}
                        {result && <div className='flex items-center justify-between'>
                            <button
                                className='text-xs py-1 px-2 rounded-sm text-[#2DAC9D] hover:bg-[#2DAC9D]/10  
                                disabled:bg-black/10 dark:disabled:bg-white/10 disabled:text-black/50 dark:disabled:text-white/50'
                                disabled={searchResult.previous == null} onClick={handlePrevious}>Pervious</button>
                            <button
                                className='text-xs py-1 px-2 rounded-sm text-[#2DAC9D] hover:bg-[#2DAC9D]/10 
                                disabled:bg-black/10 dark:disabled:bg-white/10 disabled:text-black/50 dark:disabled:text-white/50'
                                disabled={searchResult.next == null} onClick={handleNext}>Next</button>
                        </div>}
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}