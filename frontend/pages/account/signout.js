import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sessionVerficiation, signOutUser } from '@/redux/api/redux.user'
import { useRouter } from "next/router"

import { AUTHENCIATED, authenciated } from '@/redux/reducers/authSlice'
import { wrapper } from '@/redux/store'

export default function Signout() {
    const dispatch = useDispatch()
    const router = useRouter()
    const authenciate = useSelector(authenciated) ?? false

    useEffect(() => {
        dispatch(signOutUser())
    }, [dispatch])

    if (typeof window !== 'undefined' && !authenciate){
        router.push('/')
    }

  return (<></>)}

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