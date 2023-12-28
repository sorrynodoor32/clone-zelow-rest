/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { TiPhoneOutline } from "react-icons/ti";
import { FaFacebookF, FaInstagram, FaYoutube  } from "react-icons/fa";
import {twMerge} from 'tailwind-merge'
import clsx from 'clsx'
import withRouter from "~/hocs/withRouter";


const Topheader = ({location}) => {
  return (
    <div className={twMerge(
      clsx(
        "h-[85px] text-white border-b border-main-400 w-full bg-transparent fixed z-50 top-0 flex items-center justify-between px-[100px] py-[26px]",
        location.pathname !== '/' && 'bg-main-700'
      )
    )}>
      <span className="flex items-center gap-2">
        <span><MdOutlineMarkEmailRead /></span>
        <span>
          <span>Email us at: </span>
          <span className="text-gray-300">example@gmail.com</span>
        </span>
      </span>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-8 text-gray-300 cursor-pointer">
          <FaFacebookF />
          <FaInstagram />
          <FaYoutube size={18}/>
        </div>
        <div className="flex items-center pl-8 border-l border-main-400">
          <span className="flex items-center gap-2">
            <TiPhoneOutline />
            <span className="text-gray-300">123-456-7890</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Topheader)
