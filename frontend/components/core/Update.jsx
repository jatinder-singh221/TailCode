import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { update, UPDATE } from "@/redux/reducers/appSlice"
import { XIcon } from "@heroicons/react/solid"

export default function UpdateComponent() {
  const dispatch = useDispatch()
  const updation = useSelector(update) ?? false
  
  const handleClose = () => dispatch(UPDATE())

  useEffect(() => {
    setTimeout(() => {
      dispatch(UPDATE())
    }, 5000);
  }, [dispatch])


  return (
    <div className="w-64 h-12 z-50 fixed bottom-0 left-2 select-none">
      <div className="h-10 bg-black/20 dark:bg-white/10
      backdrop-blur-2xl rounded-t-md flex items-center justify-between px-3 text-sm"
      >
        <span className="text-black dark:text-white">{updation}</span>
        <XIcon className="w-6 h-6 cursor-pointer active:scale-75 text-black hover:scale-105
      dark:text-white p-1 rounded-full active:bg-black/20 active:backdrop-blur dark:active:bg-white/20" onClick={handleClose}
        />
        <div
          className='w-full h-0.5 fixed bottom-0 left-0 z-50'
        >
          <div className="h-full bg-[#2DAC9D]
        animate-approach-left"></div>
        </div>
      </div>
    </div>
  )
}
