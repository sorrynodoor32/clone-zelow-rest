import clsx from 'clsx'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { adminSidebar } from '~/utils/contants'
import logo from '../../assets/logo.png'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useState } from 'react'

const AdminSidebar = () => {

    const [activeTabs, setActiveTabs] = useState([])

    const handleActiveTabs = (tabId) => {
        if(activeTabs.some(el => el === tabId)) setActiveTabs(prev => prev.filter(el => el !== tabId))
        else setActiveTabs(prev => [...prev, tabId])
    }

  return (
    <div className="h-screen w-full">
      <div className="w-full flex flex-col items-center justify-center p-4">
        <img src={logo} alt="logo" className="w-4/5 object-contain" />
        <small className='text-gray-300 italic'>Admin Workspace</small>
      </div>

      <div className='mt-6'>
        {adminSidebar.map(el => (
            <Fragment key={el.id}>
                {el.type === 'SINGLE' && 
                    <NavLink 
                        className={({isActive}) => clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 hover:border-orange-700 px-4 py-2', isActive && 'bg-main-700 border-r-4 border-orange-700')}
                        to={el.path}
                    >
                        <span className='text-2xl'>
                            {el.icon}
                        </span>
                        <span className='select-none'>
                            {el.name}
                        </span>
                    </NavLink>
                }
                {el.type === 'PARENT' &&(
                    <>
                        <div 
                            className='flex items-center justify-between px-4 py-3 cursor-pointer  hover:bg-main-700'
                            onClick={() => handleActiveTabs(el.id)}
                        >
                            <span className='flex items-center gap-2'>
                                <span className='text-2xl'>{el.icon}</span>
                                <span className='select-none'>{el.name}</span>
                            </span>
                           {activeTabs.some(tabId => tabId === el.id) ? <FaChevronDown /> : <FaChevronRight />}
                        </div>

                       {activeTabs.some(tabId => tabId === el.id) && (
                            <div className=''>
                            {el.subs.map(sub => (
                                <NavLink 
                                key={sub.id} 
                                className={({isActive}) => clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 hover:border-orange-700 px-4 py-2', isActive && 'bg-main-700 border-r-4 border-orange-700')}
                                to={sub.path}
                                >

                                    <span className='select-none'>
                                        {sub.name}
                                    </span>
                                </NavLink> 
                            ))}
                            </div>
                       )}
                    </>
                )}
            </Fragment>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
