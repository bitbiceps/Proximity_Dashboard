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
const DesktopSidebar = ({ logout, user, articles, topics }) => {
  const [active, setActive] = useState(); // Track the active state of the sidebar
  const isHovered = true;
  const transition = "transition-all duration-200 ease-in-out";
  const location = useLocation();
  const current = location.state?.current;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
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
    } catch (error) {
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
      className={`flex flex-col h-screen bg-white text-white transition-width duration-300 sidebar-shadow ${
        isHovered ? "w-72" : "w-24"
      } sticky top-0 left-0`}
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
                    onClick={() => setActive(item.name)} // Set active on click
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
  );
};

export default DesktopSidebar;
