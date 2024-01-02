/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Link, NavLink } from "react-router-dom"
import logo from '~/assets/logo.png'
import { navigation } from "~/utils/contants"
import Button from "../commons/Button"
import clsx from 'clsx'
import withRouter from "~/hocs/withRouter"
import {twMerge} from 'tailwind-merge'
import { useUserStore } from "~/store/useUserStore"
import { useAppStore } from "~/store/useAppStore"
import {Login} from '~/components/index'

const Navigation = ({location}) => {
  const {currentUser} = useUserStore()
  const {setModal} = useAppStore()
  return (
    <div className={twMerge(clsx("w-full bg-transparent flex items-center justify-between fixed z-50 top-[85px] px-[100px] py-[26px]"), location.pathname !== '/' && 'bg-white')}>
      <Link to="/">
        <img src={logo} alt="logo" className="w-[120px] object-contain" />
      </Link>
      <div className={clsx("flex items-center gap-6 text-lg", location.pathname === '/' ? 'text-main-100' : 'text-gray-700')}>
        {navigation.map(el => (
            <NavLink className={({isActive})=> clsx(isActive && 'font-medium', location.pathname === '/' ? 'text-white' : 'text-gray-900')} key={el.id} to={el.path}>
                {el.text}
            </NavLink>
        ))}
        {!currentUser ? 
          <Button
            className={twMerge(clsx(location.pathname === '/' &&'bg-transparent border-main-100 border'))}
            onClick={() => setModal(true, <Login />)}
          >
            Sign in
          </Button>
          : 
          <Button
          className={twMerge(clsx(location.pathname === '/' &&'bg-transparent border-main-100 border'))}
          >
            Add Listing
          </Button>
        }
        
      </div>
    </div>
  )
}

export default withRouter(Navigation)
