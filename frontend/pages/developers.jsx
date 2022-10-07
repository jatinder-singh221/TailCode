import Head from "next/head"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useSelector } from "react-redux"
import { authenciated, AUTHENCIATED } from "@/redux/reducers/authSlice"

import { wrapper } from "@/redux/store"
import { sessionVerficiation } from "@/redux/api/redux.user"
import { LocationMarkerIcon, CodeIcon, GlobeAltIcon, LinkIcon } from "@heroicons/react/outline"

const Appbar = dynamic(() => import('@/components/Comman/Bar'))
const Navbar = dynamic(() => import('@/components/Comman/Navbar'))
const Footer = dynamic(() => import('@/components/Comman/Footer'))

import { developer } from "@/provider/provider.Links"

export default function Developer() {
    const isAuthenciated = useSelector(authenciated) ?? false
    return (
        <>
            <Head>
                <title>TailCode | Developer</title>
                <meta name='description' content='Developers TailCode' />
            </Head>
            {isAuthenciated ? <Appbar /> : <Navbar />}
            <main className="min-h-screen my-14 w-[90%] lg:w-[80%] mx-auto space-y-8">
              <h1 className="text-2xl font-bold text-black dark:text-white">Our Team and Developers</h1>
                <div className="grid grid-cols-4 gap-3">
                  {developer.map((data, index) => {
                    return <div key={index} className='col-span-4 lg:col-span-1 w-full h-auto px-4 py-3 bg-[#2DAC9D]/10 rounded-md flex flex-col space-y-3 items-center'>
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <Image src={data.profile} alt="profile" layout="fill" priority/>
                        </div>
                        <div className="space-y-3">
                          <h1 className="text-xl text-black dark:text-white">{data.name}</h1>
                          <p className="flex items-center text-black dark:text-white text-sm "><CodeIcon className="w-5 h-5 mr-3" /> {data.purpose}</p>
                          <p className="flex items-center text-black dark:text-white text-sm "><LocationMarkerIcon className="w-5 h-5 mr-3" /> {data.location}</p>
                          <p className="flex items-center text-black dark:text-white text-sm "><GlobeAltIcon className="w-5 h-5 mr-3" /> {data.language}</p>
                          <p className="flex items-center text-black dark:text-white text-sm "><LinkIcon className="w-5 h-5 mr-3" /> <a target='_blank' rel="noopener noreferrer" href={data.githubLink} className='hover:text-blue-600'>Github</a></p>
                        </div>
                    </div>
                  })}
                  </div>
            </main>
            <Footer />
        </>
    )
}



export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {
    const result = await sessionVerficiation(req, res)
    switch (result) {
      case 200:
        store.dispatch(AUTHENCIATED(true))
        break;
      case 401:
        break;
      case 400:
      case 429:
      case 500:
        return { redirect: { destination: `/${result}` } }
    }
  })