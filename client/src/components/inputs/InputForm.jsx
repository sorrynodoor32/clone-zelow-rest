/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const InputForm = ({style= 'form-input', containerClassname, label, id, type = 'text', register, errors = {}, inputClassname, validate, placeholder}) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname ))}>
      {label && 
        <label className="font-medium text-main-700" htmlFor={id}>{label}</label>
      }
      <input 
        type={type} 
        id={id} 
        className={twMerge(clsx(style, 'placeholder:text-sm italic' ,inputClassname))}
        {...register(id, validate)}
        placeholder={placeholder}
      />
      {errors[id] && 
        <small className="text-red-500 italic mt-[-10px]">{errors[id]?.message}</small>
      }
    </div>
  )
}

export default InputForm
