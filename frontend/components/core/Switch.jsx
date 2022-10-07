import { Switch } from "@headlessui/react"

export default function SwitchComponents(props) {

    return (
    <div className="flex w-full items-center space-x-9">
        <small className="text-sm font-bold text-black dark:text-white">{props.label}</small>
        <Switch
        checked={props.enable}
        onChange={() => props.handleChange()}
        className={`${props.enable ? 'border-2 border-black dark:border-white': 'border-2 border-black/10 dark:border-white/10'} 
        relative inline-flex h-[32px] w-[70px] shrink-0 cursor-pointer 
        rounded-full  transition-colors duration-200 
        ease-in-out focus:outline-none focus-visible:ring-2  items-center 
        focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Use setting</span>
            <span
            aria-hidden="true"
            className={`${props.enable ? 'translate-x-8' : 'translate-x-1'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full 
            bg-[#2DAC9D] shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    </div>
    )
}
