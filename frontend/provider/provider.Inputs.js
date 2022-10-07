export const username = {
    type: 'email',
    id: 'username',
    name: 'username',
    mode: 'email',
    placeholder: 'example@somemail.com',
    label: 'username',
    focus: true
}

export const email = {
    type: 'email',
    id: 'email',
    name: 'email',
    mode: 'email',
    label:'Emial',
    placeholder: 'example@somemail.com',
}

export const detail = {
    id: 'detail',
    name: 'detail',
    label: 'Detail',
    placeholder: 'example: I am unable to login',
}

export const password = {
    type: 'password',
    id: 'password',
    name: 'password',
    mode: 'password',
    label: 'password',
    placeholder: '***************',
}

export const confirmPassword = {
    type: 'password',
    id: 'confirmPassword',
    name: 'confirmPassword',
    mode: 'password',
    label: 'confirm password',
    placeholder: '***************',
}

export const otp = {
    type: 'text',
    id: 'otp',
    name: 'otp',
    mode: 'text',
    label: 'OTP',
    placeholder: '****',
    focus: true
}

export const rename = {
    type: 'text',
    id: 'id',
    name: 'id',
    mode: 'text',
    placeholder: 'Rename',
}

export const firstName = {
    type: 'text',
    id: 'first_name',
    name: 'first_name',
    mode: 'text',
    placeholder: 'jhon',
    label:'First name'
}
export const lastName = {
    type: 'text',
    id: 'last_name',
    name: 'last_name',
    mode: 'text',
    placeholder: 'doe',
    label:'Last name'
}

export const name = {
    type: 'text',
    id: 'name',
    name: 'name',
    mode: 'text',
    label: 'Name',
    placeholder: 'example',
}

export const number = {
    type: 'tel',
    id: 'number',
    name: 'number',
    mode: 'tel',
    placeholder: '+0000000',
    label:'Number'
}

export const country = {
    id: 'country',
    name: 'country',
    placeholder: 'india',
    label: 'Country'
}
export const gender = {
    id: 'gender',
    name: 'gender',
    placeholder: 'Gender',
    label: 'gender',
    options: [
        {value: '', label: '--select--'},
        { value: 'm', label: 'Male' },
        { value: 'f', label: 'Female' },
        { value: 'o', label: 'Other' },
    ]
}
export const status = {
    id: 'userStatus',
    name: 'userStatus',
    placeholder: 'Status',
    label: 'status',
    options: [
        {value: '', label: '--select--'},
        { value: 'su', label: 'Student' },
        { value: 'te', label: 'Teacher' },
        { value: 'fullt', label: 'Full time job' },
        { value: 'part', label: 'Part time job' },
        { value: 'o', label: 'Other' }
    ]
}

export const title = {
    type: 'text',
    id: 'title',
    name: 'title',
    mode: 'text',
    label: 'title',
    placeholder: 'eg top 10 feature of ...',
    focus: true
}

export const description = {
    type: 'text',
    id: 'description',
    name: 'description',
    mode: 'text',
    label: 'Descritpion',
    placeholder: 'a breif description about content',
}

export const Slug = {
    type: 'text',
    id: 'slug',
    name: 'slug',
    mode: 'text',
    placeholder: 'eg-top-10-feature-of',
    label: 'slug'
}

export const blogStatus = {
    id: 'status',
    name: 'status',
    placeholder: 'Status',
    label: 'status',
    options: [
        {value: '', label: '--select--'},
        { value: 'D', label: 'Draft' },
        { value: 'P', label: 'Publish' },
        { value: 'H', label: 'Hidden' },
    ]
}

export const componentStatus = {
    id: 'catagory',
    name: 'catagory',
    placeholder: 'catagory',
    label: 'catagory',
    options: [
        {value: '', label: '--select--'},
        { value: 'Navbars', label: 'Navbars' },
        { value: 'Buttons', label: 'Buttons' },
    ]
}

export const jsx = {
    type: 'text',
    id: 'jsx',
    name: 'jsx',
    mode: 'text',
    placeholder: 'JSX',
}

export const code = {
    type: 'text',
    id: 'code',
    name: 'code',
    mode: 'text',
    placeholder: 'paste some code here',
    label: 'code'
}


export const framework = {
    id: 'framework',
    name: 'framework',
    placeholder: 'framework',
    label: 'framework',
    options: [
        {value: '', label: '--select--'},
        { value: 'reactjs', label: 'React Js' },
        { value: 'next', label: 'Next Js' },
    ]
}