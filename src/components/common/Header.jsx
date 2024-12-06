import React, { useState } from 'react'
import searchIcon from "../../assets/common/search.svg"
import avatar from "../../assets/header/avatar.svg"
import Notifications from './Notifications'
import UserAvatar from './UserAvatar'
import Dropdown from './Dropdown'

const Header = () => {
    const [search, setSearch] = useState("")
    const userOptions = [
        { id: 1, label: "Profile" },
        { id: 2, label: "Settings" },
        { id: 3, label: "Help" },
        { id: 4, label: "Logout" },
    ];


    const handleOptionSelect = (option) => {
        console.log(`Selected: ${option.label}`);
        // Add specific actions for each option if needed
        if (option.label === "Logout") {
            console.log("Logging out...");
            // Perform logout action here
        }
    };
    return (
        <div className='w-full h-[100px] bg-white shadow-custom flex items-center px-12  justify-between'>
            <div className='flex items-center w-fit h-[50px] bg-app-grey-2  rounded-full overflow-hidden px-8 gap-4 border border-app-grey-3'>
                <img src={searchIcon} alt="Search" />
                <input placeholder='Search' value={search} className='bg-transparent h-[80%] outline-none border-none w-[346px]' onChange={e => setSearch(e.target.value)} type="text" name="" id="" />
            </div>
            <div className='flex items-center gap-12'>
                {/* Notifications */}
                <Notifications />
                {/* User */}
                <UserAvatar user={{ name: "Sana Ray", role: "Admin", avatar }} />
                <Dropdown options={userOptions} label="label" onOptionSelect={handleOptionSelect} />
            </div>
        </div>
    )
}

export default Header