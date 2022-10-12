import { useState, useCallback } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { Disclosure, Transition } from '@headlessui/react'

const Navbar = dynamic(() => import('@/components/Comman/Navbar'))
const Appbar = dynamic(() => import('@/components/Comman/Bar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const TextInput = dynamic(() => import('@/components/Comman/TextInput'))
const TextArea = dynamic(() => import('@/components/Comman/textArea'))
const Button = dynamic(() => import('@/components/Comman/Button'))
const OTP = dynamic(() => import('@/components/Comman/OTP'))

import { PostHeader } from '@/provider/provider.Headers'
import { username, detail } from '@/provider/provider.Inputs'
import { next } from '@/provider/provider.Buttons'
import { help } from '@/provider/provider.Validations'
import { OtpProvider, sessionVerficiation } from '@/redux/api/redux.user'

import { UPDATE } from '@/redux/reducers/appSlice'
import { authenciated, AUTHENCIATED } from "@/redux/reducers/authSlice"
import { wrapper } from "@/redux/store"
import { ChevronRightIcon } from '@heroicons/react/outline'


export default function Help() {

    const isAuthenciated = useSelector(authenciated) ?? false
    const [otp, setotp] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()

    const form = useFormik({
        initialValues: {
            username: '',
            detail: ''
        },
        validationSchema: help,
        onSubmit: values => {
            setotp(true)
            dispatch(OtpProvider(values.username))
        }
    })

    const handleHelpSubmit = useCallback(async (values) => {
        const location = process.env.NEXT_PUBLIC_API_URL + `/authenciation/user/help`
        const body = JSON.stringify(values)
        const api = await fetch(location, { ...PostHeader, body: body })
        switch (api.status) {
            case 201:
                dispatch(UPDATE('Your query is registered'))
                setotp(false)
                form.resetForm()
                break;
            case 400:
            case 404:
            case 429:
            case 500:
                router.push(`/${api.status}`)
        }
    }, [dispatch, router, form])

    return (
        <>
            <Head>
                <title>TailCode | Help</title>
                <meta name='description' content='How we can help you Tailcode' />
            </Head>
            {isAuthenciated ? <Appbar /> : <Navbar />}
            <main className="p-4  relative flex flex-col min-h-screen my-14 w-full mx-auto lg:w-1/2">
                <form className="w-full min-h-screen space-y-8" onSubmit={form.handleSubmit}>
                    <h1 className='text-2xl text-black dark:text-white'>How we can help you ?</h1>
                    <TextInput {...username}
                        value={form.values.username}
                        change={form.handleChange} blur={form.handleBlur}
                        error={form.touched.username && form.errors.username}
                    />
                    <TextArea {...detail}
                        value={form.values.detail}
                        change={form.handleChange} blur={form.handleBlur}
                        error={form.touched.detail && form.errors.detail}
                    />
                    <Button {...next} />
                </form>
                {otp && <OTP values={form.values} api={handleHelpSubmit} />}
                <div className='space-y-3'>
                    <h1 className='text-2xl font-bold text-black dark:text-white mb-10'>Frequently asked question</h1>
                    <Disclosure as='div' className='rounded-md overflow-hidden text-black dark:text-white'>
                        <Disclosure.Button className='flex items-center justify-between w-full p-2 text-sm bg-black/10 dark:bg-white/10'>
                            How do i can start my new project
                            <ChevronRightIcon className="ui-open:rotate-90 ui-open:transform w-4 h-4" />
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className='p-3 text-sm'>
                                <ul className='list-disc pl-4'>
                                    <li>Create a account or if already have account singin </li>
                                    <li>Enter name of project </li>
                                    <li>Select from React and Nextjs </li>
                                    <li>Done</li>
                                    <li>Now a live window will be open for live testing</li>
                                    <li>Delay will be there in code change</li>
                                </ul>
                            </Disclosure.Panel>
                        </Transition>
                    </Disclosure>
                    <Disclosure as='div' className='rounded-md overflow-hidden text-black dark:text-white'>
                        <Disclosure.Button className='flex items-center justify-between w-full p-2 text-sm bg-black/10 dark:bg-white/10'>
                            Delay in Code change
                            <ChevronRightIcon className="ui-open:rotate-90 ui-open:transform w-4 h-4" />
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className='p-3 text-sm'>
                                Dear user due to some restrication there will be delay of 10 to 20 sec delay after code save
                            </Disclosure.Panel>
                        </Transition>
                    </Disclosure>
                </div>
            </main>
            <Footer />
        </>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {
    const result = await sessionVerficiation(req, res)
    switch (result) {
        case 200:
            store.dispatch(AUTHENCIATED(true))
            break;
        case 401:
            break;
        case 400:
        case 429:
        case 500:
            return { redirect: { destination: `/${result}` } }
    }
})