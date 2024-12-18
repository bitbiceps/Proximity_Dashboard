import React from 'react'
import { RiLoader4Fill } from "react-icons/ri";


const Loading = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center text-app-blue-1'>
        <RiLoader4Fill className='animate-spin' size={40}/>
    </div>
  )
}

export default Loading