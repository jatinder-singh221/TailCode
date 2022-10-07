import Logo from '@/components/Comman/Logo'
import LinkTag from '@/components/Comman/Anchor'
import Image from 'next/image'

import { goBack } from '@/provider/provider.Anchors'

export default function Custom429() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen space-y-5'>
      <div className="absolute left-2 top-2">
        <Logo />
      </div>
      <div className="relative w-64 aspect-square ">
        <Image src="/500.svg" alt="404" layout='fill' />
      </div>
      <h3 className='font-semibold text-lg'>429 ERROR, Too many requests</h3>
      <LinkTag {...goBack} />
    </div>
  )
}
