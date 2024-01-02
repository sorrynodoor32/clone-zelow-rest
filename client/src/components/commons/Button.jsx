/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {twMerge} from 'tailwind-merge'
import clsx from 'clsx'
import { ImSpinner3 } from "react-icons/im";

const Button = ({children, className, onClick, type='button', disable}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(clsx('py-3 px-4 flex items-center justify-center gap-3  text-white bg-main-700 rounded-md', className, disable && 'opacity-50'))}
      disabled={disable}
    >
      {disable && 
        <span className='animate-spin'><ImSpinner3 /></span>
      }
      {children}
    </button>
  )
}

export default Button
