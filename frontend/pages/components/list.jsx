import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { wrapper } from '@/redux/store'

import { fetchSsr } from '@/redux/api/redux.comman'
import { sessionVerficiation } from '@/redux/api/redux.user'
import { AUTHENCIATED } from '@/redux/reducers/authSlice'

const Appbar = dynamic(() => import('@/components/Comman/Bar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const MyList = dynamic(() => import('@/components/components/MyList'))

export default function List() {

    const router = useRouter() 
    const [list, setlist] = useState([])
    const [component, setcomponent] = useState([])
    const { tab } = router.query 

    const getComponents = useCallback(async () => {
        try {
            const api = await fetch('/api/component/list')
            switch (api.status) {
                case 200:
                    const apiRes = await api.json()
                    setcomponent(apiRes)
                    break;
                case 400:
                case 404:
                case 429:
                case 500:
                    router.push(`/${api.status}`)
            }
        } catch (error) {

            router.push('/500')
        }
    }, [router])

    const loadCatagories = useCallback(async () => {
        const result = await fetchSsr('/components/list')
        switch (result.status) {
          case 200:
            const apiRes = await result.json()
            setlist(apiRes)
            getComponents()
            break;
          case 400:
          case 404:
          case 429:
          case 500:
            router.push(`/${result.status}`)
        }
    }, [router, getComponents])

    useEffect(() => {
        if (tab === undefined){
            router.query.tab = 'Navbars'
        }
        loadCatagories()
    }, [loadCatagories, tab, router])
    
    const handleIndex = (name) => {
        router.push(`/components/list?tab=${name}`)
    }

    return (
        <>
            <Head>
                <title>TailCode |component | My components </title>
                <meta name='description' content='TailCode component provides you topic related insite' />
            </Head>
            <Appbar />
            <main className="w-[90%] min-h-screen mx-auto my-14 space-y-6 animate-show-out">
            <p className='text-2xl font-bold text-black dark:text-white'>My components</p>
                <ul className='flex items-center space-x-4'>
                    {list.map((data, index) => {
                        return <li key={index} className={`relative flex items-center space-x-3 text-sm p-2 rounded-md min-w-max
                        text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all
                        ${tab == data.name && `before:w-[5px] before:h-1/2 before:absolute  cursor-pointer
                        before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                        bg-black/20 dark:bg-white/10` }
                        `}
                        onClick={() => handleIndex(data.name)}
                    >
                        <a className='cursor-pointer'>{data.name}</a>
                    </li>
                    })}
                </ul>
                <ul>
                {component.length > 0 ? component.filter(object => object.catagory === tab ).map((data, index) => {
                    return <MyList key={index} {...data} update={getComponents}/>
                    }) : <li className='w-full h-screen flex py-10 col-span-4'>
                    <div className='w-full space-y-10'>
                        <h1 className='text-center text-xl text-black font-medium dark:text-white'>No component Post Founded</h1>
                        <div className='relative w-1/2 h-56 mx-auto'>
                        <Image src="/notfounded.svg" alt="emptypng" layout='fill' />
                        </div>
                    </div>
                    </li>}
                </ul>
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
        return { redirect: { destination: `/signin` } }
        break;
      case 400:
      case 429:
      case 500:
        return { redirect: { destination: `/${result}` } }
    }
  })
  