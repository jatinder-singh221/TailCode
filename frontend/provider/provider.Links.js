import {
    CodeIcon, ColorSwatchIcon, ChatIcon,
    UserIcon, BellIcon, CogIcon, PlusSmIcon, TicketIcon, LogoutIcon, KeyIcon, LoginIcon, BadgeCheckIcon, BeakerIcon, SupportIcon, DocumentIcon
} from '@heroicons/react/outline'

export const navbarLinks = [
    {
        name: 'Docs',
        link: '/docs',
        icon: DocumentIcon
    },
    {
        name: 'Components',
        link: '/components',
        icon: ColorSwatchIcon
    },
    {
        name: 'Blogs',
        link: '/blogs',
        icon: TicketIcon
    },
    {
        name: 'Help',
        link: '/help',
        icon: ChatIcon
    },
    {
        name: 'Sign In',
        link: '/signin',
        icon: LoginIcon
    },
]

export const appbarlink = [
    {
        name: 'Docs',
        link: '/docs',
        icon: DocumentIcon
    },
    {
        name: 'Components',
        link: '/components',
        icon: ColorSwatchIcon
    },
    {
        name: 'Blogs',
        link: '/blogs',
        icon: TicketIcon
    },
    {
        name: 'Help',
        link: '/help',
        icon: ChatIcon
    },
    {
        name: 'Notifications',
        link: '/account/notification',
        icon: BellIcon
    },
]

export const barLinks = [
    {
        icon: UserIcon,
        name: 'Account',
        link: '/account'
    },
    {
        icon: BellIcon,
        name: 'Notification',
        link: '/account/notification'
    },
    {
        name: 'Docs',
        link: '/docs',
        icon: DocumentIcon
    },
    {
        icon: TicketIcon,
        name: 'Blogs',
        link: '/blogs'
    },
    {
        icon: PlusSmIcon,
        name: 'New Blog',
        link: '/blogs/create?index=0'
    },
    {
        icon: BadgeCheckIcon,
        name: 'My Blogs',
        link: '/blogs/create?index=1'
    },
    {
        icon: ColorSwatchIcon,
        name: 'Components',
        link: '/components'
    },
    {
        icon: BeakerIcon,
        name: 'My Components',
        link: '/components/list'
    },
    {
        name: 'Help',
        link: '/help',
        icon: ChatIcon
    },
    {
        icon: LogoutIcon,
        name: 'Sign out',
        link: '/account/signout'
    },
]

export const dashLinks = [
    {
        icon: PlusSmIcon,
        name: 'New Blog',
        link: '/blogs/create?index=0'
    },
    {
        icon: BadgeCheckIcon,
        name: 'My Blogs',
        link: '/blogs/create?index=1'
    },
    {
        icon: ColorSwatchIcon,
        name: 'Components',
        link: '/components'
    },
    {
        icon: BeakerIcon,
        name: 'My Components',
        link: '/components/list'
    },
]

export const accountAside = [
    {
        name: 'Personal',
        icon: UserIcon,
        href: '/account'
    },
    {
        name: 'Security',
        icon: KeyIcon,
        href: '/account/security'
    },
    {
        name: 'Notifcation',
        icon: BellIcon,
        href: '/account/notification'
    },
    {
        name: 'Logout',
        icon: LogoutIcon,
        href: '/account/signout'
    },

]

export const developer = [
    {
        name: 'Jatinder singh',
        profile: '/jatindersingh.jpg',
        purpose: 'Creator',
        location: 'India',
        language: 'English',
        githubLink : 'https://github.com/jatinder-singh221' 
    },

]