import {create} from 'zustand'

export const useAppStore = create((set)=> (
    {
        isShowModal: false,
        modalChildren: null,
        setModal: (isShowModal, modalChildren) => set(() =>({isShowModal, modalChildren }) )
    }
))