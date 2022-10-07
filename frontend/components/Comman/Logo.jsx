import Image from 'next/image'
import Link from 'next/link'

import TailCodePng from '@/public/TailCode.svg'

export default function Logo() {
    return (
        <Link passHref href='/'>
            <div className='flex items-center space-x-2 select-none cursor-pointer'>
                <div className='h-7 w-7 relative'>
                    <Image src={TailCodePng} alt="TailCodePng" layout="fill" priority />
                </div>
                <p className='text-black dark:text-white cursor-pointer text-xl 
                tracking-wide'
                >
                    TailCode
                </p>
            </div>
        </Link>
    )
}
