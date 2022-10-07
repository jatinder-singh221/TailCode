import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

const Logo = dynamic(() => import('@/components/Comman/Logo'))
const TextInput = dynamic(() => import('@/components/Comman/TextInput'))
const PasswordInput = dynamic(() => import('@/components/Comman/PasswordInput'))
const Button = dynamic(() => import('@/components/Comman/Button'))
const Anchor = dynamic(() => import('@/components/Comman/Anchor'))

import { authenciated, AUTHENCIATED } from '@/redux/reducers/authSlice'
import { username, password } from '@/provider/provider.Inputs'
import { signin } from '@/provider/provider.Validations'
import { authenciateUserApi } from '@/redux/api/redux.user'
import { signIn } from '@/provider/provider.Buttons'
import { forget, signup } from '@/provider/provider.Anchors'

import { wrapper } from '@/redux/store'
import { error } from '@/redux/reducers/appSlice'
import { sessionVerficiation } from '@/redux/api/redux.user'


export default function SignIn() {

    const dispatch = useDispatch()
    const router = useRouter()

    const isAuthenciated = useSelector(authenciated) ?? false
    const formError = useSelector(error) ?? false

    const form = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: signin,
        onSubmit: values => dispatch(authenciateUserApi(values))
    })

    useEffect(() => {
        if (formError) {
            form.setErrors({ 'username': 'Invalid Username', 'password': 'Invalid Password' })
        }
    }, [form, formError])

    if (typeof window !== 'undefined' && isAuthenciated) router.push('/dashboard')

    return (
        <section className='grid grid-cols-3 w-full h-[calc(100vh-3rem)] lg:h-screen animate-show-out'
        >
            <Head>
                <title>TailCode | SignIn</title>
                <meta name='description' content='SignIn to TailCode with Usename and Password' />
            </Head>
            <div className='col-span-3 lg:col-span-1 p-6 flex flex-col space-y-8'>
                <Logo />
                <form className='space-y-8' onSubmit={form.handleSubmit}>
                    <legend className='font-bold text-2xl text-black dark:text-white'>Sign In</legend>
                    <TextInput {...username} value={form.values.username}
                        change={form.handleChange} blur={form.handleBlur}
                        error={form.touched.username && form.errors.username}
                    />
                    <PasswordInput {...password} value={form.values.password}
                        change={form.handleChange} blur={form.handleBlur}
                        error={form.touched.password && form.errors.password}
                    />
                    <Button {...signIn} />
                    <div className='flex items-center text-[#2DAC9D] justify-between'>
                        <Anchor {...forget} />
                        <span className='px-4'>
                            <Anchor {...signup} />
                        </span>
                    </div>
                </form>
            </div>
            <div className='hidden lg:block lg:col-span-2 py-2'>
                <video src="/home.mp4" muted autoPlay loop className='h-full w-full object-cover object-left  rounded-lg' />
            </div>
        </section>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {
    const result = await sessionVerficiation(req, res)
    switch (result) {
        case 200:
            store.dispatch(AUTHENCIATED(true))
            return { redirect: { destination: "/dashboard" } }
        case 401:
            break;
        case 400:
        case 429:
        case 500:
            return { redirect: { destination: `/${result}` } }
    }
})