import clsx from "clsx"
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button, InputForm } from ".."

const Login = () => {
  const [variant, setVariant] = useState('LOGIN')
  const {register, formState: {errors}, handleSubmit, reset, watch } = useForm()

  useEffect(()=>{
    reset()
  },[variant])
  const onSubmit = (data) => {
    console.log(data)
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
            required:'This field cannot empty.'
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
