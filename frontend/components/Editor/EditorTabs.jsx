import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { XIcon } from "@heroicons/react/outline"
import { openTab, closeTab } from "@/redux/api/redux.editor"
import { activetab } from "@/redux/reducers/editorSlice"

export default function OpenEditorFiles(props) {
  const dispatch = useDispatch()

  const active = useSelector(activetab) ?? null

  const handleTabChange = useCallback(() => {
    dispatch(openTab(props.playgroundId, props.name, props.path));
  }, [dispatch, props])

  const handleClose = useCallback(() => {
    dispatch(closeTab(props.path))
  }, [dispatch, props])

  return (
    <li className={`flex items-center space-x-2 px-2 cursor-default ${active.name === props.name && active.path === props.path && 'bg-black/10 dark:bg-white/10'}`}>
      {!props.saved && <div className="w-2 h-2 rounded-full bg-black dark:bg-white" />}
      <span className="text-xs" onClick={handleTabChange}>{props.name}</span>
      <XIcon className="w-3 h-3 text-black dark:text-white active:text-red-500" onClick={handleClose} />
    </li>
  )
}