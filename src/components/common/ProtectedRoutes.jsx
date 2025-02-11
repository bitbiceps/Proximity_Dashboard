import React, { useState, useEffect, useCallback } from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { cookieAccessKeys, routes } from "../../utils";
import requests from "../../axios/instance";

const ProtectedRoute = ({ Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = Cookies.get(cookieAccessKeys?.tokens?.accessToken);

  const checkAuth = useCallback(async () => {
    try {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const res = await requests.checkAuth({ token });
      
      if (res.status === 401 || res.status === 404) {
        // If token is invalid or user is unauthorized, log out the user
        setIsAuthenticated(false);
        // Optionally, you can clear cookies here
        Cookies.remove(cookieAccessKeys?.tokens?.accessToken);
      } else {
        // Successfully authenticated
        setIsAuthenticated(true);
      }
    } catch (error) {
      // Handle errors like network failure or unexpected issues
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      // Clear invalid token if needed
      Cookies.remove(cookieAccessKeys?.tokens?.accessToken);
    }
  }, [token]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthenticated === null) {
    // Optionally show a loading spinner or keep the user waiting until authentication check is complete
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to={routes.login} />;
  }

  // Render the Component if authenticated
  return <Component {...rest} />;
};

export default ProtectedRoute;
