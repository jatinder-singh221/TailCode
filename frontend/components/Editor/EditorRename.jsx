import { useEffect, useCallback, useRef } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'


import { createFileValidation, createFolderValidation } from '@/provider/provider.editor'
import { rename } from '@/redux/api/redux.editor'
import { UPDATE } from '@/redux/reducers/appSlice'

export default function EditorRename(props) {

  const renameRef = useRef()
  const dispatch = useDispatch()


  const renameFileForm = useFormik({
    initialValues: { name: props.data.name },
    validationSchema: createFileValidation,

    onSubmit: async values => {
      if (values.name !== props.data.name) {
        const isTakenName = props.data.dataSet.some(element => element.name === values.name)
        if (isTakenName)
          dispatch(UPDATE('Name already in use'))
        else {
          const dirSrc = props.data.src.split('\\')
          dirSrc.pop('\\')
          const returnDir = dirSrc.join('\\') + '\\' + values.name
          dispatch(rename(props.playgroundId, props.data.src, returnDir))
        }
      }
    }
  })

  const renameFolderForm = useFormik({
    initialValues: { name: props.data.name },
    validationSchema: createFolderValidation,

    onSubmit: async values => {
      if (values.name !== props.data.name) {
        const isTakenName = props.data.dataSet.some(element => element.name === values.name)
        if (isTakenName)
          dispatch(UPDATE('Name already in use'))
        else {
          const dirSrc = props.data.src.split('\\')
          dirSrc.pop('\\')
          const returnDir = dirSrc.join('\\') + '\\' + values.name

          dispatch(rename(props.playgroundId, props.data.src, returnDir))
        }
      }
    }
  })

  const handleEscKey = useCallback((e) => {
    const current = renameRef.current
    if (e.key === 'Escape') {
      props.escHandler({})
    }
    else if (current && !current.contains(e.target)) {
      setTimeout(() => {
        props.escHandler({})
      }, 300);
    }
  }, [props])

  const handleSubmitOnEnterPress = useCallback((e) => {
    if (e.key === 'Enter' && props.data.type === 'file') {
      renameFileForm.submitForm()
      props.escHandler({})
    }
    else if (e.key === 'Enter' && props.data.type === 'directory') {
      renameFolderForm.submitForm()
      props.escHandler({})
    }
  }, [renameFileForm, renameFolderForm, props])

  const handleFileBlur = (e) => {
    renameFileForm.handleBlur(e)
    renameFileForm.submitForm()
  }

  const handleFolderBlur = (e) => {
    renameFolderForm.handleBlur(e)
    renameFolderForm.submitForm()
  }


  useEffect(() => {
    document.addEventListener('mousedown', handleEscKey)
    document.addEventListener('keydown', handleEscKey)
    document.addEventListener('keyup', handleSubmitOnEnterPress)

    return () => {
      document.removeEventListener('mousedown', handleEscKey)
      document.removeEventListener('keydown', handleEscKey)
      document.removeEventListener('keyup', handleSubmitOnEnterPress)
    }
  }, [handleEscKey, handleSubmitOnEnterPress])

  return (
    <>
      {props.data.type === 'file' ?
        <input className='w-full outline-none rounded-sm bg-[#2DAC9D]/10 px-1 
        invalid:border-red-500 invalid:bg-red-500/10 text-black dark:text-white 
        text-xs h-full border-2 border-[#2DAC9D]' inputMode='text' autoFocus
          id='name' name='name' autoComplete='off' ref={renameRef}
          pattern='^[\w,\s-]+\.[A-Za-z]{2,4}$' value={renameFileForm.values.name}
          onChange={renameFileForm.handleChange} onBlur={handleFileBlur}
        /> :
        <input className='w-full outline-none rounded-sm bg-[#2DAC9D]/10 px-1 
        invalid:border-red-500 invalid:bg-red-500/10 text-black dark:text-white 
        text-xs h-full border-2 border-[#2DAC9D]' inputMode='text' autoFocus
          id='name' name='name' autoComplete='off' ref={renameRef}
          pattern='^(\w+\.?)*\w+$' value={renameFolderForm.values.name}
          onChange={renameFolderForm.handleChange} onBlur={handleFolderBlur}
        />
      }
    </>
  )
}