import React from 'react'

const UserAvatar = ({ user }) => {
    return (
        <div className='flex items-center justify-center w-fit h-fit gap-2'>
            <img src={user.avatar} alt="Aatar" />
            <div>
                <p className='text-[16px] font-semibold'>{user.name}</p>
                <p className='text-[14px]'>{user.role}</p>
            </div>
        </div>)
}

export default UserAvatar