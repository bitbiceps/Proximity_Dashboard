import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import requests from "../axios/instance";
import { routes } from "../utils";
import { BrandHeader } from "../components/common/BrandHeader";

const EmailVerification = () => {
  const [status, setStatus] = useState(""); // can be 'loading', 'success', or 'error'
  const { token } = useParams();
  const navigate = useNavigate();

  const handleTokenVerification = async () => {
    try {
      // Make sure token is valid before calling the API
      if (!token) {
        toast.error("Invalid token");
        return;
      }

      setStatus("loading"); // Set to loading when verification is triggered

      const response = await requests.verifyUserRegistration(token);

      // Check if response and data are valid
      if (response && response.data) {
        toast.success(response.data.message);
        setStatus("success");
      } else {
        toast.error("Unexpected response format");
        setStatus("error");
      }
    } catch (error) {
      // If error.response exists, use it; else fallback to a generic error message
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
      setStatus("error");
    }
  };

  const renderLoader = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center"
    >
      <svg
        className="animate-spin h-16 w-16 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"
        ></path>
      </svg>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="flex justify-center mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Verification Successful!
      </h1>
      <p className="text-gray-600 mb-6">
        Your account has been successfully verified. You can now proceed to
        explore our platform.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(routes.login)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Proceed
      </motion.button>
    </motion.div>
  );

  const renderError = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Verification Failed!
      </h1>
      <p className="text-gray-600 mb-6">
        There was an issue verifying your account. Please try again later.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(routes.login)}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </motion.button>
    </motion.div>
  );

  return (
    <div>
      <BrandHeader/>
    <div className="flex items-center justify-center min-h-[80vh]">
      {/* Button to manually trigger the verification */}
      {status === "" && (
      <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-lg md:text-2xl text-gray-700 text-center font-semibold mb-8"> Verify your email and start using Proximity seamlessly </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTokenVerification}
          className="bg-app-blue-1 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all"
        >
          Verify My Email
        </motion.button>
      </div>

      )}

      {/* Show the loader only after the user clicks the button and verification starts */}
      {status === "loading" && renderLoader()}

      {/* Show success message if the status is "success" */}
      {status === "success" && renderSuccess()}

      {/* Show error message if the status is "error" */}
      {status === "error" && renderError()}
    </div>
    </div>

  );
};

export default EmailVerification;
