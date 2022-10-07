export default function Button(props) {
  return (
    <button
      type={props.type} disabled={props.disabled}
      className='w-full h-10 bg-[#2DAC9D] flex items-center justify-center font-bold
      rounded-md text-white hover:scale-105 active:opacity-80 text-sm my-10 outline-none focus:scale-105'
      >
      {props.name}
    </button>
  )
}
