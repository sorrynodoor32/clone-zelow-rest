import axios  from "~/axios";

export const apiRegister = (data) => axios({
    url:'/auth/signup',
    method: 'post',
    data
})

export const apiSignin = (data) => axios({
    url:'/auth/signin',
    method: 'post',
    data
})