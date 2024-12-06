import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { routes, sideBarTabs } from "../../utils"; // Ensure your routes and sidebar tabs are defined in utils
import { AiOutlineClose } from "react-icons/ai";
import { TbDashboardFilled } from 'react-icons/tb';
import packageIcon from "../../assets/sidebar/package.svg"
import topicGeneratorIcon from "../../assets/sidebar/topic.svg"
import articleIcon from "../../assets/sidebar/article.svg"
import logo from "../../assets/sidebar/logo.svg";


const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // Manage mobile sidebar open/close state
    const navigate = useNavigate();
    const location = useLocation();
    const isHovered = true; // Set the hover state
    const transition = "transition-all duration-200 ease-in-out";

    const navItems = [
        { name: sideBarTabs.dashboard, to: routes.root, icon: TbDashboardFilled },
        { name: sideBarTabs.package, to: routes.package, img: packageIcon }, // Update with actual path
        { name: sideBarTabs.topicGenerator, to: routes.topic_generator, img: topicGeneratorIcon },
        { name: sideBarTabs.articleWriter, to: routes.article_writer, img: articleIcon },
    ];

    const handleNavigation = (path) => {
        setIsOpen(false); // Close the sidebar on navigation
        navigate(path); // Navigate to the new path
    };

    return (
        <div
            className={`fixed inset-0 z-50 bg-gray-800 text-white transition-transform duration-300 pl-24 ${isOpen ? "-translate-x-10" : "-translate-x-full"}`}
        >
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center justify-between p-8">
                    <img className="filter brightness-0 invert" src={logo} alt="Logo" />
                </div>
                <button onClick={() => setIsOpen(false)}>
                    <AiOutlineClose size={24} />
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <ul>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            onClick={() => handleNavigation(item.to)} // Navigate on click
                            className={`${transition} flex items-center w-full h-[60px] gap-6 ${location.pathname === item.to ? "mb-4" : ""}`}
                        >
                            <li
                                className={`${transition} flex text-[18px] items-center p-2 ${isHovered ? "w-[75%] h-[50px]" : "w-fit h-fit"} pl-6 rounded-md ${location.pathname === item.to ? "bg-app-blue-1 text-white" : "hover:bg-gray-100 text-app-grey-1"
                                    } ${!isHovered ? "justify-center" : ""}`}
                            >
                                {isHovered ? (
                                    <>
                                        {item.icon && <item.icon size={26} className="mr-2" />}
                                        {item.img && <img src={item.img} className={`mr-2 ${location.pathname === item.to ? "filter brightness-0 invert" : ""}`} />}
                                        <p className={`${location.pathname === item.to ? "font-semibold" : ""}`}>{item.name}</p>
                                    </>
                                ) : (
                                    <>
                                        {item.icon && <item.icon size={26} className="mr-2" />}
                                        {item.img && <img src={item.img} className="mr-2" />}
                                    </>
                                )}
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default MobileSidebar;