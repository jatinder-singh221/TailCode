import { useState, useEffect, useCallback } from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useSelector } from "react-redux"
import { authenciated, AUTHENCIATED } from "@/redux/reducers/authSlice"
import { SearchIcon } from '@heroicons/react/outline'

const Appbar = dynamic(() => import('@/components/Comman/Bar'))
const Navbar = dynamic(() => import('@/components/Comman/Navbar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const List = dynamic(() => import('@/components/blog/List'))
const Search = dynamic(() => import('@/components/blog/Search'))
const Emptyloading = dynamic(() => import('@/components/Comman/Emptyloading'))
const Pagination = dynamic(() => import('@/components/Comman/Pagination'))

import { wrapper } from "@/redux/store"
import { sessionVerficiation } from "@/redux/api/redux.user"
import { fetchSsr } from "@/redux/api/redux.comman"

export default function Index(props) {

  const router = useRouter()
  const isAuthenciated = useSelector(authenciated) ?? false
  const [blog, setblog] = useState(props)
  const [loading, setloading] = useState(true)
  const [search, setsearch] = useState(false)

  const { page } = router.query ?? false

  const getBlogPosts = useCallback(async () => {

    let url = ''
    page > 1 ? url = `/blog/list?page=${page}` : url = '/blog/list'

    const api = await fetchSsr(url)
    switch (api.status) {
      case 200:
        const urlRes = await api.json()
        setblog(urlRes)
        console.log(urlRes);
        setloading(false)
        break;
      case 400:
      case 404:
      case 429:
      case 500:
        router.push(`/${api.status}`)
    }
  }, [router, page])

  useEffect(() => {
    getBlogPosts()
  }, [getBlogPosts])


  const url = process.env.NEXT_PUBLIC_API_URL + `/blog/list`
  return (
    <>
      <Head>
        <title>TailCode | Blog</title>
        <meta name='description' content='TailCode Blog provides you topic related insite' />
      </Head>
      {isAuthenciated ? <Appbar /> : <Navbar />}
      <main className="w-[95%] lg:w-[80%] min-h-screen mx-auto mt-14" id='top'>
        {!loading ?
          <>
            {blog.results.length > 0 ?
              <>
                <div className="h-10 w-full flex items-center justify-between space-x-3">
                  <p className='text-2xl font-bold text-black dark:text-white'>Blogs</p>
                  <SearchIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
                dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => setsearch(!search)} />
                </div>
                <Search state={search} handleClose={() => setsearch(!search)} />
                <ul className="w-full space-y-5 mb-10 animate-show-out my-3 min-h-screen">
                  {blog.results.map((data, index) => {
                    return <List key={index} {...data} />
                  })}
                  <Pagination {...blog} page={page} setitems={setblog} url={url} />
                </ul>
              </>
              :
              <li className='w-full h-[calc(100vh-5.5rem)] flex py-10 items-center justify-center'>
                <div className='w-full space-y-10'>
                  <h1 className='text-center text-xl text-black font-medium dark:text-white'>Blogs not founded</h1>
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
