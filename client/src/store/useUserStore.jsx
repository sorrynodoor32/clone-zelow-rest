/* eslint-disable no-unused-vars */
import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import { apiGetCurrentUser, apiGetRoles } from '~/apis/user'

export const useUserStore = create(persist(
    (set, get)=> (
        {
            token: null,
            currentUser: null,
            roles: [],
            setToken: (token) => set(() => ({token})),
            getCurrent: async () => {
                const response = await apiGetCurrentUser()
                if(response.success) return set(()=>({currentUser: response.currentUser}))
                else return set(()=>({currentUser: null}))
            },
            getRoles: async () => {
                const response = await apiGetRoles()
                if(response.success) return set(()=>({roles: response.roles}))
                else return set(()=>({roles: []}))
            }
        }
    ),
    {
        name: 'rest06',
        storage: createJSONStorage(() => localStorage),
        //Return object of states want to save in localStorage
        partialize: (state) => (Object.fromEntries(Object.entries(state).filter(el => el[0] === 'token' || el[0] === 'currentUser')))
    }
))