import Logo from './Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Footer() {
    const router = useRouter()
    const pathname = router.pathname

    return (
        <footer className='h-auto w-full flex flex-col p-10'>
            <div className='grid grid-cols-2 lg:grid-cols-4 h-auto gap-2'>
                <div className='col-span-2 lg:col-span-1 py-5'>
                    <Logo />
                </div>
                <div className='col-span-1 py-3'>
                    <strong className='text-black dark:text-white'>Resources</strong>
                    <ul className='space-y-2 py-2'>
                        <li>
                            <Link href='https://tailwindcss.com'>
                                <a target='_blank' rel="noopener noreferrer" className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Tailwind css
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='https://redux.js.org'>
                                <a target='_blank' rel="noopener noreferrer" className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Redux
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='https://headlessui.com/'>
                                <a target='_blank' rel="noopener noreferrer" className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Headless UI
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='https://nextjs.org/'>
                                <a target='_blank' rel="noopener noreferrer" className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Next.js
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='https://reactjs.org/'>
                                <a target='_blank' rel="noopener noreferrer" className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    React.js
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='col-span-1 py-3'>
                    <strong className='text-black dark:text-white'>Follow us</strong>
                    <ul className='space-y-2 py-2'>
                        <li>
                            <Link href='https://github.com/jatinder-singh221'>
                                <a target='_blank' rel="noopener noreferrer" className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Github
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='https://www.youtube.com/channel/UCKvE4IJ26eJY6LPZTG7Gakw'>
                                <a target='_blank' rel="noopener noreferrer" className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Youtube
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='https://www.youtube.com/channel/UCKvE4IJ26eJY6LPZTG7Gakw'>
                                <a target='_blank' rel="noopener noreferrer" className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Twitter
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='col-span-1'>
                    <strong className='text-black dark:text-white'>Legal</strong>
                    <ul className='space-y-2 py-2'>
                        <li>
                            <Link href='/help'>
                                <a className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Contact us
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/privacy'>
                                <a className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Privacy Policy
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/developers'>
                                <a className='text-sm text-black dark:text-white hover:underline font-medium'>
                                    Developers
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className='w-full h-[1px] border-none bg-black/10 dark:bg-white/10 my-6'/>
            <p className='text-sm font-medium text-[#2DAC9D] text-center'>&copy; Jatinder singh All rights are reversed</p>
        </footer>
    )
}
