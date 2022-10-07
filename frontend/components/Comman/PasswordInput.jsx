import { useState, useCallback } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

export default function PasswordInput(props) {

  const [Eye, setEye] = useState(EyeIcon)

  const handleShowPassword = useCallback(() => {
    const element = document.getElementById(props.id)
    if (element.type === 'password') {
      setEye(EyeOffIcon)
      element.type = 'text'
    } else {
      setEye(EyeIcon)
      element.type = 'password'
    }
  }, [props.id])

  return (
    <div className='relative h-auto'>
      <label htmlFor={props.id} className='flex justify-between px-2 mb-3'>
        <span className='text-sm capitalize text-black dark:text-white'>{props.label}</span>
        <span className='text-xs capitalize text-pink-600'>{props.error}</span>
      </label>
      <input type={props.type} id={props.id} name={props.name}
      inputMode={props.mode} value={props.value} onChange={props.change}
      onBlur={props.blur} placeholder={props.placeholder}
      className={`h-11 w-full rounded-md outline-none bg-black/10 dark:bg-white/10 text-sm 
      px-3 placeholder:text-sm text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50
      ${props.error ? 'border-b-2 border-pink-600 rounded-b-none': 'focus:border-b-2 focus:rounded-none focus:rounded-t-md focus:border-[#2DAC9D]'}
      `} 
      />
      <label htmlFor={props.id}
        className='absolute top-12 right-2 capitalize px-1 
        text-sm cursor-pointer' onClick={handleShowPassword}
      >
        <Eye className='w-4 h-4 text-black dark:text-white' />
      </label>
    </div>
  )
}
