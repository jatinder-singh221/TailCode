export default function ReadOnlyInput(props) {
  return (
    <div className='w-full h-auto'>
      <label htmlFor={props.id} className='flex justify-between px-2 mb-3'>
        <span className='text-sm capitalize text-black dark:text-white'>{props.label}</span>
        <span className='text-xs capitalize text-pink-600'>{props.error}</span>
      </label>
      <input type={props.type} id={props.id} name={props.name} readOnly
        value={props.value}  placeholder={props.placeholder} disabled
        className={`h-11 w-full outline-none bg-black/10 dark:bg-white/10 text-sm rounded-md
      px-3 placeholder:text-sm text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50
       ${props.error ? 'border-b-2 border-pink-600 rounded-b-none' : 'focus:border-b-2 focus:rounded-none focus:rounded-t-md focus:border-[#2DAC9D]'}
      `}
      />
    </div>
  )
}
