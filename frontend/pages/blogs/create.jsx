import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

import { useDispatch, useSelector } from "react-redux"

import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Tab } from '@headlessui/react'
import slugify from 'slugify'

import { AUTHENCIATED } from "@/redux/reducers/authSlice"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite'
const mdParser = new MarkdownIt()

const Appbar = dynamic(() => import('@/components/Comman/Bar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))
const TextInput = dynamic(() => import('@/components/Comman/TextInput'))
const ReadOnlyInput = dynamic(() => import('@/components/Comman/ReadOnlyInput'))
const Button = dynamic(() => import('@/components/Comman/Button'))
const Selectinput = dynamic(() => import('@/components/Comman/SelectInput'))
const ImageUpload = dynamic(() => import('@/components/Comman/ImageUpload'))
const BlogerList = dynamic(() => import('@/components/blog/BlogerList'))
const Pagination = dynamic(() => import('@/components/Comman/Pagination'))
const Dialog = dynamic(() => import('@/components/core/Dialog'), { ssr: false })

import { DIALOG, dialog } from '@/redux/reducers/appSlice'
import { title, description, blogStatus, Slug } from '@/provider/provider.Inputs'
import { submit } from '@/provider/provider.Buttons'
import { UPDATE } from '@/redux/reducers/appSlice'
import { blogTitleStatus } from '@/redux/api/redux.blog'

import { wrapper } from "@/redux/store"
import { sessionVerficiation } from "@/redux/api/redux.user"
import { Blog } from '@/provider/provider.Validations'


export default function Create() {

    const [image, setimage] = useState('')
    const [blog, setblog] = useState([])
    const [creatForm, setcreatForm] = useState(true)
    const [slug, setslug] = useState('')
    const dialogs = useSelector(dialog) ?? false

    const router = useRouter()
    const button = useRef()
    const dispatch = useDispatch()

    const { index, page } = router.query ?? 0

    const loadUserBlogPost = useCallback(async () => {
        let url = ''
        page ? url = `/api/blog/list?page=${page}` : url = `/api/blog/list`
        const api = await fetch(url)
        switch (api.status) {
            case 200:
                const apiRes = await api.json()
                setblog(apiRes)
                break;
            case 400:
            case 404:
            case 429:
            case 500:
                router.push(`/${api.status}`)
        }
    }, [router, page])

    useEffect(() => {
        if (index == 1) {
            loadUserBlogPost()
        }
    }, [loadUserBlogPost, index])

    const form = useFormik({
        initialValues: {
            title: '',
            description: '',
            banner: '',
            status: '',
            slug: '',
            html: '',
        },
        validationSchema: Blog,
        onSubmit: async (values) => {
            const result = await blogTitleStatus(values.slug)
            switch (result) {
                case 200:
                    form.setFieldError('title', 'title already in use')
                    document.getElementById('title').scrollIntoView()
                    break;
                case 404:
                    const formData = new FormData()
                    formData.append('title', values.title)
                    formData.append('description', values.description)
                    formData.append('status', values.status)
                    formData.append('slug', values.slug)
                    formData.append('html', values.html)
                    formData.append('banner', image)
                    const api = await fetch('/api/blog/create', {
                        method: 'POST',
                        headers: { 'Accept': '*/*', },
                        body: formData
                    })
                    switch (api.status) {
                        case 201:
                            form.resetForm()
                            setimage('')
                            dispatch(UPDATE(`Blog created`))
                            if (values.status === 'P')
                                router.push(`/blogs/${values.slug}`)
                            break;
                        case 400:
                        case 404:
                        case 429:
                        case 500:
                            router.push(`/${api.status}`)
                    }
                    break;
                case 500:
                    router.push('/500')
                    break;
            }
        }
    })

    const handleTitleToSlug = (e) => {
        if (e.target.value.length > 0) {
            const slug = slugify(e.target.value).toLowerCase().replace(/[^\w\s]/gi, '-')
            if (creatForm) {
                form.handleBlur(e)
                form.setFieldValue('slug', slug)
            }
            else if (!creatForm) {
                updateForm.handleBlur(e)
                updateForm.setFieldValue('slug', slug)
            }
        }
        else {
            form.setFieldValue('slug', '')
        }
    }

    const handleCreateHtmlChange = ({ html, text }) => {
        if (creatForm) {
            if (text.length > 1) form.setFieldValue('html', text)
            else form.setFieldError('html', 'body is required')
        }
        else {
            if (text.length > 1) updateForm.setFieldValue('html', text)
            else updateForm.setFieldError('html', 'body is required')
        }
    }

    const handleImage = (e) => {
        if (creatForm) {
            if (e.target.value.length != 0) {
                form.setFieldValue('banner', e.target.value)
                setimage(e.target.files[0])
            }
            else form.setFieldError('banner', 'Banner is required')
        }
        else {
            if (e.target.value.length != 0) {
                updateForm.setFieldValue('banner', e.target.files[0])
                setimage(e.target.files[0])
            }
        }
    }


    const handleClear = () => {
        if (creatForm) {
            form.setFieldValue('banner', '')
            setimage('')
        }
        else {
            updateForm.setFieldValue('banner', '')
            setimage('')
        }
    }

    const updateForm = useFormik({
        initialValues: {
            title: '',
            description: '',
            status: '',
            slug: '',
            banner: '',
            html: '',
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('status', values.status)
            formData.append('slug', values.slug)
            formData.append('html', values.html)
            if (values.banner !== '') {
                formData.append('banner', image)
            }
            const api = await fetch(`/api/blog/${slug}`, {
                method: 'PATCH',
                headers: { 'Accept': '*/*', },
                body: formData
            })
            switch (api.status) {
                case 200:
                    dispatch(UPDATE(`updated`))
                    break;
                case 400:
                case 404:
                case 429:
                case 500:
                    router.push(`/${api.status}`)
            }
        }
    })

    const handleEditblogPost = useCallback((data) => {
        button.current.click()
        setcreatForm(false)
        updateForm.resetForm()
        updateForm.setValues({
            title: data.title,
            description: data.description,
            status: data.status,
            slug: data.slug,
            html: data.html,
            banner: data.banner
        })
        setslug(data.slug)
    }, [updateForm])

    const handleDeletPost = useCallback(async (slug) => {
        const confirmation = confirm('Do you want to delete blog')
        if (confirmation) {
            try {
                const api = await fetch(`/api/blog/${slug}`, {
                    method: 'DELETE',
                    headers: { 'Accept': '*/*', },
                })
                switch (api.status) {
                    case 204:
                        loadUserBlogPost()
                        dispatch(UPDATE(`Deleted successfully`))
                        dispatch(DIALOG(null))
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
        }
    }, [dispatch, loadUserBlogPost, router])

    const handleIndex = (value) => router.push(`/blogs/create?index=${value}`)

    return (
        <>
            <Head>
                <title>TailCode | Blog | {index == 0 ? 'Create' : 'My blogs'}</title>
                <meta name='description' content='TailCode Blog provides you topic related insite' />
            </Head>
            <Appbar />
            <main className='min-h-screen w-[90%] mt-14 mx-auto' data-color-mode="dark">
                {dialogs && <Dialog handleOkOrCancel={handleOkOrCancel} />}
                <Tab.Group className='w-full h-' as='div' defaultIndex={index}>
                    <Tab.List className='w-full flex items-center justify-center space-x-8'>
                        <Tab className={({ selected }) => `relative flex items-center space-x-3 text-sm p-2 rounded-md 
                        text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all ${selected && `
                        before:w-[5px] before:h-1/2 before:absolute 
                        before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                        bg-black/20 dark:bg-white/10
                        `}`}
                            onClick={() => handleIndex(0)}
                        >
                            Create New Blog
                        </Tab>
                        <Tab className={({ selected }) => `relative flex items-center space-x-3 text-sm p-2 rounded-md 
                        text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all ${selected && `
                        before:w-[5px] before:h-1/2 before:absolute 
                        before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                        bg-black/20 dark:bg-white/10
                        `}`}
                            onClick={() => handleIndex(1)}
                        >
                            My Blogs
                        </Tab>
                        <Tab className='hidden' ref={button}>update</Tab>
                    </Tab.List>
                    <Tab.Panels className='my-4 w-full h-full'>
                        <Tab.Panel className='lg:w-[60%] mx-auto'>
                            <form className='space-y-10 col-span-2 lg:col-span-1 my-10' onSubmit={form.handleSubmit}>
                                <legend className='font-bold text-2xl text-black dark:text-white'>Create New Blog</legend>
                                <TextInput {...title} value={form.values.title}
                                    change={form.handleChange} blur={handleTitleToSlug}
                                    error={form.touched.title && form.errors.title}
                                />
                                <TextInput {...description} value={form.values.description}
                                    change={form.handleChange} blur={form.handleBlur}
                                    error={form.touched.description && form.errors.description}
                                />
                                <ReadOnlyInput {...Slug} value={form.values.slug} error={form.touched.slug && form.errors.slug} />
                                <div className='space-y-4'>
                                    <p className='flex justify-between px-2 mb-3'>
                                        <span className='text-sm capitalize text-black dark:text-white'>Body</span>
                                        <span className='text-xs capitalize text-pink-600'>{form.touched.html && form.errors.html}</span>
                                    </p>
                                    <MdEditor renderHTML={text => mdParser.render(text)} onBlur={form.handleBlur} id='html' name='html' onChange={handleCreateHtmlChange}
                                        className={`h-[700px] w-full outline-none bg-black/10 dark:bg-white/10 text-sm rounded-md  backdrop-filter backdrop-blur-2xl
                                        p-3 placeholder:text-sm text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50
                                        ${form.touched.html && form.errors.html ? 'border-b-2 border-pink-600 rounded-b-none' : 'focus:border-b-2 focus:rounded-none focus:rounded-t-md focus:border-[#2DAC9D]'}
                                        `}
                                    />
                                </div>
                                <div className='space-y-4'>
                                    <p className='flex justify-between px-2 mb-3'>
                                        <span className='text-sm capitalize text-black dark:text-white'>Banner</span>
                                        <span className='text-xs capitalize text-pink-600'>{form.touched.banner && form.errors.banner}</span>
                                    </p>
                                    <ImageUpload image={image} setimage={(e) => handleImage(e)} handleClearForm={handleClear} error={form.touched.banner && form.errors.banner} />
                                </div>
                                <Selectinput {...blogStatus} value={form.values.status}
                                    change={form.handleChange} blur={form.handleBlur}
                                    error={form.touched.status && form.errors.status}
                                />
                                <Button {...submit} />
                            </form>
                        </Tab.Panel>
                        <Tab.Panel>
                            <ul className="w-full space-y-5 mb-10 animate-show-out">
                                {blog.results?.length > 0 ?
                                    <>
                                        <p className='text-2xl font-bold text-black dark:text-white'>My Blogs</p>
                                        {blog.results.map((data, index) => {
                                            return <BlogerList key={index} {...data} handleEditblogPost={handleEditblogPost} handleDeletPost={handleDeletPost} />
                                        })}
                                    </>
                                    :
                                    <div className='w-full h-[calc(100vh-9.5rem)] flex py-10 items-center justify-center'>
                                        <div className='w-full space-y-10'>
                                            <h1 className='text-center text-xl text-black font-medium dark:text-white'>Blogs not founded</h1>
                                            <div className='relative w-1/2 h-56 mx-auto'>
                                                <Image src="/notfounded.svg" alt="emptypng" layout='fill' />
                                            </div>
                                        </div>
                                    </div>}
                            </ul>
                            <Pagination {...blog} page={page} setitems={setblog} url='/api/blog/list' />
                        </Tab.Panel>
                        <Tab.Panel className='lg:w-[60%] mx-auto'>
                            <form className='space-y-10 col-span-2 lg:col-span-1 mb-10' onSubmit={updateForm.handleSubmit}>
                                <legend className='font-bold text-2xl text-black dark:text-white'>Update Blog</legend>
                                <TextInput {...title} value={updateForm.values.title}
                                    change={updateForm.handleChange} blur={handleTitleToSlug}
                                    error={updateForm.touched.title && updateForm.errors.title}
                                />
                                <TextInput {...description} value={updateForm.values.description}
                                    change={updateForm.handleChange} blur={updateForm.handleBlur}
                                    error={updateForm.touched.description && updateForm.errors.description}
                                />
                                <ReadOnlyInput {...Slug} value={updateForm.values.slug}
                                    error={updateForm.touched.slug && updateForm.errors.slug}
                                />
                                <div className='space-y-4'>
                                    <p className='flex justify-between px-2 mb-3'>
                                        <span className='text-sm capitalize text-black dark:text-white'>Body</span>
                                        <span className='text-xs capitalize text-pink-600'>{form.touched.html && form.errors.html}</span>
                                    </p>
                                    <MdEditor value={updateForm.values.html} renderHTML={text => mdParser.render(text)} onBlur={updateForm.handleBlur} id='html' name='html' onChange={handleCreateHtmlChange}
                                        className={`h-[500px] w-full outline-none bg-black/10 dark:bg-white/10 text-sm rounded-md  backdrop-filter backdrop-blur-2xl
                                        p-3 placeholder:text-sm text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50
                                        ${updateForm.touched.html && updateForm.errors.html ? 'border-b-2 border-pink-600 rounded-b-none' : 'focus:border-b-2 focus:rounded-none focus:rounded-t-md focus:border-[#2DAC9D]'}
                                        `}
                                    />
                                </div>
                                <div className='space-y-4'>
                                    <p className='text-base text-black dark:text-white capitalize font-medium'>Banner</p>
                                    <ImageUpload image={updateForm.values.banner} setimage={(e) => handleImage(e)} handleClearForm={handleClear} error={updateForm.touched.banner && updateForm.errors.banner} />
                                </div>
                                <Selectinput {...blogStatus} value={updateForm.values.status}
                                    change={updateForm.handleChange} blur={updateForm.handleBlur}
                                    error={updateForm.touched.status && updateForm.errors.status}
                                />
                                <Button {...submit} />
                            </form>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
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
