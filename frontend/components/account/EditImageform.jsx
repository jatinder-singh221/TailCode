import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { XIcon, PlusIcon } from '@heroicons/react/outline'

import Button from '../Comman/Button'
import ImageUpload from '../Comman/ImageUpload'

import { updateButton } from '@/provider/provider.Buttons'
import { updateUserProfile } from '@/redux/api/redux.user'
import { UPDATE } from '@/redux/reducers/appSlice'

export default function Editform(props) {

    const [image, setimage] = useState(props.image)
    const dispatch = useDispatch()

    const handleClearForm = () => setimage('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (image !== props.image) {
            const formData = new FormData()
            formData.append('userProfileImage', image)
            dispatch(updateUserProfile(formData))
            props.refer.current.click()
        }
        else dispatch(UPDATE('No change detected'))
    }

    const handleImageUpload = (e) => {
        setimage(e.target.files[0])
    }

    return (
        <>
            <p className='p-5 text-md text-black dark:text-white flex items-center justify-between'>
                <span>Update profile Image</span>
                <XIcon className='w-5 h-5 active:scale-75 cursor-pointer fixed right-4' onClick={props.editFormToogler} />
            </p>
            <form className='w-[90%] mx-auto px-4 py-2 rounded-md space-y-6' onSubmit={handleSubmit}>
                <ImageUpload image={image} setimage={handleImageUpload} handleClearForm={handleClearForm} />
                <Button {...updateButton} />
            </form>
        </>
    )
}
