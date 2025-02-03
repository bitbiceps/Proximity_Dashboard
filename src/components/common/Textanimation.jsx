import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// const WavyText = ({ text, delay = 0, duration = 0.1, ...props }) => {
//   const letters = Array.from(text);

//   const container = {
//     hidden: {
//       opacity: 1,
//     },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: duration, delayChildren: delay },
//     },
//   };

//   const child = {
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//     hidden: {
//       opacity: 1,
//       y: 200,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <motion.h1
//       className="flex h-[150px] overflow-hidden font-mono text-[80px] font-bold"
//       variants={container}
//       initial="hidden"
//       animate="visible"
//       {...props}
//     >
//       {letters.map((letter, index) => (
//         <motion.span key={index} variants={child}>
//           {letter === " " ? "\u00A0" : letter}
//         </motion.span>
//       ))}
//     </motion.h1>
//   );
// };




export const Textanimation = () => {
    const user = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/primary-questionnaire');
    }
  return (
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
       
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-black to-neutral-400 bg-opacity-50">
            Welcome {user?.user?.user?.fullName}
            <br/>
          Let Us Know You Better
        </h1>
        <p className="mt-4 font-normal text-base lg:text-xl xl:text-2xl text-neutral-500 max-w-lg text-center mx-auto">
          Fill a basic Questionnaire form!!
        </p>
        {/* <button className='py-[10px] px-[20px] mt-[30px] rounded-[8px] text'>Quetionnaire</button> */}
        <button onClick={handleClick} className="px-[20px] py-[10px] mt-[30px] bg-neutral-500 hover:bg-neutral-900 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">Get Started</button>
      
      </motion.div>
    </div>
  );
};
