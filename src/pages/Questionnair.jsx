

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import QuestionnaireLayout from "../layouts/QuestionnaireLayout";
import { MdKeyboardArrowRight } from "react-icons/md"; 
import { baseURL } from "../axios/instance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Textanimation } from "../components/common/Textanimation";

export const Questionnair = () => {
 
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);
  const primaryQuestions = user?.user?.questionnaire?.basicInformation;
  

  // Convert `primary` questions into an array of objects with a number
  const questionsArray = Object.keys(primaryQuestions).map((key) => ({
    number: parseInt(key),
    ...primaryQuestions[key],
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animationKey, setAnimationKey] = useState(0);

  const currentQuestion = questionsArray[currentQuestionIndex];

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionsArray.length - 1;

  const textareaRef = useRef(null); // Create a ref for the textarea

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus(); // Focus the textarea when the component mounts or updates
    }
  }, [currentQuestionIndex]); // Run this effect when the question index changes

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnimationKey((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnimationKey((prev) => prev + 1);
    }
  };

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.number]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      user: user.user._id, // Add the user ID to the payload
      ...answers, // Include the answers from the state
    };
    console.log("Payload being sent: ", JSON.stringify(payload));
    
    try {
      // Directly send the payload as the request body
      const response = await axios.post(
        `${baseURL}/user/primary-questionaire`, 
        payload, // No need to wrap it in { body: ... }
        {
          headers: {
            "Content-Type": "application/json", // Ensure content type is JSON
          },
        }
      );
  
      console.log("Response:", response.data);
  
      if (response.status === 200) {
       
        navigate("/", {
          replace: true,
          
        });
      } else {
        alert("Error submitting the questionnaire: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the questionnaire. Please try again.");
    }
  };
  const isNextDisabled =
    !answers[currentQuestion.number] || answers[currentQuestion.number].trim() === "";

  // handling the enter key 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey && !isNextDisabled) {
        e.preventDefault(); // Prevent newline in textarea
        if (isLastQuestion) {
          handleSubmit();
        } else {
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
   
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNextDisabled, isLastQuestion, answers[currentQuestion.number]]);
   // end 
  

  // Framer Motion animation variants
  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <QuestionnaireLayout>
      <motion.div
        key={animationKey} // Change key to re-trigger animations
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animationVariants}
        transition={{ duration: 1, ease: "easeInOut" }} // Adjust animation duration
         className="my-[40px]"
      >
      <div className="lg:w-[40%] md:w-[50%] w-[80%] lg:h-[20vh] h-[40vh] bg-[#D9D9D9] mx-auto lg:mt-[50px] mt-[50px]">
       
      </div>
      <div className="flex flex-row lg:w-[70%] md:w-[70%] w-[80%] mx-auto mt-[74px]">
        <div className="flex justify-start items-start">
          <div className="flex flex-row gap-[1px] text-[#02A6F2] font-sans font-medium  text-[20px] lg:text-[36px] items-center justify-center">
          {currentQuestion.number}. 
            <span className="ml-[-5px]">
              <MdKeyboardArrowRight />
            </span>
            <span className="ml-[-20px]">
              <MdKeyboardArrowRight />
            </span>
          </div>
        </div>
        <div className="w-full ml-[10px] lg:ml-[46px]">
          <div className="text-[18px] lg:text-[32px] text-[#201446] font-medium">
          {currentQuestion.question}
          </div>
          <div className="mt-[54px]">
            <textarea
             ref={textareaRef}
              rows={1}
              placeholder="Type your answer here..."
              value={answers[currentQuestion.number] || ""}
              onChange={handleAnswerChange}
              className="flex w-full  placeholder:text-[13px] lg:placeholder:text-[24px] placeholder:font-normal focus:outline-none text-[16px] lg:text-[24px] placeholder:text-gray-400 border-b-[1px] border-[#878787] pb-2"
            ></textarea>
            <div className="flex flex-row gap-[32px] mt-[77px]">
            <button
                onClick={handleBack}
                disabled={isFirstQuestion}
                className={`py-[6px] px-[30px] border-[1px] rounded-[4px] ${
                  isFirstQuestion
                    ? "border-gray-400 text-gray-400 cursor-not-allowed"
                    : "border-[#8A62F6] text-[#8A62F6]"
                }`}
              >
                Back
              </button>
              <button
                onClick={ isLastQuestion ? handleSubmit : handleNext}
                disabled={isNextDisabled}
                className={`py-[8px] px-[32px] rounded-[4px] text-white ${
                  isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#8A62F6]"
                }`}
              >
                {isLastQuestion ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </QuestionnaireLayout>
  );
};







// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { motion } from "framer-motion";
// import QuestionnaireLayout from "../layouts/QuestionnaireLayout";
// import { MdKeyboardArrowRight } from "react-icons/md";

// export const Questionnair = () => {
//   const user = useSelector((state) => state.auth.user);
//   const questionnaire = user?.user?.questionnaire;

//   if (!questionnaire) {
//     return (
//       <QuestionnaireLayout>
//         <div className="text-center text-xl font-semibold mt-10">
//           Loading questionnaire...
//         </div>
//       </QuestionnaireLayout>
//     );
//   }

//   const { primary, optional, advanced } = questionnaire;
//   const allQuestions = [
//     { section: "Primary", questions: primary },
//     { section: "Optional", questions: optional },
//     // { section: "Advanced", questions: advanced },
//   ];

//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   // Track user answers
//   const [answers, setAnswers] = useState({});
//   const [questNumber, setQuestNumber] = useState(0);
//   const [animationKey, setAnimationKey] = useState(0); // Used for triggering re-animation

//   const calculateQuestNumber = (sectionIndex, questionIndex) => {
//     let totalQuestions = 0;
//     for (let i = 0; i < sectionIndex; i++) {
//       totalQuestions += Object.keys(allQuestions[i].questions).length;
//     }
//     return totalQuestions + questionIndex;
//   };

//   const currentSection = allQuestions[currentSectionIndex];
//   const currentQuestionKey = Object.keys(currentSection.questions)[currentQuestionIndex];
//   const currentQuestion = currentSection.questions[currentQuestionKey];

//   const isFirstQuestion = currentSectionIndex === 0 && currentQuestionIndex === 0;
//   const isLastQuestion =
//     currentSectionIndex === allQuestions.length - 1 &&
//     currentQuestionIndex === Object.keys(currentSection.questions).length - 1;

//   const handleNext = () => {
//     if (currentQuestionIndex < Object.keys(currentSection.questions).length - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//       setQuestNumber((prev) => prev + 1);
//     } else if (currentSectionIndex < allQuestions.length - 1) {
//       setCurrentSectionIndex((prev) => prev + 1);
//       setCurrentQuestionIndex(0);
//       setQuestNumber((prev) =>
//         calculateQuestNumber(currentSectionIndex + 1, 0)
//       );
//     }
//     setAnimationKey((prev) => prev + 1); // Trigger re-animation
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prev) => prev - 1);
//       setQuestNumber((prev) => prev - 1);
//     } else if (currentSectionIndex > 0) {
//       const previousSectionQuestions =
//         Object.keys(allQuestions[currentSectionIndex - 1].questions).length;
//       setCurrentSectionIndex((prev) => prev - 1);
//       setCurrentQuestionIndex(previousSectionQuestions - 1);
//       setQuestNumber((prev) =>
//         calculateQuestNumber(currentSectionIndex - 1, previousSectionQuestions - 1)
//       );
//     }
//     setAnimationKey((prev) => prev + 1); // Trigger re-animation
//   };

//   const handleAnswerChange = (e) => {
//     const value = e.target.value;
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestionKey]: value,
//     }));
//   };

//   const isNextDisabled =
//     currentSection.section === "Primary" &&
//     (!answers[currentQuestionKey] || answers[currentQuestionKey].trim() === "");

//   // Framer Motion animation variants
//   const animationVariants = {
//     hidden: { opacity: 0, y: 20 }, // Start off below with 0 opacity
//     visible: { opacity: 1, y: 0 }, // Animate to full opacity and position
//     exit: { opacity: 0, y: -20 }, // Exit above with 0 opacity
//   };


//   return (
//     <QuestionnaireLayout>
//       <motion.div
//         key={animationKey} // Change key to re-trigger animations
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         variants={animationVariants}
//         transition={{ duration: 1, ease: "easeInOut" }} // Adjust animation duration
//         className=""
//       >
//       <div className="lg:w-[40%] md:w-[50%] w-[80%] lg:h-[20vh] h-[40vh] bg-[#D9D9D9] mx-auto lg:mt-[50px] mt-[50px]">
       
//       </div>
//       <div className="flex flex-row lg:w-[70%] md:w-[70%] w-[80%] mx-auto mt-[74px]">
//         <div className="flex justify-start items-start">
//           <div className="flex flex-row gap-[1px] text-[#02A6F2] font-sans font-medium text-[36px] items-center justify-center">
//             {questNumber + 1}
//             <span className="ml-[-5px]">
//               <MdKeyboardArrowRight />
//             </span>
//             <span className="ml-[-20px]">
//               <MdKeyboardArrowRight />
//             </span>
//           </div>
//         </div>
//         <div className="w-full ml-[46px]">
//           <div className="text-[32px] text-[#201446] font-medium">
//             {currentQuestion.question}
//           </div>
//           <div className="mt-[54px]">
//             <textarea
//               rows={1}
//               placeholder="Type your answer here..."
//               value={answers[currentQuestionKey] || ""}
//               onChange={handleAnswerChange}
//               className="flex w-full placeholder:text-[24px] placeholder:font-normal focus:outline-none text-[24px] placeholder:text-gray-400 border-b-[1px] border-[#878787] pb-2"
//             ></textarea>
//             <div className="flex flex-row gap-[32px] mt-[77px]">
//               <button
//                 onClick={handleBack}
//                 disabled={isFirstQuestion}
//                 className={`py-[6px] px-[30px] border-[1px] rounded-[4px] ${
//                   isFirstQuestion
//                     ? "border-gray-400 text-gray-400 cursor-not-allowed"
//                     : "border-[#8A62F6] text-[#8A62F6]"
//                 }`}
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleNext}
//                 disabled={isNextDisabled}
//                 className={`py-[8px] px-[32px] rounded-[4px] text-white ${
//                   isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#8A62F6]"
//                 }`}
//               >
//                 {isLastQuestion ? "Submit" : "Next"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       </motion.div>
//     </QuestionnaireLayout>
//   );
// };
