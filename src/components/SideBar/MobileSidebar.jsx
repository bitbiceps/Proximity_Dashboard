// import React, { useState } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { routes, sideBarTabs } from "../../utils"; // Ensure your routes and sidebar tabs are defined in utils
// import { AiOutlineClose } from "react-icons/ai";
// import { TbDashboardFilled } from "react-icons/tb";
// import packageIcon from "../../assets/sidebar/package.svg";
// import topicGeneratorIcon from "../../assets/sidebar/topic.svg";
// import articleIcon from "../../assets/sidebar/article.svg";
// import profileIcon from "../../assets/sidebar/profile.svg";
// import logoutIcon from "../../assets/sidebar/logout.svg";
// import logo from "../../assets/sidebar/logo.svg";
// import Divider from "../common/Divider";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleMobileOpen } from "../../redux/slices/sidebarSlice";

// const MobileSidebar = ({ logout, user,articles, topics }) => {
  // const isMobileOpen = useSelector(
  //   ({ sidebar: { isMobileOpen } }) => isMobileOpen
  // );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isHovered = true; // Set the hover state
//   const transition = "transition-all duration-200 ease-in-out";

//   // Nav items with Profile and Logout options
//   const navItems1 = [
//     { name: sideBarTabs.dashboard, to: routes.root, icon: TbDashboardFilled },
//     { name: sideBarTabs.package, to: routes.package, img: packageIcon },
//     {
//       name: sideBarTabs?.topicGenerator,
//       to:
//         topics?.length > 0
//           ? routes?.topic_unlocked
//           : user?.user?.topics?.length > 0
//           ? routes?.topic_unlocked
//           : routes.fill_questionnaire,
//       img: topicGeneratorIcon,
//     },
//     {
//       name: sideBarTabs.articles_unlocked,
//       to: routes.articles_unlocked,
//       img: articleIcon,
//     },
//   ];
//   const navItems2 = [
//     { name: sideBarTabs.profile, to: routes.profile, img: profileIcon }, // Added Profile
//     { name: sideBarTabs.logout, img: logoutIcon, callBack: logout },
//   ];

  // const handleNavigation = (path) => {
  //   setIsOpen(false); // Close the sidebar on navigation
  //   if (path) {
  //     navigate(path); // Navigate to the new path
  //   }
  //   // Handle Logout logic if applicable (e.g., clearing tokens, redirecting to login page)
  //   if (path === null) {
  //     console.log("Logging out...");
  //     // Perform your logout logic here (clear tokens, etc.)
  //   }
  // };

  // const toogleMobileSidebar = () => {
  //   dispatch(toggleMobileOpen());
  // };

//   return (
//     <div
//       className={`fixed inset-0 z-50 bg-gray-800 text-white transition-transform duration-300  ${
//         isMobileOpen ? "-translate-x-10" : "-translate-x-full"
//       }`}
//     >
//       <div className="p-4 flex justify-between items-center pl-12 lg:pl-24">
//         <div className="flex items-center justify-between p-8">
//           <img className="filter brightness-0 invert" src={logo} alt="Logo" />
//         </div>
//         <button onClick={toogleMobileSidebar}>
//           <AiOutlineClose size={24} />
//         </button>
//       </div>
//       <nav className="flex-1 overflow-y-auto">
//         <div className="w-full flex flex-col justify-between h-[80vh] ">
//           <ul className="">
//             {navItems1.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.to || "#"} // Ensure no route issue with null paths
//                 onClick={() => handleNavigation(item.to)} // Navigate on click
//                 className={`${transition} flex pl-12 lg:pl-24 items-center w-full h-[60px] gap-6 ${
//                   location.pathname === item.to ? "mb-4" : ""
//                 }`}
//               >
//                 <li
//                   className={`${transition} flex text-[18px] items-center p-2 ${
//                     isHovered ? "w-[75%] h-[50px]" : "w-fit h-fit"
//                   } pl-6 rounded-md ${
//                     location.pathname === item.to
//                       ? "bg-app-blue-1 text-white"
//                       : "hover:bg-gray-100 text-app-grey-1"
//                   } ${!isHovered ? "justify-center" : ""}`}
//                 >
//                   {isHovered ? (
//                     <>
//                       {item.icon && <item.icon size={26} className="mr-2" />}
//                       {item.img && (
//                         <img
//                           src={item.img}
//                           className={`mr-2 ${
//                             location.pathname === item.to
//                               ? "filter brightness-0 invert"
//                               : ""
//                           }`}
//                         />
//                       )}
//                       <p
//                         className={`${
//                           location.pathname === item.to ? "font-semibold" : ""
//                         }`}
//                       >
//                         {item.name}
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       {item.icon && <item.icon size={26} className="mr-2" />}
//                       {item.img && <img src={item.img} className="mr-2" />}
//                     </>
//                   )}
//                 </li>
//               </NavLink>
//             ))}
//           </ul>
//           <ul className="h-fit">
//             <div>
//               <Divider color="border-app-grey-1" />
//             </div>
//             {navItems2.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.to || "#"} // Ensure no route issue with null paths
//                 onClick={() => handleNavigation(item.to)} // Navigate on click
//                 className={`${transition} pl-24 flex items-center w-full h-[60px] gap-6 ${
//                   location.pathname === item.to ? "mb-4" : ""
//                 }`}
//               >
//                 <li
//                   className={`${transition} flex text-[18px] items-center p-2 ${
//                     isHovered ? "w-[75%] h-[50px]" : "w-fit h-fit"
//                   } pl-6 rounded-md ${
//                     location.pathname === item.to
//                       ? "bg-app-blue-1 text-white"
//                       : "hover:bg-gray-100 text-app-grey-1"
//                   } ${!isHovered ? "justify-center" : ""}`}
//                 >
//                   {isHovered ? (
//                     <>
//                       {item.icon && <item.icon size={26} className="mr-2" />}
//                       {item.img && (
//                         <img
//                           src={item.img}
//                           className={`mr-2 ${
//                             location.pathname === item.to
//                               ? "filter brightness-0 invert"
//                               : ""
//                           }`}
//                         />
//                       )}
//                       <p
//                         className={`${
//                           location.pathname === item.to ? "font-semibold" : ""
//                         }`}
//                       >
//                         {item.name}
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       {item.icon && <item.icon size={26} className="mr-2" />}
//                       {item.img && <img src={item.img} className="mr-2" />}
//                     </>
//                   )}
//                 </li>
//               </NavLink>
//             ))}
//           </ul>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default MobileSidebar;


import React, { useEffect, useState } from "react";
import logo from "../../assets/sidebar/logo.svg";
import { NavLink } from "react-router-dom";
import { routes, sideBarTabs } from "../../utils";
import { TbDashboardFilled } from "react-icons/tb";
import packageIcon from "../../assets/sidebar/package.svg";
import topicGeneratorIcon from "../../assets/sidebar/topic.svg";
import articleIcon from "../../assets/sidebar/article.svg";
import profileIcon from "../../assets/sidebar/profile.svg";
import logoutIcon from "../../assets/sidebar/logout.svg";
import Divider from "../common/Divider";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllTopics } from "../../redux/slices/generatedSlice";
import axios from "axios";
import { baseURL } from "../../axios/instance";
import { useSelector } from "react-redux";;
import { toggleMobileOpen } from "../../redux/slices/sidebarSlice";
const MobileSidebar = ({ logout, user, articles, topics }) => {
  const isMobileOpen = useSelector(
    ({ sidebar: { isMobileOpen } }) => isMobileOpen
  );
  const [active, setActive] = useState(); // Track the active state of the sidebar
  const isHovered = true;
  const transition = "transition-all duration-200 ease-in-out";
  const location = useLocation();
  const current = location.state?.current;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();

  const handleNavigation = (path) => {
    setIsOpen(false); // Close the sidebar on navigation
    if (path) {
      navigate(path); // Navigate to the new path
    }
    // Handle Logout logic if applicable (e.g., clearing tokens, redirecting to login page)
    if (path === null) {
      console.log("Logging out...");
      // Perform your logout logic here (clear tokens, etc.)
    }
  };
  const toogleMobileSidebar = () => {
    dispatch(toggleMobileOpen());
  };

  const fetchUser = async (userId) => {
    try {
      if (userId) {
        const response = await axios.get(
          `${baseURL}/user/details?user=${userId}`,
          {
            headers: {
              "Content-Type": "application/json", // Ensure content type is JSON
            },
          }
        );
        const userDataToSend = response.data.user;
        setUserData(userDataToSend);
      }
      // console.log("userrrrrrrrrrrr from sidebarrrrrrrrrr", userDataToSend);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (user && user.user) {
      fetchUser(user.user._id || null);
    }
  }, [user]); // Add user as a dependency to run when user data changes.

  const lastSet = userData?.questionnaire?.industryContextAndInsights;
  const questionsArray =
    lastSet &&
    Object.keys(lastSet).map((key) => ({
      number: parseInt(key),
      ...lastSet[key],
    }));
  const isLastQuestion =
    userData?.questionnaire?.industryContextAndInsights[
      questionsArray.length
    ]?.answer?.trim().length;
  console.log("lastQuestion ", isLastQuestion, questionsArray?.length);
  const finalData =
    user?.user?.user?.articles?.length > 0
      ? user?.user?.user?.articles
      : articles;
  const navItems1 = [
    { name: sideBarTabs.dashboard, to: routes.root, icon: TbDashboardFilled },
    { name: sideBarTabs.package, to: routes.package, img: packageIcon },
    {
      name: sideBarTabs?.topicGenerator, // if lastquestion true check topic length
      to: isLastQuestion
        ? topics?.length > 0
          ? routes?.topic_unlocked
          : routes.secondary_questionnaire
        : routes.secondary_questionnaire,
      img: topicGeneratorIcon,
    },
    {
      name: sideBarTabs.articles_unlocked,
      to: routes.articles_unlocked,
      img: articleIcon,
    },
  ];

  const navItems2 = [
    { name: sideBarTabs.profile, to: routes.profile, img: profileIcon },
    { name: sideBarTabs.logout, img: logoutIcon, callBack: logout },
  ];
  const handleGeneration = () => {
    dispatch(getAllTopics(user.user._id));
    // dispatch(updatedArticles(user.user.userId))
  };
  return (
    <div
      className={`fixed inset-0 z-50 bg-gray-800 w-[90vw] text-white transition-transform duration-300  ${
        isMobileOpen ? "-translate-x-10" : "-translate-x-full"
      }`}
    >
    <div
      className={`flex flex-col h-screen bg-white text-white transition-width duration-300 sidebar-shadow pl-14 sticky top-0 left-0`}
    >
      <div className="flex items-center justify-between px-2 py-8 lg:p-8 ">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="flex-1 overflow-y-auto">
        <div className="flex flex-col justify-between h-full">
          <ul className="h-fit">
            {navItems1.map((item, index) => (
              <NavLink
                key={item.name + index + "Top Nav"}
                to={item.to}
                onClick={() => {
                  handleGeneration();
                  setActive(item.name);
                  // handleNavigation(item.to);
                  toogleMobileSidebar();
                }} // Set active on click
                className={`${transition} flex items-center w-full h-[60px] gap-6 ${
                  active == item.name && "mb-4"
                }`}
              >
                <div
                  className={`${transition} ${
                    active == item.name ? "bg-app-blue-1" : "bg-white"
                  } ${isHovered ? "h-full" : "h-full"} w-[4px] rounded-r-lg`}
                />
                <li
                  className={`${transition} flex text-[18px] items-center p-2 ${
                    isHovered ? "w-[75%] h-[55px]" : "w-fit h-fit"
                  } pl-6  rounded-lg ${
                    active == item.name
                      ? "bg-app-blue-1 text-white"
                      : "hover:bg-gray-100 text-app-grey-1"
                  } ${!isHovered ? "justify-center" : ""}`}
                >
                  {isHovered ? (
                    <>
                      {item.icon && <item.icon size={26} className="mr-2" />}
                      {item.img && (
                        <img
                          src={item.img}
                          className={`mr-2 ${
                            active === item.name && "filter brightness-0 invert"
                          }`}
                        />
                      )}
                      <p
                        className={`${active == item.name && "font-semibold"}`}
                      >
                        {item.name}
                      </p>
                    </>
                  ) : (
                    <>
                      {item.icon && <item.icon size={26} />}
                      {item.img && (
                        <img
                          src={item.img}
                          size={26}
                          className={`${
                            active === item.name && "filter brightness-0 invert"
                          }`}
                        />
                      )}
                    </>
                  )}
                </li>
              </NavLink>
            ))}
          </ul>

          <ul className="h-fit mb-12">
            <Divider className={"mb-4"} />
            {navItems2.map((item, index) => (
              <React.Fragment key={item.name + index + "Bottom Nav"}>
                {item.to ? (
                  <NavLink
                    to={item.to}
                    onClick={() => {
                      setActive(item.name)
                      toogleMobileSidebar();
                    }} // Set active on click
                    className={`${transition} flex items-center w-full h-[60px] gap-6 ${
                      active == item.name && "mb-4"
                    }`}
                  >
                    <div
                      className={`${transition} ${
                        active == item.name ? "bg-app-blue-1" : "bg-white"
                      } ${
                        isHovered ? "h-full" : "h-full"
                      } w-[4px] rounded-r-lg`}
                    />
                    <li
                      className={`${transition} flex text-[18px] items-center p-2 ${
                        isHovered ? "w-[75%] h-[55px]" : "w-fit h-fit"
                      } pl-6  rounded-lg ${
                        active == item.name
                          ? "bg-app-blue-1 text-white"
                          : "hover:bg-gray-100 text-app-grey-1"
                      } ${!isHovered ? "justify-center" : ""}`}
                    >
                      {isHovered ? (
                        <>
                          {item.icon && (
                            <item.icon size={26} className="mr-2" />
                          )}
                          {item.img && (
                            <img
                              src={item.img}
                              className={`mr-2 ${
                                active === item.name &&
                                "filter brightness-0 invert"
                              }`}
                            />
                          )}
                          <p
                            className={`${
                              active == item.name && "font-semibold"
                            }`}
                          >
                            {item.name}
                          </p>
                        </>
                      ) : (
                        <>
                          {item.icon && <item.icon size={26} />}
                          {item.img && (
                            <img
                              src={item.img}
                              size={26}
                              className={`${
                                active === item.name &&
                                "filter brightness-0 invert"
                              }`}
                            />
                          )}
                        </>
                      )}
                    </li>
                  </NavLink>
                ) : (
                  <div
                    key={item.name}
                    onClick={() => {
                      // setActive(item.name);
                      if (item.callBack) item.callBack();
                      toogleMobileSidebar();
                    }} // Set active on click
                    className={`${transition} cursor-pointer flex items-center w-full h-[60px] gap-6 ${
                      active == item.name && "mb-4"
                    }`}
                  >
                    <div
                      className={`${transition} ${
                        active == item.name ? "bg-app-blue-1" : "bg-white"
                      } ${
                        isHovered ? "h-full" : "h-full"
                      } w-[4px] rounded-r-lg`}
                    />
                    <li
                      className={`${transition} flex text-[18px] items-center p-2 ${
                        isHovered ? "w-[75%] h-[55px]" : "w-fit h-fit"
                      } pl-6  rounded-lg ${
                        active == item.name
                          ? "bg-app-blue-1 text-white"
                          : "hover:bg-gray-100 text-app-grey-1"
                      } ${!isHovered ? "justify-center" : ""}`}
                    >
                      {isHovered ? (
                        <>
                          {item.icon && (
                            <item.icon size={26} className="mr-2" />
                          )}
                          {item.img && (
                            <img
                              src={item.img}
                              className={`mr-2 ${
                                active === item.name &&
                                "filter brightness-0 invert"
                              }`}
                            />
                          )}
                          <p
                            className={`${
                              active == item.name && "font-semibold"
                            }`}
                          >
                            {item.name}
                          </p>
                        </>
                      ) : (
                        <>
                          {item.icon && <item.icon size={26} />}
                          {item.img && (
                            <img
                              src={item.img}
                              size={26}
                              className={`${
                                active === item.name &&
                                "filter brightness-0 invert"
                              }`}
                            />
                          )}
                        </>
                      )}
                    </li>
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </nav>
    </div>
    </div>
  );
};

export default MobileSidebar;
