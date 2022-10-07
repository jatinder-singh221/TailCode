import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { useState } from 'react'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'

const Logo = dynamic(() => import('@/components/Comman/Logo'))
const TextInput = dynamic(() => import('@/components/Comman/TextInput'))
const PasswordInput = dynamic(() => import('@/components/Comman/PasswordInput'))
const Button = dynamic(() => import('@/components/Comman/Button'))
const Anchor = dynamic(() => import('@/components/Comman/Anchor'))
const OTP = dynamic(() => import('@/components/Comman/OTP'))

import { authenciated, AUTHENCIATED } from '@/redux/reducers/authSlice'
import { username, password, confirmPassword } from '@/provider/provider.Inputs'
import { signup } from '@/provider/provider.Validations'
import { next } from '@/provider/provider.Buttons'
import { signin } from '@/provider/provider.Anchors'

import { wrapper } from '@/redux/store'
import { sessionVerficiation, usernameStatus, OtpProvider, registerUserApi } from '@/redux/api/redux.user'

export default function SignUp() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [otp, setotp] = useState(false)
  const isAuthenciated = useSelector(authenciated) ?? false

  const form = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: signup,
    onSubmit: async (values) => {
      const result = await usernameStatus(values.username)
      switch (result) {
        case 200:
          form.setFieldError('username', 'Username is taken')
          break;
        case 404:
          dispatch(OtpProvider(values.username))
          setotp(true)
          break;
        case 500:
          router.push('/500')
          break;
      }
    }
  })

  if (typeof window !== 'undefined' && isAuthenciated) router.push('/dashboard')

  return (
    <section className='grid grid-cols-3 w-full h-[calc(100vh-3rem)] lg:h-screen animate-show-out'
    >
      <Head>
        <title>TailCode | SignUp</title>
        <meta name='description' content='SignUp to TailCode and code 2x faster' />
      </Head>
      <div className='col-span-3 lg:col-span-1 px-6 py-2 flex flex-col space-y-8 relative'>
        <Logo />
        <form className='space-y-6' onSubmit={form.handleSubmit}>
          <legend className='font-bold text-2xl text-black dark:text-white'>Sign Up</legend>
          <TextInput {...username} value={form.values.username}
            change={form.handleChange} blur={form.handleBlur}
            error={form.touched.username && form.errors.username}
          />
          <div>
            <PasswordInput {...password} value={form.values.password}
              change={form.handleChange} blur={form.handleBlur}
              error={form.touched.password && form.errors.password}
            />
            <small className='text-[2px]'>Use 8 or more characters with a mix of letters, numbers & symbols</small>
          </div>
          <PasswordInput {...confirmPassword} value={form.values.confirmPassword}
            change={form.handleChange} blur={form.handleBlur}
            error={form.touched.confirmPassword && form.errors.confirmPassword}
          />
          <Button {...next} />
          <div className='flex items-center text-[#2DAC9D] text-xs'>
            Memmber ?
            <span className='px-4'>
              <Anchor {...signin} />
            </span>
          </div>
        </form>
        {otp && <OTP values={form.values} api={registerUserApi} handleback={() => setotp(false)} />}
      </div>
      <div className='hidden lg:block lg:col-span-2 py-2'>
        <video src="/home.mp4" muted autoPlay loop className='h-full w-full object-cover object-left rounded-lg' />
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