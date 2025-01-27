import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../axios/instance";
const RootLayout = ({ children }) => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const pay = useSelector((state) => state.payment)
  // const [userData, setUserData] = useState();
  const fetchUser = async (userId) => {
    try {
      if (userId) {
        const response = await axios.get(
          `${baseURL}/user/details?user=${userId}`,
          {
            headers: {
              "Content-Type": "application/json", // Ensure content type is JSON
            },
          }
        );
        const userDataToSend = response.data.user;
        // setUserData(userDataToSend);
        const primaryQuestions = userDataToSend?.questionnaire?.basicInformation;
        console.log("klsdjflskdfsjlkfj ", primaryQuestions, userDataToSend, userDataToSend?.user?.user)
        const questionsArray = Object.keys(primaryQuestions).map((key) => ({
          number: parseInt(key),
          ...primaryQuestions[key],
        }));
        const allQuestionsFilled = primaryQuestions[questionsArray.length].answer.trim().length > 0
        console.log("lenght of primary question ", primaryQuestions[questionsArray.length].answer.trim().length, allQuestionsFilled)
        if (!allQuestionsFilled) {
          navigate("/primary-questionnaire", { replace: true });
        }
      }
      // console.log("userrrrrrrrrrrr from sidebarrrrrrrrrr", userDataToSend);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(user.user.user._id, "userrrrrrrrrrrrrrrrrfrommmmmmmmmmmmm")
  // check again 
  useEffect(() => {
    fetchUser(user?.user?.user?._id)
  }, [])
  const handleRoute = () => {
    navigate('/package');
  };
  console.log("user [ayment ", user?.user?.user?.paymentStatus)


  return (
    <>
      <Header />
      {user?.user?.user?.paymentStatus === true ? (
        <div className="bg-blue-50 lg:p-4">{children}</div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <button
            onClick={handleRoute}
            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Please complete the payment
          </button>
        </div>
      )}
    </>
  );
};

export default RootLayout;
