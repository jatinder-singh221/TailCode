import {
  DocumentDuplicateIcon,
  SearchIcon,
  ColorSwatchIcon,
  CogIcon,
  HomeIcon,
  UserCircleIcon
} from '@heroicons/react/outline'

import * as yup from 'yup'

export const asideEditor = [
  {
    icon: DocumentDuplicateIcon,
    hover: 'Explore',
    shortcut: 'ctrl + G'
  },
  {
    icon: SearchIcon,
    hover: 'Search',
    shortcut: 'ctrl + K'
  },
  {
    icon: ColorSwatchIcon,
    hover: 'Components',
    shortcut: 'ctrl + U'
  },
  {
    icon: CogIcon,
    hover: 'Settings',
    shortcut: 'ctrl + Q'
  }
]

export const asideLink = [
  {
    icon: HomeIcon,
    hover: 'Home',
    link: '/'
  },
  {
    icon: UserCircleIcon,
    hover: 'Account',
    link: '/account'
  }
]

const fileNameRegex = /^[\w,\s-]+\.[A-Za-z]{2,4}$/
const folderNameRegex = /^(\w+\.?)*\w+$/

export const createFileValidation = yup.object({
  name: yup.string().required().matches(fileNameRegex)
})

export const createFolderValidation = yup.object({
  name: yup.string().required().matches(folderNameRegex)
})


export const theme = [
  'vs-dark',
  'vs-light',
  'Blackboard',
  'Cobalt2',
  'Dracula',
  'Monokai',
  'Tomorrow-Night',
  'Tomorrow-Night-Eighties',
  'Solarized-dark',
  'Twilight'
]

export const fonts = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px'
]
