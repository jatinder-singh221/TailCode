import { useState, useEffect } from "react"
import Image from "next/image"

export default function ImageUpload(props) {

    const [imageUrl, setimageUrl] = useState(props.image)

    const handleImageChange = (e) => {
        props.setimage(e)
        setimageUrl(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <>
            {props.image === '' ? <label id="image" 
                className={`aspect-video bg-black/10 dark:bg-white/10 backdrop-blur-lg rounded-md flex items-center justify-center
                    ${props.error ? 'border-b-2 border-pink-600 rounded-b-none' : 'focus:border-b-2 focus:rounded-none focus:rounded-t-md focus:border-[#2DAC9D]'}
                `}
            >
                <p className="text-sm text-black dark:text-white">
                    Choose file
                    <input type="file" name="image" id="image" accept='image/jpg, image/jpeg, image/png' className='hidden' onChange={handleImageChange} />
                </p>
            </label> 
            :
            <div className="aspect-video relative rounded-md overflow-hidden ">
                <Image src={imageUrl ? imageUrl : '/avtar.jpg'} alt='updatimge' layout='fill' />
            </div>
            }
            <button type='button' className='text-black dark:text-white text-sm hover:text-red-600 px-2' onClick={props.handleClearForm}>Clear</button>
        </>
    )
}
