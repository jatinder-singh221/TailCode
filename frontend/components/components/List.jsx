import Image from 'next/image'
import Link from 'next/link'

export default function List(props) {

    return (
        <li className='col-span-4 lg:col-span-1'>
            <Link href={`/components/${props.name}`} passHref>
                <a className='rounded-md overflow-hidden space-y-3 group'>
                    <div className='aspect-video relative mx-4 lg:mx-0'>
                        <Image src={props.image} layout='fill' alt='image' priority className='rounded-md overflow-hidden' />
                    </div>
                    <h1 className='text-lg font-bold text-black dark:text-white mx-4 lg:mx-0'>{props.name}</h1>
                </a>
            </Link>
        </li>
    )
}
