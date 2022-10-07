import { useEffect, useCallback, useRef } from "react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { DocumentIcon, FolderIcon } from "@heroicons/react/outline"

import {
  createFileValidation,
  createFolderValidation,
} from "@/provider/provider.editor"
import { addFolder, addFile } from "@/redux/api/redux.editor"
import { UPDATE } from "@/redux/reducers/appSlice"

export default function EditorNewFileFolder(props) {

  const newRef = useRef()
  const dispatch = useDispatch()

  const fileCreationForm = useFormik({
    initialValues: { name: "" },
    validationSchema: createFileValidation,

    onSubmit: async (values) => {
      const isTakenName = props.data.dataSet.some((element) => element.name === values.name)
      if (isTakenName)
        dispatch(UPDATE('Name already Taken'))
      else
        dispatch(addFile(props.playgroundId, props.destination, values.name))
    },
  })

  const folderCreationForm = useFormik({
    initialValues: { name: "" },
    validationSchema: createFolderValidation,

    onSubmit: async (values) => {
      const isTakenName = props.data.dataSet.some((element) => element.name === values.name)
      if (isTakenName)
        dispatch(UPDATE('Name already Taken'))
      else
        dispatch(addFolder(props.playgroundId, props.destination, values.name))
    }
  })

  const handleEscKey = useCallback((e) => {
    const current = newRef.current
    if (e.key === "Escape") {
      props.escHandler({})
    } else if (current && !current.contains(e.target)) {
      props.escHandler({})
    }
  }, [props])

  const handleFileBlur = (e) => {
    fileCreationForm.handleBlur(e)
    fileCreationForm.submitForm()
  }

  const handleFolderBlur = (e) => {
    folderCreationForm.handleBlur(e)
    folderCreationForm.submitForm()
  }

  const handleSubmitOnEnterPress = useCallback((e) => {
    if (e.key === "Enter" && props.data.type === "file") {
      fileCreationForm.submitForm()
      props.escHandler({})
    } else if (e.key === "Enter" && props.data.type === "directory") {
      folderCreationForm.submitForm()
      props.escHandler({})
    }
  }, [fileCreationForm, folderCreationForm, props])

  useEffect(() => {
    document.addEventListener("mousedown", handleEscKey)
    document.addEventListener("keydown", handleEscKey)
    document.addEventListener("keyup", handleSubmitOnEnterPress)

    return () => {
      document.removeEventListener("mousedown", handleEscKey)
      document.removeEventListener("keydown", handleEscKey)
      document.removeEventListener("keyup", handleSubmitOnEnterPress)
    }
  }, [handleEscKey, handleSubmitOnEnterPress])

  return (
    <div
      className="flex items-center justify-between space-x-1 px-2 mt-1 h-5 ml-2 border-l border-black/10 dark:border-white/10"
      ref={newRef}
    >
      <span>
        {props.data.type === "file" ? (
          <DocumentIcon className="w-4 h-4" />
        ) : (
          <FolderIcon className="w-4 h-4" />
        )}
      </span>
      {props.data.type === "file" ? (
        <input
          className="w-full outline-none rounded-sm bg-[#2DAC9D]/10 px-1 
            invalid:border-red-500 invalid:bg-red-500/10 text-black dark:text-white 
            text-xs h-full border-2 border-[#2DAC9D]"
          inputMode="text"
          autoFocus
          id="name"
          name="name"
          autoComplete="off"
          pattern="^[\w,\s-]+\.[A-Za-z]{2,4}$"
          value={fileCreationForm.values.name}
          onChange={fileCreationForm.handleChange}
          onBlur={handleFileBlur}
        />
      ) : (
        <input
          className="w-full outline-none rounded-sm bg-[#2DAC9D]/10 px-1 
            invalid:border-red-500 invalid:bg-red-500/10 text-black dark:text-white 
            text-xs h-full border-2 border-[#2DAC9D]"
          inputMode="text"
          autoFocus
          id="name"
          name="name"
          autoComplete="off"
          pattern="^(\w+\.?)*\w+$"
          value={folderCreationForm.values.name}
          onChange={folderCreationForm.handleChange}
          onBlur={handleFolderBlur}
        />
      )}
    </div>
  )
}
