import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { TrashIcon } from '@heroicons/react/outline'

const Layout = dynamic(() => import('@/components/account/Layout'))
const PasswordInput = dynamic(() => import('@/components/Comman/PasswordInput'))
const Button = dynamic(() => import('@/components/Comman/Button'))

import { password, confirmPassword } from '@/provider/provider.Inputs'
import { passwordUpdateValidation } from '@/provider/provider.Validations'
import { updatePassword, sessionVerficiation, signOutUser } from '@/redux/api/redux.user'
import { updateButton } from '@/provider/provider.Buttons'
import { AUTHENCIATED } from '@/redux/reducers/authSlice'
import { wrapper } from '@/redux/store'

export default function Security() {
  const dispatch = useDispatch()

  const passwordUpateForm = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: passwordUpdateValidation,
    onSubmit: values => {
      dispatch(updatePassword(values))
    }
  })

  const handleDeleteAccount = async () => {
    const confirmation = confirm('Do you want to delete your account?')
    if (confirmation){
      const query = JSON.parse(sessionStorage.getItem('profile'))
      const api = await fetch(`/api/account/${query.user.username}`, {
        method: 'DELETE'
      })
      switch(api.status){
        case 204:
          dispatch(signOutUser())
          router.push('/')
          break;
        case 400:
        case 404:
        case 500:
          router.push(`/${api.status}`)
          break;
      }
    }
  }


  return (
    <Layout>
      <Head>
        <title>TailCode | Security</title>
      </Head>
      <header className='text-2xl text-black dark:text-white'>Security</header>
      <small>Settings to recomanded to keep your account secure</small>
      <form className='w-full lg:w-1/2 space-y-6' onSubmit={passwordUpateForm.handleSubmit}>
        <legend className='text-black dark:text-white font-medium text-lg'>Update password</legend>
        <PasswordInput {...password} value={passwordUpateForm.values.password}
          change={passwordUpateForm.handleChange} blur={passwordUpateForm.handleBlur}
          error={passwordUpateForm.touched.password && passwordUpateForm.errors.password}
        />
        <PasswordInput {...confirmPassword}
          value={passwordUpateForm.values.confirmPassword}
          change={passwordUpateForm.handleChange} blur={passwordUpateForm.handleBlur}
          error={passwordUpateForm.touched.confirmPassword && passwordUpateForm.errors.confirmPassword}
        />
        <Button {...updateButton} />
      </form>
      <div className="w-full lg:w-1/2 space-y-10">
        <header className='text-2xl text-red-500'>Danger Zone</header>
        <div className='flex items-center justify-between'>
          <p className='capitalize text-red-500 text-xs md:text-sm w-[60%]'>Do you want to delete your account</p>
          <button className='flex items-center w-32 text-xs p-2 bg-red-400/10 cursor-pointer rounded-md text-red-400 active:scale-90' onClick={handleDeleteAccount}>
            <TrashIcon className='w-4 h-4 mr-2' />
            Remove
          </button>
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