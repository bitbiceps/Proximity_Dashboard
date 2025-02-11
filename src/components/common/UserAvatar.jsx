import React from "react";
import { CiCircleChevDown } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserAvatar = () => {
  const user = useSelector((state) => state?.auth?.user?.user);
  console.log(user, "From Avatar");
  return (
    <div className="hidden sm:flex items-center justify-center w-fit h-fit gap-2">
      {/* {user?.profileImage?.filepath ? (
        <img
          className="w-[50px] h-[50px] object-contain rounded-full"
          src={user?.profileImage?.filepath}
          alt="Aatar"
        />
      ) : ( */}
        <FaUser />
      {/* // )} */}
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
