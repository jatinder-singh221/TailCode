import Head from "next/head"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useRef, useCallback, useEffect, useState } from "react"
import { wrapper } from "@/redux/store"
import { sessionVerficiation } from "@/redux/api/redux.user"
import { AUTHENCIATED } from "@/redux/reducers/authSlice"

const EditorNavbar = dynamic(() => import('@/components/Editor/EditorNavbar'))
const EditorLoader = dynamic(() => import('@/components/Editor/EditorLoader'))
const EmptyEditor = dynamic(() => import('@/components/Editor/EmptyEditor'))
const EditorAside = dynamic(() => import('@/components/Editor/EditorAside'), { ssr: false })
const EditorTabs = dynamic(() => import('@/components/Editor/EditorTabs'), { ssr: false })
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

import { useSelector, useDispatch } from "react-redux"
import {
  tab,
  editorlang,
  themes,
  font,
  activetab,
  editorvalue,
  THEME,
  FONT,
}
  from '@/redux/reducers/editorSlice'
import { openTab, changeFileSave, saveFile } from '@/redux/api/redux.editor'

export default function Playground() {
  const router = useRouter()
  const { id } = router.query

  const mainRef = useRef()
  const coverRef = useRef()
  const editorRef = useRef()
  const dispatch = useDispatch()

  const openTabs = useSelector(tab) ?? false
  const active = useSelector(activetab) ?? null
  const lang = useSelector(editorlang) ?? false
  const theme = useSelector(themes) ?? 'vs-light'
  const fontSize = useSelector(font) ?? '18px'
  const defaultvalue = useSelector(editorvalue) ?? false

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor
    const preferedTheme = localStorage.getItem('theme')
    const preferedFontSize = localStorage.getItem('fontSize')
    if (preferedTheme && preferedFontSize) {
      if (preferedTheme === 'vs-dark' || preferedTheme === 'vs-light') {
        dispatch(THEME(preferedTheme))
        dispatch(FONT(preferedFontSize))
      }
      else {
        import(`monaco-themes/themes/${preferedTheme}.json`)
          .then(data => {
            monaco.editor.defineTheme(preferedTheme, data)
            dispatch(THEME(preferedTheme))
            dispatch(FONT(preferedFontSize))
          })
      }
    } else if ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      import('monaco-themes/themes/Tomorrow-Night.json')
        .then(data => {
          monaco.editor.defineTheme('Tomorrow-Night', data)
          dispatch(THEME('Tomorrow-Night'))
          dispatch(FONT('16px'))
        })
      localStorage.setItem('theme', 'Tomorrow-Night')
      localStorage.setItem('fontSize', '16px')
    } else {
      localStorage.setItem('theme', 'vs-light')
      localStorage.setItem('fontSize', '16px')
      dispatch(THEME(preferedTheme))
      dispatch(FONT(preferedFontSize))
    }
  }

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    const current = coverRef.current
    current.classList.remove('hidden')
    current.classList.add('block')
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    const current = coverRef.current
    current.classList.remove('hidden')
    current.classList.add('block')
  }, [])

  const handleDragLeave = useCallback(() => {
    const current = coverRef.current
    current.classList.remove('block')
    current.classList.add('hidden')
  }, [])

  const handleDrop = useCallback((e) => {
    const current = coverRef.current
    current.classList.remove('block')
    current.classList.add('hidden')
    let name = e.dataTransfer.getData('name')
    let src = e.dataTransfer.getData('src')
    dispatch(openTab(id, name, src))
  }, [dispatch, id])

  const handleChangeInFile = async (value, e) => {
    console.log('change occur');
    dispatch(changeFileSave(active.path, false, value))
  }

  const handleSave = useCallback((e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      const value = editorRef.current.getValue()
      dispatch(saveFile(id, active.path, value))
    }
  }, [active, dispatch, id])

  useEffect(() => {
    const main = mainRef.current
    const cover = coverRef.current
    main.addEventListener('dragenter', handleDragEnter)
    main.addEventListener('dragover', handleDragOver)
    cover.addEventListener('dragleave', handleDragLeave)
    cover.addEventListener('drop', handleDrop)
    document.addEventListener('keydown', handleSave)

    return () => {
      main.removeEventListener('dragenter', handleDragEnter)
      main.removeEventListener('dragover', handleDragOver)
      cover.removeEventListener('dragleave', handleDragLeave)
      cover.removeEventListener('drop', handleDrop)
      document.removeEventListener('keydown', handleSave)
    }
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleSave])
  

  return (
    <main className='overflow-hidden relative'>
      <Head>
        <title>Playground | {id}</title>
        <meta name='description' content={`playground | ${id}`} />
      </Head>
      <EditorNavbar playgroundId={id} refrenceEditor={editorRef} />
      <section className="flex w-full h-[calc(100vh-80px)] lg:h-[calc(100vh-1.75rem)]" >
        <EditorAside refrenceMain={mainRef} refrenceEditor={editorRef} playgroundId={id} />
        <section ref={mainRef} className="w-full h-full flex flex-col relative">
          {openTabs.length > 0 ?
            <>
              <ul className="w-full h-6 flex space-x-2 overflow-x-auto hidden-scrollbar">
                {openTabs.map((data, index) => <EditorTabs key={index} {...data} playgroundId={id} />)}
              </ul>
              <div className="flex-1">
                <Editor
                  language={lang || 'javascript'}
                  onMount={handleEditorMount}
                  theme={theme}
                  height={"100%"}
                  loading={<EditorLoader />}
                  options={{ fontSize: fontSize }}
                  value={defaultvalue}
                  onChange={handleChangeInFile}
                  path={active.path}
                />
              </div>
            </>
            : <EmptyEditor />}
          <div className="hidden w-full h-full absolute top-0 left-0 bg-[#2DAC9D]/20" ref={coverRef}>
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-[#2DAC9D]">Drop to open file</p>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, res }) => {
  const result = await sessionVerficiation(req, res)
  switch (result) {
    case 200:
      store.dispatch(AUTHENCIATED(true))
      break
    case 401:
      return { redirect: { destination: "/signin" } }
    case 400:
    case 429:
    case 500:
      return { redirect: { destination: `/${result}` } }
  }
})