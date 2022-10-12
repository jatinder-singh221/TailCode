import { useFormik } from 'formik'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { XIcon } from '@heroicons/react/outline'
import countryList from 'react-select-country-list'

import TextInput from '../Comman/TextInput'
import SelectInput from '../Comman/SelectInput'
import Button from '../Comman/Button'

import { basicInfoValidation, contactInfoValidation } from '@/provider/provider.Validations'
import { updateButton } from '@/provider/provider.Buttons'
import { updateBasicInfo, updateContactInfo } from '@/redux/api/redux.user'
import { UPDATE } from '@/redux/reducers/appSlice'

import { email, firstName, lastName, number, country, gender, status } from '@/provider/provider.Inputs'

export default function Editform(props) {

    const dispatch = useDispatch()
    const options = useMemo(() => countryList().getData(), [])

    const basicInfoForm = useFormik({
        initialValues: {
            first_name: props?.user?.first_name,
            last_name: props?.user?.last_name,
            email: props?.user?.email,
        },

        validationSchema: basicInfoValidation,

        onSubmit: (value) => {
            if (basicInfoForm.dirty){
                dispatch(updateBasicInfo(value))
                props.refer.current.click()
            } else dispatch(UPDATE('No changes detected'))
        }
    })

    const userStatus = status.options.find(element => element.label === props.userStatus)
    const userGender = gender.options.find(element => element.label === props.gender)
    const userCountry = options.find(element => element.label === props.country)

    const contactInfoForm = useFormik({
        initialValues: {
            number: props?.number,
            country: userCountry?.value,
            userStatus: userStatus?.value,
            gender: userGender?.value
        },
        validationSchema: contactInfoValidation,
        onSubmit: (value) => {
            if (contactInfoForm.dirty){
                dispatch(updateContactInfo(value))
                props.refer.current.click()
            } else dispatch(UPDATE('No changes detected'))
        }
    })

    return (
        <>
            <XIcon className='w-5 h-5 active:scale-75 cursor-pointer sticky top-8 left-[90%] text-black dark:text-white' onClick={props.editFormToogler} />
            <p className='px-6 py-2 text-lg text-black dark:text-white'>
                Edit Personal Info
            </p>
            <form className='w-[90%] mx-auto px-4 py-2 rounded-md mb-2 space-y-4' onSubmit={basicInfoForm.handleSubmit}>
                <legend className='text-black dark:text-white font-medium text-lg'>Basic info</legend>
                <TextInput {...email} value={basicInfoForm.values.email}
                    change={basicInfoForm.handleChange} blur={basicInfoForm.handleBlur}
                    error={basicInfoForm.touched.email && basicInfoForm.errors.email}
                />
                <TextInput {...firstName} value={basicInfoForm.values.first_name}
                    change={basicInfoForm.handleChange} blur={basicInfoForm.handleBlur}
                    error={basicInfoForm.touched.first_name && basicInfoForm.errors.first_name}
                />
                <TextInput {...lastName} value={basicInfoForm.values.last_name}
                    change={basicInfoForm.handleChange} blur={basicInfoForm.handleBlur}
                    error={basicInfoForm.touched.last_name && basicInfoForm.errors.last_name}
                />
                <Button {...updateButton} />
            </form>
            <form className='w-[90%] mx-auto px-4 py-2 rounded-md space-y-4' onSubmit={contactInfoForm.handleSubmit}>
                <legend className='text-black dark:text-white font-medium text-lg'>Contact info</legend>
                <TextInput {...number} value={contactInfoForm.values.number}
                    change={contactInfoForm.handleChange} blur={contactInfoForm.handleBlur}
                    error={contactInfoForm.touched.number && contactInfoForm.errors.number}
                />
                <SelectInput {...country} options={options} value={contactInfoForm.values.country}
                    change={contactInfoForm.handleChange} blur={contactInfoForm.handleBlur}
                    error={contactInfoForm.touched.country && contactInfoForm.errors.country}
                />
                <SelectInput {...gender} value={contactInfoForm.values.gender}
                    change={contactInfoForm.handleChange} blur={contactInfoForm.handleBlur}
                    error={contactInfoForm.touched.gender && contactInfoForm.errors.gender}
                />
                <SelectInput {...status} value={contactInfoForm.values.userStatus}
                    change={contactInfoForm.handleChange} blur={contactInfoForm.handleBlur}
                    error={contactInfoForm.touched.userStatus && contactInfoForm.errors.userStatus}
                />
                <Button {...updateButton} />
            </form>
        </>
    )
}
