import React, { useEffect } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import Cookies from "js-cookie";
import { cookieAccessKeys, routes } from "../../utils";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../redux/slices/authSlice";

import { useDispatch } from "react-redux";
import { resetpState } from "../../redux/slices/articleSlice";
import { resetPaymentState } from "../../redux/slices/paymentSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove(cookieAccessKeys?.tokens?.accessToken);
    Cookies.remove(cookieAccessKeys.tokens.refreshToken);

    dispatch(resetState());
    dispatch(resetpState())
    dispatch(resetPaymentState())
    navigate(routes.login, { replace: true });
  };
  // useEffect(()=>{

  // },[dispatch])

  return (
    <div className="relative h-screen w-fit shadow-custom">
      {/* Desktop Sidebar */}
      <div className="hidden md:block overflow-hidden">
        <DesktopSidebar logout={logout} />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <MobileSidebar logout={logout} />
      </div>
    </div>
  );
};

export default Sidebar;
