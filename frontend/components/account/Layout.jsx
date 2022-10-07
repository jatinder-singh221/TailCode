import Appbar from "@/components/Comman/Bar"
import Footer from "../Comman/Footer"
import Link from "next/link"
import { useRouter } from "next/router"

import { accountAside } from "@/provider/provider.Links"

export default function Layout({ children }) {
    const router = useRouter()

    return (
        <>
            <Appbar />
            <main className="min-h-screen grid grid-cols-12 relative my-12 ">
                <section className="w-auto h-14 lg:h-auto col-span-12 lg:col-span-2">
                    <aside className="w-full relative top-0 lg:sticky lg:top-16 h-auto space-x-2 lg:space-x-0 lg:space-y-2 px-2 flex lg:flex-col overflow-x-auto hidden-scrollbar bg-white dark:bg-[#14181B]">
                        {accountAside.map((data, index) => {
                            return <Link key={index} passHref href={data.href}>
                                <a className={`flex items-center space-x-3 text-sm p-2 rounded-md relative 
                                    text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all
                                    ${router.pathname === data.href && `before:w-[5px] before:h-1/2 before:absolute 
                                    before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                                    bg-black/20 dark:bg-white/10` }
                                `}>
                                    <data.icon className='w-4 h-4 text-black dark:text-white' />
                                    <span className='text-sm font-medium text-black dark:text-white'>{data.name}</span>
                                </a>
                            </Link>
                        })}
                    </aside>
                </section>
                <section className="min-h-screen col-span-12 lg:col-span-10 space-y-6 px-4">
                    {children}
                </section>
            </main>
            <Footer />
        </>
    )
}
