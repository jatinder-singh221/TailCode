import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { redirect, update } from '@/redux/reducers/appSlice'
import { userProfileInfo } from '@/redux/api/redux.user'

import Update from '@/components/core/Update'

export default function Layout({ children }) {

  const router = useRouter()
  const dispatch = useDispatch()

  const redirectedTo = useSelector(redirect) ?? false
  const updation = useSelector(update) ?? false

  useEffect(() => {
    if (redirectedTo) {
      router.push(redirectedTo)
    }
    dispatch(userProfileInfo())
  }, [router, redirectedTo, dispatch])

  return (
    <>
      {updation && <Update />}
      {children}
    </>
  )
}
