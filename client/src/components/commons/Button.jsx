/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {twMerge} from 'tailwind-merge'
import clsx from 'clsx'

const Button = ({children, className, onClick, type='button'}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(clsx('py-3 px-4 text-white bg-main-700 rounded-md', className))}
    >
      {children}
    </button>
  )
}

export default Button
