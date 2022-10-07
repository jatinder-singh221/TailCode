import { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Menu, Transition } from '@headlessui/react'

export default function Menuitems(props) {

  const router = useRouter()

  return (
    <Transition
      enter='transform transition ease-in-out duration-500 sm:duration-700'
      enterFrom='translate-x-full'
      enterTo='translate-x-0'
      leave='transform transition ease-in-out duration-500 sm:duration-700'
      leaveFrom='translate-x-0'
      leaveTo='translate-x-full'
      as={Fragment}
    >
      <Menu.Items className='absolute top-16 right-3 flex flex-col w-52 backdrop-filter
      p-3 h-auto rounded-md space-y-3 backdrop-blur-[110px] bg-black/10 dark:bg-white/10' as='ul'
      >
        {props.links.map((data, index) => {
          return <Menu.Item key={index} as='li' className='relative'>
            <Link href={data.link} passHref>
              <a className={`flex items-center space-x-3 text-sm p-2 rounded-md 
              text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all
                ${router.asPath === data.link && `before:w-[5px] before:h-1/2 before:absolute 
                before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                bg-black/20 dark:bg-white/10 `}
              `}>
                <data.icon className='w-5 h-5' />
                <span>{data.name}</span>
              </a>
            </Link>
          </Menu.Item>
        })}
      </Menu.Items>
    </Transition>
  )
}
