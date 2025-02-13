import React from "react";
import { CiCircleChevDown } from "react-icons/ci";
import { FaUser, FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserAvatar = () => {
  const user = useSelector((state) => state?.auth?.user?.user);
  return (
    <div className="hidden sm:flex items-center justify-center w-fit h-fit gap-2">
      {user?.profileImage?.filepath ? (
        <img
          className="w-[50px] h-[50px] object-contain rounded-full"
          src={user?.profileImage?.filepath}
          alt="Avatar"
        />
      ) : (
        <div class="relative group">
          <FaUser className="size-6 group-hover:hidden" />
          <FaRegUser className="size-6 group-hover:block hidden" />
        </div>
      )}
      <div>
        {user.fullName && (
          <p className="text-[16px] font-semibold">
            {user.fullName.split(" ")[0]}
          </p>
        )}
      </div>
      <CiCircleChevDown className="text-xl text-app-grey-4 ml-2" />
    </div>
  );
};

export default UserAvatar;
