import React from "react";
import Header from "../components/common/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RootLayout = ({ children }) => {
  const userData = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const pay=useSelector((state)=>state.payment)
  const handleRoute = () => {
    navigate('/package');
  };

  return (
    <>
      <Header />
      {userData?.user?.user?.paymentStatus === true ? (
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
