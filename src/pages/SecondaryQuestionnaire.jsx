import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import QuestionnaireLayout from "../layouts/QuestionnaireLayout";
import { MdKeyboardArrowRight } from "react-icons/md";
import { baseURL } from "../axios/instance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authSlice";
import leftArrow from "../assets/arows/left.png"


export const SecondaryQuestionnaire = () => {
  const user = useSelector((state) => state.auth.user);
  const questionnaire = user?.user?.questionnaire;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!questionnaire) {
    return (
      <QuestionnaireLayout>
        <div className="text-center text-xl font-semibold mt-10">
          Loading questionnaire...
        </div>
      </QuestionnaireLayout>
    );
  }

  const {
    expertiseAndSkills,
    challengesAndGaps,
    impactAndAchievements,
    industryContextAndInsights,
  } = questionnaire;

  const allQuestions = [
    {
      name: "Expertise And Skills",
      section: "expertiseAndSkills",
      questions: expertiseAndSkills,
    },
    {
      name: "Challenges And Gaps",
      section: "challengesAndGaps",
      questions: challengesAndGaps,
    },
    {
      name: "Impact And Achievements",
      section: "impactAndAchievements",
      questions: impactAndAchievements,
    },
    {
      name: "Industry Context And Insights",
      section: "industryContextAndInsights",
      questions: industryContextAndInsights,
    },
  ];

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    expertiseAndSkills: {},
    challengesAndGaps: {},
    impactAndAchievements: {},
    industryContextAndInsights: {},
  });
  const [questNumber, setQuestNumber] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(true); // Track the next button state

  const textareaRef = useRef(null); // Create a ref for the textarea

  const calculateQuestNumber = (sectionIndex, questionIndex) => {
    let totalQuestions = 0;
    for (let i = 0; i < sectionIndex; i++) {
      totalQuestions += Object.keys(allQuestions[i].questions).length;
    }
    return totalQuestions + questionIndex;
  };

  const currentSection = allQuestions[currentSectionIndex];
  const currentQuestionKey = Object.keys(currentSection.questions)[
    currentQuestionIndex
  ];
  const currentQuestion = currentSection.questions[currentQuestionKey];

  const isFirstQuestion =
    currentSectionIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion =
    currentSectionIndex === allQuestions.length - 1 &&
    currentQuestionIndex === Object.keys(currentSection.questions).length - 1;

  
  const setTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight, 10) || 20;
      const maxHeight = 5 * lineHeight; // Max height for 5 rows
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
    }
  }


  useEffect(() => {
    if (user?.user?.id) {
      const storedAnswers = localStorage.getItem(`ProximityDbSecQuesAns_${user.user.id}`);
      if (storedAnswers) {
        setAnswers(JSON.parse(storedAnswers));
      }
    }
  }, []);

  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      setTextareaHeight();
    }
  }, [currentQuestionIndex]); // Run this effect when the question index changes


  useEffect(() => {
    // Update isNextDisabled based on whether the current question has been answered
    setIsNextDisabled(
      !answers[currentSection.section]?.[currentQuestionKey]?.trim()
    );
  }, [answers, currentSection.section, currentQuestionKey]);

  const handleNext = () => {
    // answers[currentSection.section][currentQuestionKey]
    if (currentAnswer.length < 8) {
      toast.error("Please provide proper answers");
      return;
    }

    if (
      currentQuestionIndex <
      Object.keys(currentSection.questions).length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestNumber((prev) => prev + 1);
    } else if (currentSectionIndex < allQuestions.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      setQuestNumber((prev) =>
        calculateQuestNumber(currentSectionIndex + 1, 0)
      );
    }
    setAnimationKey((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setQuestNumber((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      const previousSectionQuestions = Object.keys(
        allQuestions[currentSectionIndex - 1].questions
      ).length;
      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentQuestionIndex(previousSectionQuestions - 1);
      setQuestNumber((prev) =>
        calculateQuestNumber(
          currentSectionIndex - 1,
          previousSectionQuestions - 1
        )
      );
    }
    setAnimationKey((prev) => prev + 1);
  };


  const handleAnswerChange = (e) => {
    const value = e.target.value;
    setAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [currentSection.section]: {
          ...prev[currentSection.section],
          [currentQuestionKey]: value,
        },
      };

      if (user?.user?.id) {
        localStorage.setItem(`ProximityDbSecQuesAns_${user.user.id}`, JSON.stringify(updatedAnswers));
      }
      return updatedAnswers;
    });
  };

  const handleTopicCreation = async (userId) => {
    const topicPayload = {
      numberOfArticles: 2,
      userId,
    };
    try {
      const topicResponse = await axios.post(
        `${baseURL}/topic/generate`,
        topicPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error generating topics:", error);
      toast.error(
        "An error occurred while generating topics. Please try again."
      );
    }
  };

  // Framer Motion animation variants
  const animationVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 50 },
    exit: { opacity: 0, y: -20 },
  };

  const currentAnswer = answers[currentSection.section]?.[currentQuestionKey];

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // Track submit status

  const handleSubmit = async () => {
    if (isSubmitDisabled) return; // Prevent multiple clicks

    setIsSubmitDisabled(true); // Disable submit button immediately

    const payload = {
      user: user?.user?._id,
      expertiseAndSkills: answers.expertiseAndSkills,
      challengesAndGaps: answers.challengesAndGaps,
      impactAndAchievements: answers.impactAndAchievements,
      industryContextAndInsights: answers.industryContextAndInsights,
    };

    try {
      const response = await axios.post(
        `${baseURL}/user/secondary-questionaire`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        await handleTopicCreation(user?.user?._id);
        navigate("/topic_unlocked", { replace: true });
      } else {
        setIsSubmitDisabled(false); // Re-enable button on failure
      }
    } catch (error) {
      setIsSubmitDisabled(false); // Re-enable button on failure
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (
  //       e.key === "Enter" &&
  //       !e.shiftKey &&
  //       !isNextDisabled && // This is now safe to access
  //       !isLastQuestion
  //     ) {
  //       if (isLastQuestion) {
  //         handleSubmit();
  //       } else {
  //         handleNext();
  //       }
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [isNextDisabled, isLastQuestion, answers[currentQuestion.number]]);
  



  const wordCount = () => {
    const answer =  (answers[currentSection.section]?.[currentQuestionKey] || "").trim()
    let totalWord = 0 ;
    if(answer){
         totalWord = answer.split(/\s+/).length;
    }
    return totalWord
  }

  return (
    <QuestionnaireLayout>
      <motion.div
        key={animationKey}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animationVariants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="mb-[40px] mt-[5px]"
      >
        <div className="lg:w-[70%] md:w-[70%] w-[90%] mx-auto flex flex-col justify-start  mt-[5px]">
        <div className="flex justify-start items-center text-[18px] lg:text-[28px] font-semibold text-[#8A62F6] mt-[30px]">
          {currentSection.name}
        </div>
        </div>

        <div className="flex flex-row lg:w-[70%] md:w-[70%] w-[90%] mx-auto mt-[74px]">
          <div className="flex justify-start items-start">
            <div className="flex flex-row gap-[1px] text-[#02A6F2] font-sans font-medium text-[20px] lg:text-[36px] items-center justify-center">
              {questNumber + 1}
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
            {!currentQuestion.mandatory && (
              <div className="mt-2 bg-orange-500 w-fit">
                <p className="text-sm">
                  * Please enter N/A if no relevant answer available
                </p>
              </div>
            )}
            <div className="mt-[54px]">
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="N/A"
                value={
                  answers[currentSection.section]?.[currentQuestionKey] || ""
                }
                onChange={handleAnswerChange}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  const maxHeight = 5 * parseInt(getComputedStyle(e.target).lineHeight); // Calculate max height for 5 rows
                  e.target.style.height = `${Math.min(e.target.scrollHeight, maxHeight)}px`;
                }}
                        
                className="flex w-full placeholder:text-[13px] lg:placeholder:text-[24px] placeholder:font-normal focus:outline-none text-[16px] lg:text-[24px] placeholder:text-gray-400 border-b-[1px] border-[#878787] pb-2"
              ></textarea>
              <div className="flex w-full justify-end text-bold text-gray-600 pe-2 italic text-xl">
                Count :   {wordCount()}
              </div>
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

                {currentQuestion.mandatory ? (
                  <button
                    onClick={isLastQuestion ? handleSubmit : handleNext}
                    disabled={
                      isNextDisabled || (isLastQuestion && isSubmitDisabled)
                    }
                    className={`py-[8px] px-[32px] rounded-[4px] text-white ${
                      isNextDisabled || (isLastQuestion && isSubmitDisabled)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#8A62F6]"
                    }`}
                  >
                    {isLastQuestion ? "Submit" : "Next"}
                  </button>
                ) : (
                  <button
                    onClick={isLastQuestion ? handleSubmit : handleNext}
                    className={`py-[8px] px-[32px] rounded-[4px] text-white bg-[#8A62F6]`}
                  >
                    {isLastQuestion ? "Submit" : "Next"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </QuestionnaireLayout>
  );
};
