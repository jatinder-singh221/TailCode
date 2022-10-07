import { useRef, Fragment, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { tab, activetab, } from '@/redux/reducers/editorSlice'
import { UPDATE } from "@/redux/reducers/appSlice"
import { componentValidation } from "@/provider/provider.Validations"
import { name, code, componentStatus } from "@/provider/provider.Inputs"
import { submit } from "@/provider/provider.Buttons"
import { saveFile } from '@/redux/api/redux.editor'

import Logo from '@/public/TailCode.svg'
import { HomeIcon, SaveIcon } from '@heroicons/react/solid'
import { Popover, Transition } from '@headlessui/react'

import TextInput from "../Comman/TextInput"
import Button from "../Comman/Button"
import TextArea from "../Comman/textArea"
import SelectInput from "../Comman/SelectInput"
import { DownloadIcon, LinkIcon, PlusIcon, XIcon } from '@heroicons/react/outline'

export default function EditorNavbar(props) {
    const ref = useRef()
    const [image, setimage] = useState('')
    const [imageUrl, setimageUrl] = useState('')
    const dispatch = useDispatch()

    const openTabs = useSelector(tab) ?? false
    const active = useSelector(activetab) ?? null
    const router = useRouter()

    const form = useFormik({
        initialValues: {
            name: '',
            catagory: '',
            image: '',
            code: '',
        },
        validationSchema: componentValidation,
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append('name', values.name)
            formData.append('image', image)
            formData.append('catagory', values.catagory)
            formData.append('code', values.code)
            const api = await fetch(`/api/${props.playgroundId}/createComponents`, {
                method: 'POST',
                headers: { 'Accept': '*/*', },
                body: formData
            })
            switch (api.status) {
                case 201:
                    dispatch(UPDATE('Component Created'))
                    ref.current.click()
                    form.resetForm()
                    setimage('')
                    break;
                case 400:
                case 404:
                case 429:
                case 500:
                    router.push(`/${api.status}`)
            }
        }
    })

    const handleClear = () => {
        setimage('')
        form.setFieldValue('image', '')
    }

    const handleImage = (e) => {
        setimage(e.target.files[0])
        form.setFieldValue('image', e.target.files[0])
    }

    const handleSave = useCallback(() => {
        try {
            if (openTabs) {
                const isChanged = openTabs.find(element => element.path === active.path)
                if (!isChanged.saved) {
                    const id = props.playgroundId
                    const value = props.refrenceEditor.current.getValue()
                    dispatch(saveFile(id, active.path, value))
                }
            }
        } catch (error) {
            dispatch(UPDATE('No file founded'))
        }
    }, [dispatch, props, openTabs, active])

    let url = process.env.NEXT_PUBLIC_API_URL + `/playground/${props.playgroundId}/download`

    
    const handleImageChange = (e) => {
        handleImage(e)
        setimageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const openLiveWindow = () => {
        const live = JSON.parse(sessionStorage.getItem('live')) ?? false
        if (live){
            const url = live.url + `:${live.port}`
            window.open(url, '_blank')
        }
    }
    
    return (
        <nav className='h-7 w-full flex items-center space-x-1 bg-black/10 dark:bg-white/10 px-2 overflow-x-auto hidden-scrollbar'>
            <div className='h-5 w-5 relative'>
                <Image src={Logo} alt="logo" layout="fill" priority />
            </div>
            <Link href='/' passHref>
                <a
                    className='flex items-center space-x-3 text-xs rounded-sm min-w-max px-3 py-0.5
            text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'
                >
                    <HomeIcon className='h-4 w-4' />
                    <span>Home</span>
                </a>
            </Link>
            <button type='button' onClick={handleSave}
                className='flex items-center space-x-2 text-xs rounded-sm min-w-max px-3 py-0.5
        text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'
            >
                <SaveIcon className='h-4 w-4' />
                <span>Save</span>
            </button>
            <Popover>
                <Popover.Button className='flex items-center space-x-2 text-xs rounded-sm min-w-max px-3 py-0.5
        text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all' ref={ref}
                >
                    <PlusIcon className='h-4 w-4' />
                    <span>Create Component</span>
                </Popover.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    as={Fragment}
                >
                    <Popover.Panel className='z-40 absolute bottom-3 right-3 flex flex-col w-[80%] lg:w-1/2 bg-black/20 dark:bg-white/10 backdrop-blur-2xl p-8 space-y-3 h-[97%] overflow-y-auto hidden-scrollbar rounded-md'>
                        <form className="w-full mx-auto space-y-4" onSubmit={form.handleSubmit}>
                            <legend className='block font-bold text-xl text-black dark:text-white'>Create Component</legend>
                            <TextInput {...name} value={form.values.name}
                                change={form.handleChange} blur={form.handleBlur}
                                error={form.touched.name && form.errors.name} />
                            <div className='space-y-4'>
                                <p className='flex justify-between px-2 mb-3'>
                                    <span className='text-sm capitalize text-black dark:text-white'>Image</span>
                                    <span className='text-xs capitalize text-pink-600'>{form.touched.image && form.errors.image}</span>
                                </p>
                                {image === '' ? <label id="image"
                                    className={`w-full min-h-[50px] bg-black/10 dark:bg-white/10 backdrop-blur-lg rounded-md flex items-center justify-center
                                        ${props.error ? 'border-b-2 border-pink-600 rounded-b-none' : 'focus:border-b-2 focus:rounded-none focus:rounded-t-md focus:border-[#2DAC9D]'}
                                    `}
                                >
                                    <p className="text-sm text-black dark:text-white">
                                        Choose file
                                        <input type="file" name="image" id="image" accept='image/jpg, image/jpeg, image/png' className='hidden' onChange={handleImageChange} />
                                    </p>
                                </label>
                                    :
                                    <img src={imageUrl ? imageUrl : '/avtar.jpg'} alt="image" className='rounded-md min-h-[50px]' />
                                }
                                <button type='button' className='text-black dark:text-white text-sm hover:text-red-600 px-2' onClick={handleClear}>Clear</button>
                            </div>
                            <SelectInput {...componentStatus} value={form.values.catagory}
                                change={form.handleChange} blur={form.handleBlur}
                                error={form.touched.catagory && form.errors.catagory}
                            />
                            <div>
                                <TextArea {...code}
                                    value={form.values.code}
                                    change={form.handleChange} blur={form.handleBlur}
                                    error={form.touched.code && form.errors.code}
                                />
                                <small className="text-xs">Place full component code</small>
                            </div>
                            <Button {...submit} />
                        </form>
                    </Popover.Panel>
                </Transition>
            </Popover>
            <Link href={url} passHref>
                <a target='_blank' rel="noopener noreferrer"
                    className='flex items-center space-x-3 text-xs rounded-sm min-w-max px-3 py-0.5
                text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'
                >
                    <DownloadIcon className='h-4 w-4' />
                    <span>Download</span>
                </a>
            </Link>
            <button type='button' onClick={openLiveWindow}
                className='flex items-center space-x-2 text-xs rounded-sm min-w-max px-3 py-0.5
            text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'
            >
                <LinkIcon className='h-4 w-4' />
                <span>Live Window</span>
            </button>
            <Link href='/' passHref>
                <a
                    className='flex items-center space-x-3 text-xs rounded-sm min-w-max px-3 py-0.5
                 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all'
                >
                    <XIcon className='h-4 w-4' />
                    <span>Close</span>
                </a>
            </Link>
        </nav>
    )
}
