import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

import { useSelector, useDispatch } from 'react-redux'
import { notification } from '@/redux/reducers/authSlice'

const Layout = dynamic(() => import('@/components/account/Layout'))
import { userNotifications } from '@/redux/api/redux.user'

import { AUTHENCIATED } from '@/redux/reducers/authSlice'
import { wrapper } from '@/redux/store'
import { sessionVerficiation } from '@/redux/api/redux.user'

export default function Notifactions() {
  const dispatch = useDispatch()
  const notifications = useSelector(notification) ?? false

  const humanReadAbleData = (date) => {
    const dated = new Date(date)
    const readable = dated.toDateString()
    return readable
  }

  useEffect(() => {
    dispatch(userNotifications())
  }, [dispatch])
  
  return (
    <Layout>
      <Head>
        <title>TailCode | Notifications</title>
      </Head>
      <ul className="w-full space-y-5 mb-10 animate-show-out">
        {notifications.length > 0 ? 
        <>
          <h1 className='text-2xl text-black dark:text-white'>Notifications</h1>
         {notifications.map((data, index) => {
            return <div className='w-full space-y-4 px-2 py-4 rounded-md' key={index}>
              <h2 className='text-xl text-black dark:text-white font-medium'>{data.title}</h2>
              <p className='text-sm text-black dark:text-white w-full lg:w-3/4'>{data.description}</p>
              <mark className='inline-block px-2  rounded-sm text-xs'>{humanReadAbleData(data.dated)}</mark>
            </div>})}
        </>
        :<div className='w-full h-[calc(100vh-10rem)] flex py-10 items-center justify-center'>
        <div className='w-full space-y-10'>
          <h1 className='text-center text-xl text-black font-medium dark:text-white'>No notifications</h1>
          <div className='relative w-1/2 h-56 mx-auto'>
            <Image src="/notfounded.svg" alt="emptypng" layout='fill' />
          </div>
        </div>
      </div>}
      </ul>
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