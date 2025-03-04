import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Questionnair } from "../../pages/Questionnair";

export const Textanimation = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => {
    // navigate("/primary-questionnaire");
    setShow(true);
  };
  return show ? (
    <>
      <Questionnair />
    </>
  ) : (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <motion.div
        className="bg-white flex flex-col justify-center items-center"
        // initial={{ height: 0, width: "100vw" }}
        // animate={{ height: "100vh", width: "100vw" }}
        // transition={{
        //   duration: 3, // Animation duration in seconds
        //   ease: "easeInOut",
        // }}
      >
        <h1
          style={{
            background: "linear-gradient(129.89deg, #02A6F2 -98%, #8A62F6 98%)",
            WebkitBackgroundClip: "text",
          }}
          className="text-4xl md:text-7xl font-bold text-center text-transparent"
        >
          Welcome {user?.user?.user?.fullName}
          <br />
          Let Us Know You Better
        </h1>

        <p className="mt-4 font-normal text-base lg:text-xl xl:text-2xl text-neutral-500 max-w-lg text-center mx-auto">
          Fill a basic Questionnaire form!!
        </p>
        {/* <button className='py-[10px] px-[20px] mt-[30px] rounded-[8px] text'>Quetionnaire</button> */}
        <button
          onClick={handleClick}
          className="px-[20px] py-[10px] mt-[30px] bg-neutral-500 hover:bg-neutral-900 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};
