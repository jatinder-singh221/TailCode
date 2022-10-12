import { useState, useCallback, useEffect } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useSelector } from "react-redux"
import { authenciated, AUTHENCIATED } from "@/redux/reducers/authSlice"

const Appbar = dynamic(() => import('@/components/Comman/Bar'))
const Navbar = dynamic(() => import('@/components/Comman/Navbar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const List = dynamic(() => import('@/components/components/List'))
const Search = dynamic(() => import('@/components/components/Search'))
const Emptyloading = dynamic(() => import('@/components/Comman/Emptyloading'))

import { wrapper } from "@/redux/store"
import { sessionVerficiation } from "@/redux/api/redux.user"
import { fetchSsr } from "@/redux/api/redux.comman"

import { SearchIcon } from '@heroicons/react/outline'

export default function Component() {

  const isAuthenciated = useSelector(authenciated) ?? false

  const router = useRouter()
  const [component, setcomponent] = useState([])
  const [loading, setloading] = useState(true)
  const [search, setsearch] = useState(false)


  const handleComponents = useCallback(async () => {
    const result = await fetchSsr('/components/list')
    switch (result.status) {
      case 200:
        const apiRes = await result.json()
        setcomponent(apiRes)
        setloading(false)
        break;
      case 400:
      case 404:
      case 429:
      case 500:
        router.push(`/${result.status}`)
    }
  }, [router])

  useEffect(() => {
    handleComponents()
  }, [handleComponents])

  return (
    <>
      <Head>
        <title>TailCode | Components</title>
        <meta name='description' content='100 + redux and tailwind powered components' />
      </Head>
      {isAuthenciated ? <Appbar /> : <Navbar />}
      <main className="w-[95%] lg:w-[80%] min-h-screen mx-auto mt-14" id='top'>
        {!loading ?
          <>
            {component.length > 0 ?
              <>
              <div className="h-10 w-full flex items-center justify-between space-x-3">
                  <p className='text-2xl font-bold text-black dark:text-white'>Components</p>
                  <SearchIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => setsearch(!search)} />
                </div>
                <Search state={search} handleClose={() => setsearch(!search)} />
                <ul className="w-full  animate-show-out mb-5 grid grid-cols-4 gap-5 pt-4">
                  {component.map((data, index) => {
                    return <List key={index} {...data} />
                  })}
                </ul>
              </>
              :
              <li className='w-full h-[calc(100vh-5.5rem)] flex py-10 items-center justify-center'>
                <div className='w-full space-y-10'>
                  <h1 className='text-center text-xl text-black font-medium dark:text-white'>Components not founded</h1>
                  <div className='relative w-1/2 h-56 mx-auto'>
                    <Image src="/notfounded.svg" alt="emptypng" layout='fill' />
                  </div>
                </div>
              </li>
            }
          </>
          : <Emptyloading />}
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
