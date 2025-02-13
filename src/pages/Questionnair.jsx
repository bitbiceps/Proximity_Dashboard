

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
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 50 },
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
        transition={{ duration: 0.5, ease: "easeInOut" }} // Adjust animation duration
         className="my-[40px]"
      >
      {/* <div className="lg:w-[40%] md:w-[50%] w-[80%] lg:h-[20vh] h-[40vh] bg-[#D9D9D9] mx-auto lg:mt-[50px] mt-[50px]">
       
      </div> */}
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
