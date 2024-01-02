/* eslint-disable react/prop-types */
import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { FaCloudUploadAlt } from "react-icons/fa";

const InputFile = ({containerClassname, label, id, register, errors = {}, validate, placeholder}) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname ))}>
    {label && 
      <span className="font-medium text-main-700">
        {label}
      </span>
    }
    <input 
      type='file'
      id={id} 
      {...register(id, validate)}
      placeholder={placeholder}
      className='hidden'
    />
    <label className="bg-gray-100 w-full p-16 flex items-center justify-center flex-col gap-2" htmlFor={id}>
        <span className="text-5xl text-gray-300">
            <FaCloudUploadAlt/>
        </span>
        <small className="text-gray-500 italic">Only support image with extension JPG, JPEG, PNG.</small>
    </label>
    {errors[id] && 
      <small className="text-red-500 italic mt-[-10px]">{errors[id]?.message}</small>
    }
  </div>
  )
}

export default InputFile
