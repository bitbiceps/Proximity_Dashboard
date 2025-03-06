import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Questionnair } from "../../pages/Questionnair";

export const Textanimation = () => {
  const user = useSelector((state) => state.auth);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuestionnaire(true);
    }, 1500); // Adjust delay to match animation

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShow(true);
  };

  return show ? (
    <>
      <Questionnair />
    </>
  ) : (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <motion.div className="bg-white flex flex-col justify-center items-center">
        {/* Animated Welcome Text */}
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            background: "linear-gradient(129.89deg, #02A6F2 -98%, #8A62F6 98%)",
            WebkitBackgroundClip: "text",
          }}
          className="text-4xl md:text-7xl font-bold text-center text-transparent"
        >
          Welcome {user?.user?.user?.fullName}
        </motion.h1>

        {/* Show the questionnaire content after animation */}
        {showQuestionnaire && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <p className="mt-4 font-normal text-base lg:text-xl xl:text-2xl text-neutral-500 max-w-lg text-center mx-auto">
              Let Us Know You Better <br />
              Fill a basic Questionnaire form!!
            </p>

            <button
              onClick={handleClick}
              className="px-[20px] py-[10px] mt-[30px] bg-neutral-500 hover:bg-neutral-900 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
