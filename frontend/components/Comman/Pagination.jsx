import { useCallback } from "react"
import { useRouter } from "next/router"

import { GetHeader } from "@/provider/provider.Headers"
import { fetchSsr } from "@/redux/api/redux.comman"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline"

export default function Pagination(props) {
    const router = useRouter()
    const pageNum = props.page ?? 1

    const handleGoToPage = useCallback(async(page) => {
      const url = `${props.url}?page=${page}`
      const api = await fetch(url, GetHeader)
      switch (api.status) {
        case 200:
          const urlRes = await api.json()
          router.query.page = urlRes.page
          router.push(router)
          props.setitems(urlRes)
          break;
        case 400:
        case 404:
        case 429:
        case 500:
          router.push(`/${api.status}`)
      }

    }, [props, router])

  const returnPageCountJsx = (count) => {
    let list = []
    for (let i = 1; i <= count; i++){
        list.push(<li className={`${props.page == i && "border border-[#2DAC9D]"} h-full rounded-sm py-1 px-3 
        hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer text-sm`} onClick={() => handleGoToPage(i)}>{i}</li>)
    }
    return list
  }

  const handlePrevious = useCallback(async () => {
    const previous = props.previous ?? false
    if (previous) {
      const url = props.url + `?page=${Number(pageNum) - 1}`
      const api = await fetch(url, GetHeader)
      switch (api.status) {
        case 200:
          const urlRes = await api.json()
          router.query.page = urlRes.page
          router.push(router)
          props.setitems(urlRes)
          break;
        case 400:
        case 404:
        case 429:
        case 500:
          router.push(`/${api.status}`)
      }
    }
  }, [props, router, pageNum])

  const handleNext = useCallback(async () => {
    const next = props.next ?? false
    if (next) {
      const url = props.url + `?page=${Number(pageNum) + 1}`
      const api = await fetch(url)
      switch (api.status) {
        case 200:
          const urlRes = await api.json()
          router.query.page = urlRes.page
          router.push(router)
          props.setitems(urlRes)
          break;
        case 400:
        case 404:
        case 429:
        case 500:
          router.push(`/${api.status}`)
      }
    }
  }, [props, router, pageNum])

  return (
    <div className='flex items-center space-x-2 transition-all'>
        {props.previous && <button
        className='text-sm py-1 px-2 rounded-sm text-[#2DAC9D] hover:bg-[#2DAC9D]/10 flex items-center space-x-1'
        disabled={props.previous == null} onClick={handlePrevious}>
          <ChevronDoubleLeftIcon className="w-4 h-4"/>
          <span>
            Pervious
          </span>
        </button>}
        {props.count > 1 && <ul className="flex items-center space-x-2">
            {returnPageCountJsx(props.count)}
        </ul>}
        {props.next && <button
        className='text-sm py-1 px-2 rounded-sm text-[#2DAC9D] hover:bg-[#2DAC9D]/10
         flex items-center space-x-1
        '
        disabled={props.next == null} onClick={handleNext}>
          <span>
            Next  
          </span>
          <ChevronDoubleRightIcon className="w-4 h-4"/>  
        </button>}
  </div>
  )
}
