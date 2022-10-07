import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ULinks(props) {
    
    const router = useRouter()

    return (
        <ul className='flex items-center h-full space-x-3 animate-show-out'>
            {props.links.map((data, index) => {
                return <li key={index} className='relative'>
                    <Link href={data.link} passHref>
                        <a className={`flex items-center space-x-3 text-sm p-2 rounded-md min-w-max
                        text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/10 transition-all
                        ${router.pathname === data.link && `before:w-[5px] before:h-1/2 before:absolute 
                        before:top-2 before:left-0 before:bg-[#2DAC9D] before:-z-10 before:rounded-md
                        bg-black/20 dark:bg-white/10` }
                        `}>
                            <data.icon className='w-5 h-5'/>
                            <span>{data.name}</span>
                        </a>
                    </Link>
                </li>
            })}
        </ul>
    )
}
