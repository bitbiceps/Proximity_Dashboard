import React, { useEffect, useState } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import Cookies from "js-cookie";
import { cookieAccessKeys, routes } from "../../utils";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../redux/slices/authSlice";
import { resetStateTopic } from "../../redux/slices/topicSlice"
import { useDispatch, useSelector } from "react-redux";
import { resetpState } from "../../redux/slices/articleSlice";
import { resetPaymentState } from "../../redux/slices/paymentSlice";
import { setMobileOpen } from "../../redux/slices/sidebarSlice";
import axios from "axios";
import { useCallback } from "react";
import { baseURL } from "../../axios/instance";
import { fetchTopics } from "../../redux/slices/topicSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const articles = useSelector((state) => state.articles || []);


  useEffect(() => {
    if(user?.user?._id)
    dispatch(fetchTopics(user?.user?._id))
    }, []);


  

  const logout = () => {
    Cookies.remove(cookieAccessKeys?.tokens?.accessToken);
    Cookies.remove(cookieAccessKeys.tokens.refreshToken);

    dispatch(resetState());
    dispatch(resetStateTopic());
    dispatch(resetpState())
    dispatch(resetPaymentState())
    navigate(routes.login, { replace: true });
  };

  useEffect(() => {
    dispatch(setMobileOpen(false))
  },[])

  return (
    <div className="relative h-screen w-fit shadow-custom">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block overflow-hidden">
        <DesktopSidebar logout={logout}  user={user} articles={articles} />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <MobileSidebar logout={logout} user={user} articles={articles}  />
      </div>
    </div>
  );
};

export default Sidebar;
