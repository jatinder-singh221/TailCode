import Image from 'next/image'
import { Fragment} from 'react'
import { useSelector } from 'react-redux'

import Logo from '@/components/Comman/Logo'
import Ulinks from '@/components/core/ULinks'
import Menuitems from '@/components/core/Menuitems'

import { Menu } from '@headlessui/react'

import { notification, user } from '@/redux/reducers/authSlice'
import { barLinks } from '@/provider/provider.Links'
import Header from '../core/Header'
import { appbarlink } from "@/provider/provider.Links"

export default function Appbar() {

  const userDetail = useSelector(user) ?? false
  const userImage = userDetail.userProfileImage ? process.env.NEXT_PUBLIC_API_URL + userDetail.userProfileImage : '/avtar.jpg'

  return (
    <Header>
      <nav
        className='flex items-center justify-between h-full px-3'
      >
        <Logo />
        <div className='flex items-center space-x-6 h-full'>
            <div className="hidden lg:block">
              <Ulinks links={appbarlink} />
            </div>

          <Menu as={Fragment}>
            <Menu.Button className='w-8 h-8 rounded-full relative ring-1 ring-offset-2 ring-offset-transparent ring-[#2DAC9D] bg-[#14181B] overflow-hidden'>
              <Image src={userImage} alt='go' layout='fill' objectFit='cover' />
            </Menu.Button>
            <Menuitems links={barLinks} />
          </Menu>
        </div>
      </nav>
    </Header>
  )
}
