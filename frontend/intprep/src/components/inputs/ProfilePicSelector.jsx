import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePicSelector = ({ image, setImage, preview, setPreview }) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)

            const preview = URL.createObjectURL(file)
            if (setPreview) {
                setPreview(preview)
            }
            setPreviewUrl(preview)

        }
    }
    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

    return (
        <>
            <div>
                <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className="flex flex-col justify-center items-center mx-auto opacity-0" />
                {!image ?
                    (
                        <div className="flex mx-auto justify-center flex-col items-center bg-orange-100 text-orange-500 w-24 h-24 rounded-full">
                            <LuUser className="absolute text-5xl cursor-pointer" />
                            <button type='button' onClick={onChooseFile} className="bg-orange-500 text-white cursor-pointer right-0 p-2 mt-18 ml-14 rounded-full"><LuUpload /></button>
                        </div>
                    ) :
                    (
                        <div className="flex mx-auto justify-center flex-col items-center -my-5 w-34 h-34 rounded-full">
                            <img src={preview || previewUrl} alt="profile photo" className="w-24 h-24 object-cover rounded-full" />
                            <button className="cursor-pointer p-2 bg-orange-500 text-white rounded-full flex justify-center -mt-5 ml-15 items-center" type="button" onClick={handleRemoveImage}><LuTrash /></button>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default ProfilePicSelector;