import Head from "next/head"
import dynamic from "next/dynamic"
import Image from "next/image"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { authenciated, AUTHENCIATED } from "@/redux/reducers/authSlice"
import MarkdownIt from 'markdown-it';
const mdParser = new MarkdownIt()

const Appbar = dynamic(() => import('@/components/Comman/Bar'))
const Navbar = dynamic(() => import('@/components/Comman/Navbar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const Emptyloading = dynamic(() => import('@/components/Comman/Emptyloading'))

import { wrapper } from "@/redux/store"
import { sessionVerficiation } from "@/redux/api/redux.user"
import { fetchSsr } from "@/redux/api/redux.comman"
import { ArrowLeftIcon } from "@heroicons/react/solid"

export default function Slug() {

  const isAuthenciated = useSelector(authenciated) ?? false
  const router = useRouter()
  const { slug } = router.query
  const [blog, setblog] = useState({})
  const [loading, setloading] = useState(true)

  const created_on = new Date(blog?.created_on)
  const updated_on = new Date(blog?.updated_on)

  const handleBlogs = useCallback(async () => {
    const result = await fetchSsr(`/blog/${slug}`)
    switch (result.status) {
      case 200:
        const apiRes = await result.json()
        setblog(apiRes)
        setloading(false)
        break;
      case 400:
      case 404:
      case 429:
      case 500:
        router.push(`/${result.status}`)
    }
  }, [slug, router])

  useEffect(() => {
    handleBlogs()
  }, [handleBlogs])


  return (
    <>
      <Head>
        <title>TailCode | blog |{slug} </title>
        <meta name='description' content='TailCode Blog provides you topic related insite' />
      </Head>
      {isAuthenciated ? <Appbar /> : <Navbar />}
      <main className="w-[90%] lg:w-[50%] min-h-screen mx-auto my-14 space-y-6 animate-show-out">
        <ArrowLeftIcon className='w-7 h-7 p-1 rounded-full hover:scale-105 active:bg-black/10 
        dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => router.back()} />
        {!loading ? <>
          <h1 className="text-2xl lg:text-3xl text-black dark:text-white font-bold break-words">{blog.title}</h1>
          <p className="text-sm">{blog.description}</p>
          <div className="aspect-video relative">
            <Image src={blog.banner || '/avtar.jpg'} alt="banner" layout='fill' objectFit="contain" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-2">
            <i className="text-xs text-white">Author {blog.author}</i>
            <i className="text-xs text-white">Created On {created_on.toDateString()}</i>
            <i className="text-xs text-white">Updated On {updated_on.toDateString()}</i>
          </div>
          <div dangerouslySetInnerHTML={{ __html: mdParser.render(blog.html) }} className='custom-html-style'>
          </div>
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
