import { useState, useEffect, useCallback, Fragment } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

const Bar = dynamic(() => import('@/components/Comman/Bar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const Emptyloading = dynamic(() => import('@/components/Comman/Emptyloading'))
const TextInput = dynamic(() => import('@/components/Comman/TextInput'))
const SelectInput = dynamic(() => import('@/components/Comman/SelectInput'))
const Button = dynamic(() => import('@/components/Comman/Button'))

import { AUTHENCIATED, user } from '@/redux/reducers/authSlice'
import { UPDATE } from '@/redux/reducers/appSlice'

import { sessionVerficiation } from '@/redux/api/redux.user'
import { wrapper } from '@/redux/store'

import { TrashIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import { submit } from '@/provider/provider.Buttons'
import { name, framework } from '@/provider/provider.Inputs'
import { projectValidtion } from '@/provider/provider.Validations'
import { DeletHeader, GetHeader, PostHeader } from '@/provider/provider.Headers'
import { fetchSsr } from '@/redux/api/redux.comman'
import { CLOSETAB } from '@/redux/reducers/editorSlice'
import { deleteContainer } from '@/redux/api/redux.editor'


export default function Dashborad() {

  const router = useRouter()
  const dispatch = useDispatch()
  const [project, setproject] = useState([])
  const [loading, setloading] = useState(false)

  const loadUserProjects = useCallback(async () => {
    try {
      const sessionProjects = sessionStorage.getItem('projects') ?? false
      if (sessionProjects) {
        setloading(false)
        setproject(JSON.parse(sessionProjects))
      }
      else {
        const api = await fetch('/api/projects')
        switch (api.status) {
          case 200:
            const apiRes = await api.json()
            sessionStorage.setItem('projects', JSON.stringify(apiRes))
            setproject(apiRes)
            setloading(false)
            break;
          case 400:
          case 404:
          case 429:
          case 500:
            router.push(`/${api.status}`)
        }
      }
    } catch (error) {
      router.push('/500')
    }
  }, [router])

  useEffect(() => {
    loadUserProjects()
  }, [loadUserProjects])

  const submitData = async (name, framework) => {
    const body = JSON.stringify({ 'name': name, 'framework': framework })
    const location = `/api/${name}/createProject`
    const api = await fetch(location, { ...PostHeader, body: body })
    switch (api.status) {
      case 201:
        sessionStorage.removeItem('projects')
        loadUserProjects()
        dispatch(UPDATE('Project created'))
        router.push(`/playground/${name}`)
        break;
      case 400:
      case 404:
      case 500:
        router.push(`/${api.status}`)
        break;
    }
  }

  const form = useFormik({
    initialValues: { name: '', framework: '' },
    validationSchema: projectValidtion,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const api = await fetchSsr(`/playground/${values.name}/check`)
      switch (api.status) {
        case 200:
          form.setFieldError('name', 'Name already taken')
          break;
        case 202:
          submitData(values.name, values.framework)
          break;
        case 400:
        case 404:
        case 500:
          router.push(`/${api.status}`)
          break;
      }
    }
  })

  useEffect(() => {
    dispatch(CLOSETAB([]))
    dispatch(deleteContainer())
  }, [dispatch])
  

  const openProject = useCallback((name) => router.push(`/playground/${name}`), [router])

  const handleDelete = useCallback(async (Name) => {
    const confirmation = confirm('Are your sure you want to delete')
    if (confirmation) {
      const body = JSON.stringify({ 'name': Name })
      const location = `/api/${Name}/createProject`
      const api = await fetch(location, { ...DeletHeader, body: body })
      switch (api.status) {
        case 202:
          sessionStorage.removeItem('projects')
          loadUserProjects()
          dispatch(UPDATE('Project Deleted'))
          break;
        case 400:
        case 404:
        case 500:
          router.push(`/${api.status}`)
          break;
      }
    }
  }, [router, dispatch, loadUserProjects])

  return (
    <>
      <Head>
        <title>TailCode | Dashboard</title>
      </Head>
      <Bar />
      <main className="min-h-screen my-24 w-[90%] lg:w-[80%] mx-auto">
        <section className="grid grid-cols-3 gap-4 relative">
          <div className="col-span-full lg:col-span-2 flex flex-col space-y-2">
            <div className='h-full w-full space-y-5'>
              {!loading ? <>
                {project.length > 0 ?
                  <>
                    <p className='text-2xl font-bold text-black dark:text-white'>My Projects</p>
                    <table className='w-full h-auto'>
                      <thead>
                        <tr >
                          <th className='text-start text-sm text-black dark:text-white pb-4'>SNO</th>
                          <th className='text-start text-sm text-black dark:text-white pb-4'>Name</th>
                          <th className='text-start text-sm text-black dark:text-white pb-4'>Framework</th>
                          <th className='text-start text-sm text-black dark:text-white pb-4'></th>
                        </tr>
                      </thead>
                      <tbody className='space-y-1'>
                        {project.map((data, index) => {
                          return <tr key={index} className=' h-2 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer '>
                            <td className='text-start text-sm text-black dark:text-white py-4 px-2 rounded-l-md' onClick={() => openProject(data.name)}>{index + 1}</td>
                            <td className='text-start text-sm text-black dark:text-white py-4' onClick={() => openProject(data.name)}>{data.name}</td>
                            <td className='text-start text-sm text-[#2DAC9D] py-4' onClick={() => openProject(data.name)}>{data.framework === 'reactjs' ? "React Js": "Next Js"}</td>
                            <td className='text-start text-sm text-black dark:text-white py-4 rounded-r-md'><TrashIcon className='w-4 h-4' onClick={() => handleDelete(data.name)} /></td>
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </>
                  :
                  <div className='w-full h-full flex'>
                    <div className='w-full space-y-10'>
                      <h1 className='text-xl text-black font-medium dark:text-white'>No Projects</h1>
                      <div className='relative w-1/2 h-56 mx-auto'>
                        <Image src="/notfounded.svg" alt="emptypng" layout='fill' />
                      </div>
                    </div>
                  </div>}
              </>
                : <Emptyloading />
              }
            </div>
          </div>
          <div className="col-span-full lg:col-span-1">
            <form onSubmit={form.handleSubmit} className='sticky top-24 space-y-6 px-3 py-6 rounded-md bg-black/10 dark:bg-white/10'>
              <legend className='font-bold text-xl text-black dark:text-white'>Create Project</legend>
              <TextInput {...name} value={form.values.name}
                change={form.handleChange} blur={form.handleBlur}
                error={form.touched.name && form.errors.name}
              />
              <SelectInput {...framework}
                value={form.values.framework}
                change={form.handleChange} blur={form.handleBlur}
                error={form.touched.framework && form.errors.framework}
              />
              <small className='text-[2px]'>In addition to react or next js by default, tailwind css and redux will be included</small>
              <Button {...submit} />
            </form>
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
      break
    case 401:
      return { redirect: { destination: "/signin" } }
    case 400:
    case 429:
    case 500:
      return { redirect: { destination: `/${result}` } }
  }
})