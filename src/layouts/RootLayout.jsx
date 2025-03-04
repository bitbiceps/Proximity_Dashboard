import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../axios/instance";
import { routes } from "../utils";
const RootLayout = ({ children }) => {
  const [userData, setUserData] = useState();

  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const pay = useSelector((state) => state.payment);
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

        setUserData(userDataToSend);
        // setUserData(userDataToSend);
        const primaryQuestions =
          userDataToSend?.questionnaire?.basicInformation;
        const questionsArray = Object.keys(primaryQuestions).map((key) => ({
          number: parseInt(key),
          ...primaryQuestions[key],
        }));
        const allQuestionsFilled =
          primaryQuestions[questionsArray.length].answer.trim().length > 0;
        if (!allQuestionsFilled) {
          navigate(routes.basicInformation, { replace: true });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // check again
  useEffect(() => {
    fetchUser(user?.user?.user?._id);
  }, []);
  const handleRoute = () => {
    navigate("/package");
  };

  return (
    <>
      <Header userData={userData} />
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
