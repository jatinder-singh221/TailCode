import '../styles/globals.css'
import Head from 'next/head'

import { useCallback, useState, useEffect } from 'react'
import { wrapper } from 'redux/store'
import { useRouter } from 'next/router'

import TailCode from '@/public/TailCode.ico'
import Loader from '@/components/Comman/Loader'
import Layout from '@/components/Comman/Layout'

function MyApp({ Component, pageProps }) {
  
  const router = useRouter()
  const [routerChange, setrouterChange] = useState(false)

  const loadBar = useCallback(() => {
    setrouterChange(true)
  }, [])

  const hideBar = useCallback(() => {
    setrouterChange(false)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', loadBar)
    router.events.on('routeChangeComplete', hideBar)
    
    return () => {
      router.events.off('routeChangeStart', loadBar)
      router.events.off('routeChangeComplete', hideBar)
    }
  }, [router, hideBar, loadBar])

  return( 
  <>
    <Head>
      <link rel="icon" type="image/x-icon" href={TailCode.src} />
    </Head>
    <Layout>
      {routerChange && <Loader />}
      <Component {...pageProps} />
    </Layout>
  </>
  )
}

export default wrapper.withRedux(MyApp)
