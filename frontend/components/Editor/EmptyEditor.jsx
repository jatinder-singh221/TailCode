import React from 'react'
import Image from 'next/image'


import TailCode from '@/public/TailCode.svg'

export default function EmptyEditor() {
    return (
        <div className='flex flex-col w-full h-full items-center justify-center space-y-10 bg-black/10 dark:bg-white/10 select-none overflow-hidden'>
            <div className="relative w-44 h-44 brightness-50 ">
                <Image src={TailCode} alt="logo" layout='fill' priority draggable='false' className='opacity-40'/>
            </div>
            <div>
                <h3 className='text-xl font-bold lg:hidden'>Welcome to TailCode</h3>
            </div>
            <ul className='space-y-2 hidden lg:block'>
                <li className='flex items-center space-x-4 text-xs'>
                    <span className='font-medium'>Show Explore</span>
                    <kbd className='py-1 px-4 font-bold rounded-sm text-[#2DAC9D]'>ctrl + G</kbd>
                </li>
                <li className='flex items-center space-x-4 text-xs'>
                    <span className='font-medium'>Show Search</span>
                    <kbd className='py-1 px-4 font-bold rounded-sm text-[#2DAC9D]'>ctrl + K or ctrl + f</kbd>
                </li>
                <li className='flex items-center space-x-4 text-xs'>
                    <span className='font-medium'>Search Components</span>
                    <kbd className='py-1 px-4 font-bold rounded-sm text-[#2DAC9D]'>ctrl + U</kbd>
                </li>
                <li className='flex items-center space-x-4 text-xs'>
                    <span className='font-medium'>Open Settings</span>
                    <kbd className='py-1 px-4 font-bold rounded-sm text-[#2DAC9D]'>ctrl + Q</kbd>
                </li>
            </ul>
        </div>
    )
}