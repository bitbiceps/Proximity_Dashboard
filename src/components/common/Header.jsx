import React, { useState } from "react";
import searchIcon from "../../assets/common/search.svg";
import avatar from "../../assets/header/avatar.svg";
import Notifications from "./Notifications";
import UserAvatar from "./UserAvatar";
import Dropdown from "./Dropdown";
import spainish from "../../assets/lang_flags/spanish.svg";
import uk from "../../assets/lang_flags/uk.svg";
import french from "../../assets/lang_flags/french.svg";
import { useDispatch, useSelector } from "react-redux";
import { CgMenuRight } from "react-icons/cg";
import { toggleMobileOpen } from "../../redux/slices/sidebarSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const langOptions = [
    { name: "Spanish", flag: spainish },
    { name: "French", flag: french },
    { name: "English", flag: uk },
  ];
  const [selected, setSelected] = useState(langOptions[0]);
  const response = useSelector((state) => state.auth);
  const handleCountrySelect = (country) => {
    console.log("Selected Country:", country.name);
  };

  const dispatch = useDispatch();

  const toogleMobileSidebar = () => {
    dispatch(toggleMobileOpen());
  };
  return (
    <div className="w-full h-[80px] lg:h-[100px] bg-white shadow-custom flex items-center px-4 lg:px-12  justify-between">
      <div className="flex items-center w-fit h-[40px] md:h-[40px] lg:h-[50px] bg-app-grey-2  rounded-full overflow-hidden px-8 gap-4 border border-app-grey-3">
        <img src={searchIcon} alt="Search" />
        <input
          placeholder="Search"
          value={search}
          className="bg-transparent h-[80%] outline-none border-none w-[30vw] lg:w-[346px]"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name=""
          id=""
        />
      </div>
      <div className="flex items-center gap-2 md:gap-4 lg:gap-10 xl:gap-12">
        {/* Notifications */}
        <Notifications />
        {/* User */}
        <UserAvatar
          user={{
            name: `${response?.user?.user?.fullName}`,
            role: "User",
            avatar,
          }}
        />
        <CgMenuRight
          onClick={toogleMobileSidebar}
          className="md:hidden"
          size={30}
        />
        {/* <Dropdown label="Select Language" onSelect={handleCountrySelect} options={langOptions} selected={selected} /> */}
      </div>
    </div>
  );
};

export default Header;
