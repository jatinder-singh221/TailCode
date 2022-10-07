import { useState, useEffect, useCallback } from 'react'

import Head from "next/head"
import dynamic from "next/dynamic"
import Image from "next/image"

import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { authenciated, AUTHENCIATED } from "@/redux/reducers/authSlice"

const Appbar = dynamic(() => import('@/components/Comman/Bar'))
const Navbar = dynamic(() => import('@/components/Comman/Navbar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const Emptyloading = dynamic(() => import('@/components/Comman/Emptyloading'))
const NameList = dynamic(() => import('@/components/components/NameList'))

import { wrapper } from "@/redux/store"
import { sessionVerficiation } from "@/redux/api/redux.user"
import { fetchSsr } from "@/redux/api/redux.comman"
import { ArrowLeftIcon } from "@heroicons/react/outline"
const Pagination = dynamic(() => import('@/components/Comman/Pagination'))

export default function Name() {

  const isAuthenciated = useSelector(authenciated) ?? false
  const router = useRouter()
  const { name } = router.query
  const [component, setcomponent] = useState({})
  const [loading, setloading] = useState(true)
  const { page } = router.query ?? false

  const handlecomponents = useCallback(async () => {
    let url = ''
    page > 1 ? url = `/components/${name}?page=${page}` : url = `/components/${name}`
    const api = await fetchSsr(url)
    switch (api.status) {
      case 200:
        const apiRes = await api.json()
        setcomponent(apiRes)
        setloading(false)
        break;
      case 400:
      case 404:
      case 429:
      case 500:
        router.push(`/${api.status}`)
    }
  }, [name, router, page])

  useEffect(() => {
    handlecomponents()
  }, [handlecomponents])

  const url = process.env.NEXT_PUBLIC_API_URL + `/components/${name}`

  return (
    <>
      <Head>
        <title>TailCode |component | {name} </title>
        <meta name='description' content='TailCode component provides you topic related insite' />
      </Head>
      {isAuthenciated ? <Appbar /> : <Navbar />}
      <main className="w-[90%] min-h-screen mx-auto my-14 space-y-6 animate-show-out">
        <div className="flex items-center space-x-4">
          <ArrowLeftIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
          dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => router.push('/components')} />
          <h1 className="text-lg text-black dark:text-white font-semibold">{name}</h1>
        </div>
        {!loading ? <>
          <ul className="w-full space-y-5 mb-10 animate-show-out my-3 grid grid-cols-4 min-h-screen place-content-start">
            {component.results.length > 0 ? component.results.map((data, index) => {
              return <NameList key={index} {...data} />
            }) : <li className='w-full h-screen flex py-10 col-span-4'>
              <div className='w-full space-y-10'>
                <h1 className='text-center text-xl text-black font-medium dark:text-white'>No component Post Founded</h1>
                <div className='relative w-1/2 h-56 mx-auto'>
                  <Image src="/notfounded.svg" alt="emptypng" layout='fill' />
                </div>
              </div>
            </li>}
          </ul>
          <Pagination {...component} page={page} setitems={setcomponent} url={url} />
        </> : <Emptyloading />}
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

