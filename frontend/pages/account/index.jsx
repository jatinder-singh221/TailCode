import { useCallback, Fragment, useRef } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Popover, Transition } from '@headlessui/react'
import { PencilIcon, CameraIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'

import { user, AUTHENCIATED } from '@/redux/reducers/authSlice'
const Layout = dynamic(() => import('@/components/account/Layout'))
const ReadOnlyInput = dynamic(() => import('@/components/Comman/ReadOnlyInput'))
const EditDetailform = dynamic(() => import('@/components/account/EditDetailform'))
const EditImageform = dynamic(() => import('@/components/account/EditImageform'))

import { wrapper } from '@/redux/store'
import { sessionVerficiation } from '@/redux/api/redux.user'

export default function Index() {
    const detailRef = useRef()
    const imageRef = useRef()
    const userDetail = useSelector(user) ?? false
    const userImage = userDetail.userProfileImage ? process.env.NEXT_PUBLIC_API_URL + userDetail.userProfileImage : '/avtar.jpg'


    const editFormToogler = useCallback(() => {
        detailRef.current?.click()
    }, [])

    const imageFormToogler = useCallback(() => {
        imageRef.current?.click()
    }, [])

    return (
        <Layout>
            <Head>
                <title>TailCode | Account</title>
            </Head>
            <header className='text-2xl text-black dark:text-white'>PERSONAL INFORMATION</header>
            <small>Your personal information at TailCode and you can manage it anytime</small>
            <div className='w-full lg:w-[80%] h-auto space-y-4 '>
                <Popover>
                    <Popover.Button className='hidden' ref={imageRef} />
                    <Transition
                        enter='transform transition ease-in-out duration-500 sm:duration-700'
                        enterFrom='translate-x-full'
                        enterTo='translate-x-0'
                        leave='transform transition ease-in-out duration-500 sm:duration-700'
                        leaveFrom='translate-x-0'
                        leaveTo='translate-x-full'
                        as={Fragment}
                    >
                        <Popover.Panel className='z-50 fixed bottom-2 right-2 w-[80%] lg:w-1/4 h-[80%] overflow-y-auto bg-black/20 dark:bg-white/10 backdrop-blur-[110px] hidden-scrollbar rounded-md border border-black/10 dark:border-white/10'>
                            <EditImageform image={userImage} editFormToogler={imageFormToogler} refer={imageRef} />
                        </Popover.Panel>
                    </Transition>
                </Popover>
                <div className="h-24 w-24 rounded-full relative ring-2 ring-offset-4 ring-offset-white dark:ring-offset-[#14181B] ring-[#2DAC9D]">
                    <Image src={userImage} alt="user image" layout='fill' className='w-32 h-32 rounded-full' />
                    <button className='absolute w-10 h-10 bg-black/20 dark:bg-white/10 backdrop-blur-2xl bottom-0 -right-5 rounded-full' type='button' onClick={imageFormToogler}>
                        <CameraIcon className='w-5 h-5 text-black dark:text-white mx-auto' />
                    </button>
                </div>
                <Popover>
                    <Popover.Button className='flex items-center text-xs py-1 px-2 rounded-sm text-[#2DAC9D] hover:bg-[#2DAC9D]/10' ref={detailRef}>
                        <PencilIcon className='w-4 h-4 mr-2' />
                        Edit your Profile
                    </Popover.Button>
                    <Transition
                        enter='transform transition ease-in-out duration-500 sm:duration-700'
                        enterFrom='translate-x-full'
                        enterTo='translate-x-0'
                        leave='transform transition ease-in-out duration-500 sm:duration-700'
                        leaveFrom='translate-x-0'
                        leaveTo='translate-x-full'
                        as={Fragment}
                    >
                        <Popover.Panel className='fixed bottom-2 right-2 w-[80%] lg:w-1/4 h-[85%] z-40 overflow-y-auto bg-black/20 dark:bg-white/10 backdrop-blur-[110px] hidden-scrollbar rounded-md border border-black/10 dark:border-white/10'>
                            <EditDetailform {...userDetail} editFormToogler={editFormToogler} refer={detailRef} />
                        </Popover.Panel>
                    </Transition>
                </Popover>
                <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-x-5 gap-y-10'>
                    <ReadOnlyInput label='username' value={userDetail.user?.username} />
                    <ReadOnlyInput label='first name' value={userDetail.user?.first_name} />
                    <ReadOnlyInput label='last name' value={userDetail.user?.last_name} />
                    <ReadOnlyInput label='email address' value={userDetail.user?.email} />
                    <ReadOnlyInput label='country' value={userDetail.country} />
                    <ReadOnlyInput label='phone number' value={userDetail.number} />
                    <ReadOnlyInput label='status' value={userDetail.userStatus} />
                    <ReadOnlyInput label='gender' value={userDetail.gender} />
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {
    const result = await sessionVerficiation(req, res)
    switch (result) {
        case 200:
            store.dispatch(AUTHENCIATED(true))
            break
        case 401:
            return { redirect: { destination: "/signin" } }
        case 400:
        case 429:
        case 500:
            return { redirect: { destination: `/${result}` } }
    }
})