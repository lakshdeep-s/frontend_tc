import React from 'react'
import LoginForm from '@/components/auth_components/LoginForm'
import { SiOllama } from "react-icons/si";

const AuthPage = () => {
  return (
    <div className='h-screen flex justify-center items-center '>

      <div className='border rounded-md p-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='text-3xl font-semibold tracking-tighter flex flex-col gap-2 items-center'><span className='border-2 border-white rounded-md p-2 bg-blue-500'><SiOllama size={24}/></span>Authenticate Llama</h1>
          <p className='text-sm text-muted-foreground'>Login using you email credentials</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default AuthPage
