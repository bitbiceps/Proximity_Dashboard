import React from "react";
import { IoIosNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const Notifications = () => {
  const notification = useSelector(
    (state) => state.notifications.notifications
  );
  console.log(notification);

  return (
    <div className="relative inline-block">
      <div className="relative group cursor-pointer ">
        <IoIosNotifications className="size-9 group-hover:hidden" />
        <IoMdNotificationsOutline className="size-9 group-hover:block hidden" />
      </div>

      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
        {notification.length || 0}
      </div>
    </div>
  );
};

export default Notifications;
