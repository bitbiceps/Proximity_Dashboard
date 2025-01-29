import React from 'react'
import { CiCircleChevDown } from "react-icons/ci";


const UserAvatar = ({ user }) => {
    console.log("user avtar from userrrrrrrr", user.avatar)
    return (
        <div className='hidden sm:flex items-center justify-center w-fit h-fit gap-2'>
            <div className='rounded-full w-[50px] h-[50px] justify-center items-center'>
                <img className="w-full h-full object-cover rounded-full" src = {user.avatar} alt="Aatar" />
            </div>
            <div>
                <p className='text-[16px] font-semibold'>{user.name}</p>
                <p className='text-[14px]'>{user.role}</p>
            </div>
            <CiCircleChevDown className='text-xl text-app-grey-4 ml-2' />
        </div>
    )
}

export default UserAvatar