import Head from 'next/head'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'


const Navbar = dynamic(() => import('@/components/Comman/Navbar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const SwitchComponent = dynamic(() => import('@/components/core/Switch'))

import framework from '@/public/framework.svg'
import code from '@/public/code.svg'
import component from '@/public/components.svg'
import avtar from '@/public/avtar.jpg'
import blog from '@/public/blog.svg'
import time from '@/public/time.svg'

import { ArrowRightIcon } from '@heroicons/react/solid'
import { CodeIcon, ColorSwatchIcon, DatabaseIcon, SupportIcon } from '@heroicons/react/outline'

import { AUTHENCIATED } from '@/redux/reducers/authSlice'
import { sessionVerficiation } from '@/redux/api/redux.user'
import { wrapper } from '@/redux/store'

export default function Home() {

  const [userEnable, setuserEnable] = useState(false)

  return (
    <>

      <Head>
        <title>TailCode</title>
        <meta name='description' content='Write code 2X faster with TailCode' />
      </Head>

      <Navbar />

      <main className='h-auto animate-show-out'>
        <section className='w-full min-h-screen flex flex-col items-center space-y-8 justify-center mt-10 lg:mt-28'>
          <h1 className="w-[90%] lg:w-1/2 font-bold text-center text-4xl lg:text-6xl text-transparent 
          bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-[#2DAC9D]">
            Write code 2X faster with TailCode
          </h1>
          <p className='w-[90%] lg:w-1/2 text-center text-sm lg:text-xl text-black 
          dark:text-white'>
            <span className='mx-3 block font-bold'>
              Customize,Recreate and Redesign
            </span>
            Using TailCode, you can build mordern website with UI components
            </p>
          <div className='h-full aspect-video w-[90%]  rounded-md overflow-hidden relative'>
            <video src="/home.mp4" autoPlay muted loop></video>
          </div>
        </section>

        <section className='min-h-screen  my-8'>

          <div className="h-auto grid grid-cols-1 lg:grid-cols-2">
            <div className='col-span-1 p-3 lg:p-14 space-y-6 lg:order-2'>
              <SupportIcon className='block w-14 h-14 p-2 rounded-md bg-[#6C63FF]/10
                 text-[#6C63FF] my-6'/>
              <strong className='text-xl font-bold text-black dark:text-white'>Enjoy web development with favorite one</strong>
              <p className='text-base font-extralight'>Best-in-class Next.js, react.js, and vanilla development support.
                Remotely collaborate on many devices, Accelerate your whole development process with TailCode.
              </p>
            </div>
            <div className='col-span-1 lg:order-1 lg:p-10'>
              <div className='col-span-1'>
                <div className="aspect-video relative">
                  <Image src={framework} layout='fill' alt='blog' priority />
                </div>
              </div>
            </div>
          </div>


          <div className="h-auto grid grid-cols-1 lg:grid-cols-2 ">
            <div className='col-span-1 p-3 lg:p-14 space-y-6'>
              <CodeIcon className='block w-14 h-14 p-2 rounded-md bg-purple-600/10
                 text-purple-600 my-6'/>
              <strong className='text-xl font-bold text-black dark:text-white'>Vscode based online code editor</strong>
              <p className='text-base font-extralight'>
                Visual Studio Code is a code editor redefined and optimized for building and
                debugging modern web and cloud applications.
                Visual Studio Code is free and available on your favorite platform -
                Linux, macOS, and Windows .
              </p>
              <Link href='https://code.visualstudio.com/' passHref>
                <a target='_blank' rel="noopener noreferrer" className='flex items-center space-x-3 text-purple-600 group font-medium'>
                  <span className='group-hover:underline underline-offset-4'>Learn more about vscode</span>
                  <ArrowRightIcon className='h-4 w-4 group-hover:mx-6 transition-all' />
                </a>
              </Link>
            </div>
            <div className='col-span-1 pt-20 px-10'>
              <div className="aspect-video relative">
                <Image src={code} layout='fill' alt='blog' priority />
              </div>
            </div>
          </div>


          <div className="h-auto grid grid-cols-1 lg:grid-cols-2">
            <div className='col-span-1 p-3 lg:p-14 space-y-6 lg:order-2'>
              <ColorSwatchIcon className='block w-14 h-14 p-2 rounded-md bg-pink-600/10
                 text-pink-600 my-6'/>
              <strong className='text-xl font-bold text-black dark:text-white'>100 + Tailwindcss powered UI components</strong>
              <p className='text-base font-extralight'>Rapidly build modern websites without
                ever leaving your HTML . A utility-first CSS framework packed with classes like
                flex , pt-4 ,text-center and rotate-90 that can be composed to build any design, directly in your markup.
              </p>
              <Link href='https://tailwindcss.com/' passHref>
                <a target='_blank' rel="noopener noreferrer" className='flex items-center space-x-3 text-pink-600 group font-medium'>
                  <span className='group-hover:underline underline-offset-4'>Learn more about Tailwind css</span>
                  <ArrowRightIcon className='h-4 w-4 group-hover:mx-6 transition-all' />
                </a>
              </Link>
            </div>
            <div className='col-span-1 lg:order-1 lg:p-10'>
              <div className='col-span-1'>
                <div className="aspect-video relative">
                  <Image src={component} layout='fill' alt='blog' priority />
                </div>
              </div>
            </div>
          </div>


          <div className="h-auto grid grid-cols-1 lg:grid-cols-2">
            <div className='col-span-1 p-3 lg:p-14 space-y-6'>
              <ColorSwatchIcon className='block w-14 h-14 p-2 rounded-md bg-violet-600/10
                 text-violet-600 my-6'/>
              <strong className='text-xl font-bold text-black dark:text-white'>Redux ready components </strong>
              <p className='text-base font-extralight'>Centralizing your {`application's`} state and logic enables powerful
                capabilities like undo/redo, state persistence, and much more.
              </p>
              <Link href='https://redux.js.org/' passHref>
                <a target='_blank' rel="noopener noreferrer" className='flex items-center space-x-3 text-violet-600 group font-medium'>
                  <span className='group-hover:underline underline-offset-4'>Learn more about Redux</span>
                  <ArrowRightIcon className='h-4 w-4 group-hover:mx-6 transition-all' />
                </a>
              </Link>
            </div>
            <div className='col-span-1 p-2 lg:p-10 flex flex-col justify-center space-y-8'>
              <nav className='bg-violet-600 w-full h-12 rounded-t-md flex items-center px-2 justify-between'>
                <h1 className='text-lg text-white'>Navbar</h1>
                {userEnable ? <div className="w-9 h-9 rounded-full relative">
                  <Image src={avtar} layout='fill' alt='profile' className='w-9 h-9 rounded-full' priority />
                </div> : <small className='text-white'>Sign in</small>}
              </nav>
              <SwitchComponent label='Sign in / out user' enable={userEnable} handleChange={() => setuserEnable(!userEnable)} />
            </div>
          </div>


          <div className="h-auto grid grid-cols-1 lg:grid-cols-2">
            <div className='col-span-1 p-3 lg:p-14 space-y-6 lg:order-2'>
              <DatabaseIcon className='block w-14 h-14 p-2 rounded-md bg-amber-600/10
                 text-amber-600 my-6'/>
              <strong className='text-xl font-bold text-black dark:text-white'>Catch up new tech with our blogs</strong>
              <p className='text-base font-extralight'>Learn more about next in our lesson. All of js, react.js, tailwindcss, and redux in one place.
                Stuck! not to be concerned TailCode blog will assist you in achieving your objectives.
              </p>
              <Link href='/blogs' passHref>
                <a className='flex items-center space-x-3 text-amber-600 group font-medium'>
                  <span className='group-hover:underline underline-offset-4'>Explore blogs</span>
                  <ArrowRightIcon className='h-4 w-4 group-hover:mx-6 transition-all' />
                </a>
              </Link>
            </div>
            <div className='col-span-1 lg:order-1'>
              <div className="aspect-video relative">
                <Image src={blog} layout='fill' alt='blog' priority />
              </div>
            </div>
          </div>


          <div className="h-auto grid grid-cols-1 lg:grid-cols-2">
            <div className='col-span-1 p-3 lg:p-14 space-y-6'>
              <DatabaseIcon className='block w-14 h-14 p-2 rounded-md bg-violet-600/10
                 text-violet-600 my-6'/>
              <strong className='text-xl font-bold text-black dark:text-white'>No configuration needed ! - JUST CLICK</strong>
              <p className='text-base font-extralight'>There is no setting required to start the project and share it with your friends, colleagues, and others. Pre-configured components that are ready to utilise in your future projects.
              </p>
              <Link href='/signin' passHref>
                <a className='flex items-center space-x-3 text-violet-600 group font-medium'>
                  <span className='group-hover:underline underline-offset-4'>Get started</span>
                  <ArrowRightIcon className='h-4 w-4 group-hover:mx-6 transition-all' />
                </a>
              </Link>
            </div>
            <div className='col-span-1 pt-20 px-10'>
              <div className="aspect-video relative">
                <Image src={time} layout='fill' alt='blog' priority />
              </div>
            </div>
          </div>

        </section>
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
      return { redirect: { destination: "/dashboard" } }
    case 401:
      break;
    case 400:
    case 429:
    case 500:
      return { redirect: { destination: `/${result}` } }
  }
})