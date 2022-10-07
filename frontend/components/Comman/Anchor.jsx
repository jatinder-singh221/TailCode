import Link from 'next/link'

export default function Anchor(props) {
  return (
    <Link href={props.href} passHref>
      <a className='text-xs cursor-pointer text-[#2DAC9D] text-center p-2 rounded-md
        font-medium hover:bg-[#2DAC9D]/10 focus:bg-[#2DAC9D]/10 inline-block outline-none'
      >
        {props.name}
      </a>
    </Link>
  )
}
