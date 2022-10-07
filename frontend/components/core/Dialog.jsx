import { Fragment, useState } from 'react'
import { useSelector } from "react-redux"

import { Transition, Dialog } from '@headlessui/react'
import { dialog } from '@/redux/reducers/appSlice'

export default function DialogComponent(props) {

  const dialogs = useSelector(dialog) ?? false
  const [show, setshow] = useState(dialog ? true: false)

  return (
    <Transition
        show={show}
        as={Fragment}
        enter = 'ease-out duration-300'
        enterFrom = 'opacity-0'
        enterTo = 'opacity-100'
        leave = 'ease-in duration-200'
        leaveFrom = 'opacity-100'
        leaveTo = 'opacity-0'
    >
        <Dialog  onClose={() => setshow(false)}>
            <Dialog.Panel className='fixed top-2 left-[25%] rounded-md p-3 
            h-auto w-1/2 bg-black/20 dark:bg-white/10 backdrop-filter backdrop-blur-2xl 
            z-50 space-y-3'>
                <Dialog.Title className='text-xl text-black dark:text-white'>{dialogs.title}</Dialog.Title>
                <Dialog.Description className='text-sm text-inherit w-[80%]'>
                    {dialogs.description}
                </Dialog.Description>
                <div className='flex items-center space-x-6'>
                    <button onClick={() => props.handleOkOrCancel(true)}
                    className='border border-black dark:border-white  px-3 w-32 rounded-md py-1 text-sm text-black dark:text-white
                    hover:bg-black/10 dark:hover:bg-white/10 outline-black dark:outline-white'
                    >OK</button>
                    <button onClick={() => props.handleOkOrCancel(false)}
                    className='text-sm hover:text-black dark:hover:text-white outline-black dark:outline-white p-2'
                    >Cancel</button>
                </div>
            </Dialog.Panel>
        </Dialog>
    </Transition>
  )
}
