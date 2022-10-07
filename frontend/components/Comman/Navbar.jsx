import { Fragment } from "react"

import Logo from "./Logo"
import Menuitems from '@/components/core/Menuitems'
import Ulinks from '@/components/core/ULinks'
import Header from "@/components/core/Header"

import { Menu } from '@headlessui/react'
import { MenuIcon } from "@heroicons/react/solid"
import { navbarLinks } from "@/provider/provider.Links"

export default function Navbar() {

    return (
        <Header>
            <nav className="flex items-center justify-between h-full px-3">
                <Logo />
                <Menu as={Fragment}>
                    <Menu.Button className='lg:hidden'>
                        <MenuIcon className='w-9 h-9 p-1 rounded-full text-black
                        dark:text-white hover:scale-105 active:bg-black/20
                        active:backdrop-blur-[110px] dark:active:bg-white/20'
                        />
                    </Menu.Button>
                    <Menuitems links={navbarLinks} />
                </Menu>
                <div className="hidden lg:block">
                    <Ulinks links={navbarLinks} />
                </div>
            </nav>
        </Header>
    )
}
