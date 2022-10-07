import * as yup from 'yup'

export const signin = yup.object({
    username: yup.string().required('username is required').email('invalid email'),
    password: yup.string().required('password is required')
})


const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

export const signup = yup.object({
    username: yup.string().email('Invalid email address').required('Username is required'),
    password: yup.string().required('Password is required').matches(passRegex, 'Weak password'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Password mismatch')
})

export const Otp = yup.object({
    otp: yup.number().required('Otp is required')
})

export const renameFormValidtion = yup.object({
    id: yup.string().required('Required')
})

const nameRegex = /^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/
export const basicInfoValidation = yup.object({
    email: yup.string().required('Email address is required'),
    first_name: yup.string().required('First Name is required').matches(nameRegex, 'Invalid'),
    last_name: yup.string().required('Last Name is required').matches(nameRegex, 'Invalid'),
})

export const contactInfoValidation = yup.object({
    number: yup.string().required('Number is required'),
    country: yup.string().required('Country is required'),
    userStatus: yup.string().required('Status is required'),
    gender: yup.string().required('Gender is required')
})

export const passwordUpdateValidation = yup.object({
    password: yup.string().required('Password is required').matches(passRegex, 'Weak password'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Password mismatch')
})

export const help = yup.object({
    username:yup.string().required('Username is required'),
    detail: yup.string().required('Detail is required'),
})

export const projectValidtion = yup.object({
    name: yup.string().required('Name is required'),
    framework: yup.string().required('Choose framework')
})

export const componentValidation = yup.object({
    name: yup.string().required('name is required'),
    catagory: yup.string().required('catagory is required'),
    image: yup.string().nullable().required('Image is required'),
    code: yup.string().required('Code is required')
})


export const Blog = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('description is required'),
    slug: yup.string().nullable().required('slug is required'),
    banner: yup.string().nullable().required('Image is required'),
    status: yup.string().required('status is required'),
    html: yup.string().required('body is required'),
})