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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const primaryQuestions = user?.user?.questionnaire?.basicInformation;

  const questionsArray = Object.keys(primaryQuestions).map((key) => ({
    number: parseInt(key),
    ...primaryQuestions[key],
  }));

  console.log(questionsArray)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animationKey, setAnimationKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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
    setAnswers(storedAnswers);
  }, []);

  const handleAnswerChange = (value) => {
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

    // Reset search query on selection
    setSearchQuery("");
  };

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

    if (currentQuestion.number === 2 && answers[1]) {
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
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8A62F6]"
                  />

                  {/* Filtered Options Below */}
                  <div className="sm:max-h-80 md:max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2 md:p-5 shadow-md">
                    {getFilteredOptions().length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {getFilteredOptions().map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleAnswerChange(option)}
                            className={`px-4 py-2 border rounded-md cursor-pointer text-sm md:text-lg transition duration-200 ${answers[currentQuestion.number] === option
                              ? "bg-[#8A62F6] text-white border-[#8A62F6] shadow-md"
                              : "border-gray-400 text-gray-700 hover:bg-gray-100"
                              }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm text-center">No results found</p>
                    )}
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
