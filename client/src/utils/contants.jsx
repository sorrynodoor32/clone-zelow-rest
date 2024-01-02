import { path } from "./path";
import { RiDashboardLine } from "react-icons/ri";
import { GiSpookyHouse } from "react-icons/gi";

export const navigation = [
    {
        id: 1,
        path: '/',
        text: 'HOME',
    },
    {
        id: 2,
        path: `/${path.ABOUT_US}`,
        text: 'ABOUT US',
    },
    {
        id: 3,
        path: `/${path.OUR_AGENTS}`,
        text: 'OUR AGENTS',
    },
    {
        id: 4,
        path: `/${path.PROPERTIES}`,
        text: 'PROPERTIES',
    },
    {
        id: 5,
        path: `/${path.SEARCH}`,
        text: 'SEARCH',
    },
]

export const adminSidebar = [
    {
        id: 1,
        name: 'Dashboard',
        path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
        icon: <RiDashboardLine />,
        type: 'SINGLE'
    },
    {
        id: 2,
        name: 'PropertyType',
        icon: <GiSpookyHouse />,
        type: 'PARENT',
        subs: [
            {
                id: 11,
                path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
                name: 'Create new property'
            },
            {
                id: 12,
                path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
                name: 'Manage property'
            }
        ]
    },
    
    
]