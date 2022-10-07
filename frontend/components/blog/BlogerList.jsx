import { useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { PencilIcon, TrashIcon} from '@heroicons/react/outline'

export default function BlogerList(props) {
    const created_on = new Date(props.created_on) ?? false

    return (
        <li className='relative py-5 w-full grid grid-cols-3 before:w-[5px] before:h-1/2 before:absolute px-4
            before:top-[25%] before:left-0 hover:before:bg-[#2DAC9D] before:-z-10 before:rounded-md gap-2'>
            <div className="col-span-2 flex flex-col space-y-3">
                <small className='block text-xs text-black dark:text-white'>Created on {created_on.toDateString()}</small>
                <Link href={`/blogs/${props.slug}`} passHref>
                    <a className='block space-y-3'>
                        <h1 className='font-bold text-sm lg:text-2xl text-black dark:text-white'>{props.title}</h1>
                        <p  className='hidden lg:block text-sm text-black dark:text-white'>{props.description}</p>
                    </a>
                </Link>
                <div className='flex items-center space-x-4'>
                    <u className='text-black dark:text-white text-xs'>
                        {props.status === 'P' ? 'Publish' : props.status === 'D'? 'Draft' : 'Hidden'}
                    </u>
                    <PencilIcon className='w-6 h-6 p-1 rounded-full hover:scale-105 active:bg-black/10 
                        dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => props.handleEditblogPost(props)}/>
                    <TrashIcon className='w-6 h-6 p-1 rounded-full hover:scale-105 active:bg-black/10 
                        dark:active:bg-white/10 cursor-pointer text-black dark:text-white active:backdrop-blur backdrop-filter' onClick={() => props.handleDeletPost(props.slug)} />
                </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <div className='h-20 w-20 lg:h-32 lg:w-32 relative rounded-sm overflow-hidden'>
                    <Image src={props.banner} layout='fill' alt='banner' priority className='opacity-80'/>
                </div>
            </div>
        </li>
    )
}
