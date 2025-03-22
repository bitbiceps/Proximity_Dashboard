import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  setUser } from "../redux/slices/authSlice";
import lefBg from "../assets/bg-left.png";
import news from "../assets/news.png";
import Google from "../assets/google.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { cookieAccessKeys, routes } from "../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import requests from "../axios/instance";

function Login() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4660);

    return () => clearTimeout(timer);
  }, []);


  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]{2,}\.[a-z]{2,}$/i;


  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if(!trimmedEmail){
      toast.error("Please enter the email address");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if(!password.trim()){
      toast.error("Please enter the password");
      return;
    }

    try {
      const response = await requests.login({ email : email.toLowerCase(), password });
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(setUser(response.data));
        Cookies.set(
          cookieAccessKeys?.tokens?.accessToken,
          response.data.tokens[cookieAccessKeys?.tokens?.accessToken]
        );
        if(response.data.user.questionnaire.basicInformation[1].answer) {
          navigate("/",{replace:true})
          return
        }
        navigate(routes.basicInformation,{replace:true})
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full h-full max-w-none bg-white">
        <div className=" relative w-full md:w-1/2 h-1/2 md:h-full">
          <img
            src={lefBg}
            alt="Tablet in hand"
            className="w-full h-full object-cover"
          />
          <img
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            src={news}
          ></img>
        </div>

        <div className="flex flex-col w-full md:w-1/2 px-8 md:px-48 py-6 md:py-16 h-full justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            Unlock Your PR Potential
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sanaray12@gmail.com"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full border-b-2 border-gray-300 py-1 pr-10 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {!showPassword ? (
                    // Eye-off icon
                    <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                      <path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z" /></svg>
                  ) : (
                    // Eye icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"/>
                    </svg>
                  )}
                </button>
              </div>
              <Link to='/forgot-password'>
              <div className="text-blue-500 text-base hover:text-blue-800 cursor-pointer mt-2">Forgot Password ?</div>
              </Link>
            </div>
            
            <button
              type="submit"
              className={`mt-4 w-full bg-[#4D49F6] text-white py-[15px] rounded-full text-sm font-semibold shadow-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging In..." : "LOGIN"}
            </button>
          </form>

          <button className="mt-8 w-full flex items-center bg-gray-50 justify-center border py-2 rounded-md text-sm">
            <img src={Google} alt="Google" className="w-4 h-4 mr-2" />
            Login with Google
          </button>

          <p className="text-center text-xs text-gray-600 mt-6">
            New to Account?{" "}
            <Link to="/registration" className="underline font-bold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
