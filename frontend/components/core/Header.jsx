import { useCallback, useEffect, useRef } from "react"

export default function Header({children}) {

    const ref = useRef()

    const handleDocumentScroll = useCallback(() => {
        const windowHeight = window.innerHeight
        const scrollYHeight = window.scrollY
        const current = ref.current
        if (scrollYHeight > windowHeight / 9)
            if ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches))
                current?.classList.add("before:bg-white/10", "before:backdrop-blur-[500px]", "backdrop-filter")
            else
                current?.classList.add("before:bg-black/10", "before:backdrop-blur-[500px]", "backdrop-filter")

        else
            if ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches))
                current?.classList.remove("before:bg-white/10", "before:backdrop-blur-[500px]", "backdrop-filter")
            else
                current?.classList.remove("before:bg-black/10", "before:backdrop-blur-[500px]", "backdrop-filter")
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', handleDocumentScroll)

        return () => {
            document.removeEventListener('scroll', handleDocumentScroll)
        }
    }, [handleDocumentScroll])


    return (
        <header 
        className='fixed top-0 z-50 h-14 w-full before:bg-blend-multiply
        before:w-full before:h-full before:absolute before:-z-10'
        ref={ref}
        >
           {children} 
        </header>
    )
}
