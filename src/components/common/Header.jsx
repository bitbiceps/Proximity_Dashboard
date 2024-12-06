import React, { useState } from 'react'
import searchIcon from "../../assets/common/search.svg"
import bellIcon from "../../assets/header/bell.svg"
import avatar from "../../assets/header/avatar.svg"

const Header = () => {
    const [search, setSearch] = useState("")
    return (
        <div className='w-full h-[100px] bg-white shadow-custom flex items-center px-12  justify-between'>
            <div className='flex items-center w-fit h-[50px] bg-app-grey-2  rounded-full overflow-hidden px-8 gap-4 border border-app-grey-3'>
                <img src={searchIcon} alt="Search" />
                <input placeholder='Search' value={search} className='bg-transparent h-[80%] outline-none border-none w-[346px]' onChange={e => setSearch(e.target.value)} type="text" name="" id="" />
            </div>
            <div className='flex items-center gap-12'>
                {/* Notifications */}
                <div className="relative inline-block">
                    <img src={bellIcon} alt="Notification Bell" className="w-8 h-8" />
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        6 {/* Replace with dynamic notification count */}
                    </div>
                </div>
                {/* User */}
                <div className='flex items-center justify-center w-fit h-fit gap-2'>
                    <img src={avatar} alt="Aatar" />
                    <div>
                        <p className='text-[16px] font-semibold'>Sana Ray</p>
                        <p className='text-[14px]'>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header