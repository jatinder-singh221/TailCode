import Logo from "@/public/TailCode.svg"
import Image from "next/image"

export default function Emptyloading() {
  return (
    <div className='w-full h-[calc(100vh-5.5rem)] space-y-4  py-4 flex flex-col items-center justify-center'>
      <div className="h-14 w-14 relative animate-bounce">
        <Image src={Logo} layout='fill' alt='logo' />
      </div>
      <p className="text-black dark:text-white text-lg">Loading .....</p>
    </div>
  )
}
