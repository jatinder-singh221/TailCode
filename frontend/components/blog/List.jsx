import Image from 'next/image'
import Link from 'next/link'

export default function List(props) {
    const created_on = new Date(props.created_on) ?? false

    return (
        <li className='relative py-5 w-full grid grid-cols-3 before:w-[5px] before:h-1/2 before:absolute px-4 z-20
        before:top-[25%] before:left-0 hover:before:bg-[#2DAC9D] before:-z-10 before:rounded-md gap-2'>
            <div className="col-span-2 flex flex-col space-y-3 ">
                <small className='block text-xs text-black dark:text-white'>Created on {created_on.toDateString()}</small>
                <Link href={`/blogs/${props.slug}`} passHref>
                    <a className='block space-y-3'>
                        <h1 className='font-bold text-sm lg:text-2xl text-black dark:text-white'>{props.title}</h1>
                        <p  className='hidden lg:block text-sm text-black dark:text-white'>{props.description}</p>
                    </a>
                </Link>
                <small className='block text-xs text-[#2DAC9D]'>Author {props.author}</small>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <div className='h-20 w-20 lg:h-32 lg:w-32 relative rounded-sm overflow-hidden'>
                    <Image src={props.banner} layout='fill' alt='banner' priority className='opacity-80 object-contain'/>
                </div>
            </div>
        </li>
    )
}
