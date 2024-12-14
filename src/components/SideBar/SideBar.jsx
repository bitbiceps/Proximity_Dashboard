import React from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import Cookies from "js-cookie";
import { cookieAccessKeys, routes } from "../../utils";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove(cookieAccessKeys.tokens.accessToken);
    Cookies.remove(cookieAccessKeys.tokens.refreshToken);
    navigate(routes.login, { replace: true });
  };
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
