import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import QuestionnaireLayout from "../layouts/QuestionnaireLayout";
import { MdKeyboardArrowRight } from "react-icons/md";
import { baseURL } from "../axios/instance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Textanimation } from "../components/common/Textanimation";
import { fetchUserData } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { industryJobRoles } from "../utils";

export const Questionnair = () => {

  const optionsContainerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const primaryQuestions = user?.user?.questionnaire?.basicInformation;

  const questionsArray = Object.keys(primaryQuestions).map((key) => ({
    number: parseInt(key),
    ...primaryQuestions[key],
  }));


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animationKey, setAnimationKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [firstOthersSelected , setFirstOthersSelected] = useState(false);
  const [otherIndustry , setOtherIndustry] = useState("");

  const [othersJobProfile , setOthersJobProfile] = useState("");
  const [othersSelected , setOthersSelected] = useState(false);
  const currentQuestion = questionsArray[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questionsArray.length - 1;

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    const storedAnswers = JSON.parse(
      localStorage.getItem(`PrimaryQuestionaireAnswers${user.user.id}`)
    ) || {};
  
    if (storedAnswers[2]) {
      const secondAnswer = storedAnswers[2];
      const firstAnswer = storedAnswers[1];

      const isIndustryValid = Object.keys(industryJobRoles).some((industry) =>
        industry.toLowerCase() === firstAnswer.toLowerCase()
      );
      const isRoleValid = industryJobRoles[firstAnswer]?.some(
        (role) => role.toLowerCase() === secondAnswer.toLowerCase()
      );

      if(!isIndustryValid){
         setFirstOthersSelected(true)
         setOtherIndustry(firstAnswer);
      }
  
      if (!isRoleValid) {
        setOthersSelected(true);
        setOthersJobProfile(secondAnswer);
      }
    }
    setAnswers(storedAnswers);
  }, []);
  
  const scrollToTop = () => {
    if (optionsContainerRef.current) {
      optionsContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const handleOthersSelect = () => {
    if(currentQuestionIndex == 0) {
      handleAnswerChange("");
      setOtherIndustry("")
      if(!firstOthersSelected){
        scrollToTop();
      }
      setFirstOthersSelected(!firstOthersSelected);
      return ;
    }
    handleAnswerChange("");
    setOthersJobProfile("");
    if(!othersSelected){
      scrollToTop();
    }
    setOthersSelected(!othersSelected);
  }

  const handleAnswerChange = (value) => {
    if(currentQuestionIndex === 1 && othersSelected){
      setOthersSelected(false);
    }
    if(currentQuestionIndex === 0 && firstOthersSelected){
      setFirstOthersSelected(false);
    }

    if(!othersSelected && currentQuestionIndex === 1){
      scrollToTop();
    } else if(!firstOthersSelected && currentQuestionIndex === 0){
      scrollToTop();
    }
    setAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [currentQuestion.number]: value,
      };

      // Reset job role if industry changes
      if (currentQuestion.number === 1) {
        updatedAnswers[2] = "";
        setOthersJobProfile("");
        setOthersSelected(false);
      }

      localStorage.setItem(
        `PrimaryQuestionaireAnswers${user.user.id}`,
        JSON.stringify(updatedAnswers)
      );
      return updatedAnswers;
    });

    // Reset search query on selection
    setSearchQuery("");
  };

  const handleOhersJobProfileChange = (e) => {
    const value = e.target.value ;
    setOthersJobProfile(value);
    setAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [currentQuestion.number]: value,
      };

      // Reset job role if industry changes
      if (currentQuestion.number === 1) {
        updatedAnswers[2] = "";
      }
      localStorage.setItem(
        `PrimaryQuestionaireAnswers${user.user.id}`,
        JSON.stringify(updatedAnswers)
      );
      return updatedAnswers;
    });
  }

  const handleOtherIndustryChange = (e) => {
    const value = e.target.value ;
    setOtherIndustry(value);
    setAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [currentQuestion.number]: value,
      };
      // Reset job role if industry changes
      if (currentQuestion.number === 1) {
        updatedAnswers[2] = "";
        setOthersSelected(false);
        setOthersJobProfile("")
      }
      localStorage.setItem(
        `PrimaryQuestionaireAnswers${user.user.id}`,
        JSON.stringify(updatedAnswers)
      );
      return updatedAnswers;
    });
  }

  const handleNext = () => {
    const currentAnswer = answers[currentQuestion.number];
    if (currentAnswer.length < 3) {
      toast.error("Please provide a proper answer");
      return;
    }
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnimationKey((prev) => prev + 1);
      setSearchQuery("");
    }
  };

  const handleBack = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnimationKey((prev) => prev + 1);
      setSearchQuery("");
    }
  };

  const handleSubmit = async () => {
    const payload = {
      user: user.user.id,
      ...answers,
    };

    try {
      const response = await axios.post(
        `${baseURL}/user/primary-questionaire`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(fetchUserData(user.user.id));
        navigate("/", { replace: true });
      } else {
        alert("Error submitting the questionnaire: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the questionnaire.");
    }
  };

  const isNextDisabled =
    !answers[currentQuestion.number] || answers[currentQuestion.number].trim() === "";

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

    // Framer Motion animation variants

  const animationVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 50 },
    exit: { opacity: 0, y: -20 },
  };

  // Get filtered options based on searchQuery
  const getFilteredOptions = () => {
    if (currentQuestion.number === 1) {
      return Object.keys(industryJobRoles).filter((industry) =>
        industry.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if(currentQuestion.number === 2 && firstOthersSelected){
      const allJobTitles = Object.values(industryJobRoles).flatMap((roles) => roles).filter((role) => role.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
      return allJobTitles ;
    }else if (currentQuestion.number === 2 && answers[1]) {
      return industryJobRoles[answers[1]]?.filter((role) =>
        role.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
    }

    return currentQuestion.options.filter((option) =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <QuestionnaireLayout>
      <motion.div
        key={animationKey}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animationVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="my-[5px] md:my-[40px]"
      >
        <div className="flex flex-row lg:w-[70%] md:w-[70%] w-[90%] mx-auto mt-[20px] md:mt-[74px]">
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
              {currentQuestion.questionType === "input" ? (
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion.number] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="flex w-full placeholder:text-[13px] lg:placeholder:text-[24px] placeholder:font-normal focus:outline-none text-[16px] lg:text-[24px] placeholder:text-gray-400 border-b-[1px] border-[#878787] pb-2"
                />
              ) : (
                <>
                  {/* Search Input at the Top */}
                  {
                    (othersSelected && currentQuestionIndex == 1) || (firstOthersSelected && currentQuestionIndex == 0) ?  <input
                    type="text"
                    placeholder={currentQuestionIndex === 1 ? "Type your job profile" :  "Type your industry"}
                    value={currentQuestionIndex  == 1 ?  othersJobProfile : otherIndustry}
                    onChange={currentQuestionIndex ==1 ? handleOhersJobProfileChange : handleOtherIndustryChange}
                    className="w-full border border-gray-300 rounded-md p-3 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A62F6]"
                  /> :  <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-3 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A62F6]"
                />
                  }

                    {/* {
                      ((othersSelected && currentQuestionIndex === 1) ||
                        (firstOthersSelected && currentQuestionIndex === 0)) ? (
                        <div className="mt-2 mb-6">
                          <div className="bg-[#8A62F6] w-fit p-2 text-white rounded-md text-sm md:text-lg border-[#8A62F6]  shadow-md">
                            Others
                          </div>
                        </div>
                      ) : (
                        
                           answers[currentQuestion.number] ? <div className="mt-2 mb-6 bg-[#8A62F6] w-fit p-2 text-sm md:text-lg text-white rounded-md border-[#8A62F6] shadow-md">
                           {answers[currentQuestion.number]}
                         </div> : null
                        
                      )
                    } */}

                    <div
                      className="sm:max-h-80 md:max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2 md:p-5 shadow-md">
                      <div
                        ref={optionsContainerRef}
                        className="flex flex-wrap gap-2">
                        {(answers[currentQuestion.number] || (currentQuestionIndex === 1 && othersSelected) || (currentQuestionIndex == 0 && firstOthersSelected)) && (
                          <div
                            className="px-4 py-2  text-white  shadow-md cursor-pointer bg-green-700 rounded-md text-sm md:text-lg"
                            onClick={othersSelected || firstOthersSelected ? handleOthersSelect : () => handleAnswerChange("")}
                          >
                            {
                              (currentQuestionIndex === 0 && firstOthersSelected) ||
                                (currentQuestionIndex === 1 && othersSelected)
                                ? "Others"
                                : answers[currentQuestion.number]
                            }
                          </div>
                        )}
                        {getFilteredOptions()
                          .filter((option) => option !== answers[currentQuestion.number]) // Avoid re-rendering selected options
                          .map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handleAnswerChange(option)}
                              className={`px-4 py-2 border rounded-md hover:bg-[#8A62F6] hover:text-white cursor-pointer text-sm md:text-lg transition duration-200`}
                            >
                              {option}
                            </div>
                          ))}
                        {(currentQuestionIndex === 0 && !firstOthersSelected) || (currentQuestionIndex === 1 && !othersSelected) ? (
                          <div
                            onClick={handleOthersSelect}
                            className="px-4 py-2 border hover:bg-[#8A62F6] hover:text-white rounded-md cursor-pointer text-sm md:text-lg transition duration-200 border-gray-400"
                          >
                            Others
                          </div>
                        ) : null}
                      </div>
                    </div>
                </>

              )}

              <div className="flex flex-row gap-[32px] mt-[20px] md:mt-[77px]">
                <button onClick={handleBack} disabled={isFirstQuestion}
                  className={`py-[6px] px-[30px] border-[1px] rounded-[4px] ${isFirstQuestion
                      ? "border-gray-400 text-gray-400 cursor-not-allowed"
                      : "border-[#8A62F6] text-[#8A62F6]"
                    }`}

                >
                  Back
                </button>
                <button className={`py-[8px] px-[32px] rounded-[4px] text-white ${isNextDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#8A62F6]"
                  }`} onClick={isLastQuestion ? handleSubmit : handleNext} disabled={isNextDisabled}>
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
