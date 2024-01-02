/* eslint-disable react/prop-types */
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const InputRadio = ({style= 'form-radio', containerClassname, optionClassname, label, id, register, errors = {}, inputClassname, validate, options=[] }) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full',containerClassname ))}>
        {label && 
            <label className="font-medium" htmlFor={id}>{label}</label>
        }

       <div className={twMerge(clsx(optionClassname))}>
        {options.map(el => (
          <div className="flex items-center gap-2" key={el.value}>
              <input 
                  type='radio' 
                  name={id} 
                  id={el.value}
                  value={el.value}
                  className={twMerge(clsx(style, 'placeholder:text-sm italic' ,inputClassname))}
                  {...register(id, validate)}
              />
              <label className=" cursor-pointer" htmlFor={el.value}>{el.label}</label>
          </div>
        ))}
       </div>
     
      {errors[id] && 
        <small className="text-red-500 italic mt-[-10px]">{errors[id]?.message}</small>
      }
    </div>
  )
}

export default InputRadio
