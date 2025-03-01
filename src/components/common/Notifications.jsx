import React, { useState, useRef, useEffect } from "react";
import { IoIosNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef(null);
  const notifications = useSelector((state) => state.notifications.notifications);

  const handleNotificationClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={notificationRef}>
      {/* Notification Icon */}
      <div className="relative group cursor-pointer" onClick={handleNotificationClick}>
        <IoIosNotifications className="size-9 group-hover:hidden" />
        <IoMdNotificationsOutline className="size-9 group-hover:block hidden" />
      </div>

      {/* Notification Count */}
      {notifications.length > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {notifications.length}
        </div>
      )}

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-lg z-50">
          {notifications.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto">
              {notifications.map((note, index) => (
                <li key={index} className="px-4 py-2 border-b last:border-none hover:bg-gray-100">
                  {note.message}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-gray-500 text-center">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
