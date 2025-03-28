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
import { motion, AnimatePresence } from "framer-motion";
import profileIcon from "../../assets/sidebar/profile.svg";
import logoutIcon from "../../assets/sidebar/logout.svg";
import { routes } from "../../utils";
import { resetState } from "../../redux/slices/authSlice";
import { resetStateTopic } from "../../redux/slices/topicSlice";
import { resetpState } from "../../redux/slices/articleSlice";
import { resetPaymentState } from "../../redux/slices/paymentSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { cookieAccessKeys } from "../../utils";
import Cookies from "js-cookie";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { clearNotifications } from "../../redux/slices/notificationSlice";

const Header = ({userData}) => {
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const langOptions = [
    { name: "Spanish", flag: spainish },
    { name: "French", flag: french },
    { name: "English", flag: uk },
  ];
  const [selected, setSelected] = useState(langOptions[0]);
  const response = useSelector((state) => state.auth);
  // const handleCountrySelect = (country) => {
  //   console.log("Selected Country:", country.name);
  // };

   const logout = () => {
      Cookies.remove(cookieAccessKeys?.tokens?.accessToken);
      Cookies.remove(cookieAccessKeys.tokens.refreshToken);
  
      dispatch(resetState());
      dispatch(resetStateTopic());
      dispatch(resetpState())
      dispatch(resetPaymentState())
      dispatch(clearNotifications());
      navigate(routes.login, { replace: true });
    };

    const navItems2 = [
      { name: 'Profile', to: routes.profile, icon :FaUserAlt },
      { name: 'Logout', icon: MdOutlineLogout, callBack: logout },
    ];

  const dispatch = useDispatch();

  const toogleMobileSidebar = () => {
    dispatch(toggleMobileOpen());
  };
  return (
    <div className=" relative w-full h-[80px] lg:h-[100px] bg-white shadow-custom flex items-center px-4 lg:px-12  justify-between">
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
        <motion.button
        onClick={() => setIsVisible(!isVisible)}
        whileTap={{ y: 1 }}
        >
        <UserAvatar
          user={{
            name: `${response?.user?.user?.fullName}`,
            role: "User",
            avatar: userData?.profileImage?.filepath || avatar,
          }}
        />
        
        </motion.button>
        <CgMenuRight
          onClick={toogleMobileSidebar}
          className="lg:hidden"
          size={30}
        />
        {/* <Dropdown label="Select Language" onSelect={handleCountrySelect} options={langOptions} selected={selected} /> */}

      </div>
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute right-[50px] bottom-[-95px] z-50 h-[120px] w-[160px] bg-gray-100 shadow-lg rounded-[8px] flex flex-col items-center justify-center gap-3"
          >
            {navItems2.map((item, index) => (
              <motion.div
              key={index}
              className="flex items-center z-50 w-full gap-4 justify-center "
              onClick={() => {
                // setActive(item.name);
                if (item.callBack) item.callBack();
              }} // Set active on click
              >
                <NavLink className="flex items-center w-full gap-4 py-2 justify-center hover:bg-gray-200 hover:text-app-blue-1 text-app-grey-1 " to={item.to}><item.icon size={22} className=""/><div className="text-[18px]">{item.name}</div></NavLink>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Header;
