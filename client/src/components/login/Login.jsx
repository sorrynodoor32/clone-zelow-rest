/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx"
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { apiRegister, apiSignin } from "~/apis/auth"
import { useAppStore } from "~/store/useAppStore"
import { useUserStore } from "~/store/useUserStore"
import { Button, InputForm, InputRadio } from ".."

const Login = () => {
  const [variant, setVariant] = useState('LOGIN')
  const [isLoading, setIsLoading] = useState(false)
  const {setModal} = useAppStore()
  const {token, setToken, roles} = useUserStore()
  const {register, formState: {errors}, handleSubmit, reset } = useForm()

  useEffect(()=>{
    reset()
  },[variant])

  const onSubmit = async (data) => {
    if(variant === 'REGISTER'){
      setIsLoading(true)
      const response = await apiRegister(data)
      setIsLoading(false)

      if(response.success){
        Swal.fire({
          icon:'success',
          title:'Congrats!',
          text: response.mes,
          showConfirmButton: true,
          confirmButtonText: 'Go SignIn'
        }).then(({isConfirmed})=>{
          if(isConfirmed) setVariant("LOGIN")
        })
      }else toast.error(response.mes)
    }

    if(variant === 'LOGIN'){
      const {name, ...payload} = data
      const response = await apiSignin(payload)
      if(response.success){
        toast.success(response.mes)
        setToken(response.accessToken)
        setModal(false, null)

      }else toast.error(response.mes)
    }
  }

  return (
    <div 
      className="bg-white text-lg rounded-md w-[500px] px-6 py-8 flex flex-col items-center gap-6"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-3xl font-semibold tracking-tight">Welcome to Rest06</h1>
      <div className="flex border-b w-full justify-start gap-6">
        <span 
          className={clsx(variant === 'LOGIN' && 'border-b-4 border-main-700', 'cursor-pointer')}
          onClick={()=>setVariant('LOGIN')}
        >
          Login
        </span>
        <span 
          onClick={()=>setVariant('REGISTER')}
          className={clsx(variant === 'REGISTER' && 'border-b-4 border-main-700', 'cursor-pointer')}
        >
          New Account
        </span>
      </div>
      <form className="flex flex-col gap-4 w-full px-4">
        <InputForm
          label='Phone Number' 
          register={register}
          id='phone'
          inputClassname='rounded-md'
          placeholder='Type your phone number here...'
          validate={{
            required:'This field cannot empty.',
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message:'Phone number invalid'
            }
          }}
          errors={errors}
        />
        <InputForm
          label='Password' 
          register={register}
          id='password'
          inputClassname='rounded-md'
          placeholder='Type your password here...'
          validate={{
            required:'This field cannot empty.'
          }}
          type="password"
          errors={errors}
        />
        {variant === 'REGISTER' && 
          <InputForm
            label='Your fullname' 
            register={register}
            id='name'
            inputClassname='rounded-md'
            placeholder='Type your name here...'
            validate={{
              required:'This field cannot empty.'
            }}
            errors={errors}
        />
        }
        
        {variant === 'REGISTER' && 
          <InputRadio 
            label='Type account' 
            register={register}
            id='roleCode'
            validate={{
              required:'This field cannot empty.'
            }}
            optionClassname="grid grid-cols-3 gap-4"
            errors={errors}
            options={roles?.filter(el => el.code !== 'ROL1')?.map(el => ({
              label: el.value,
              value: el.code
            }))}
          />
        }
      
        <Button
          className='py-2 my-6'
          onClick={handleSubmit(onSubmit)}
        >
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline w-full text-center">Forgot your password?</span>
      </form>
    </div>
  )
}

export default Login
