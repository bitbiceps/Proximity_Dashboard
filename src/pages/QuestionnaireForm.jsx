// import React, { useState } from "react";
// import RootLayout from "../layouts/RootLayout";
// import { toast } from "react-toastify";
// import requests from "../axios/instance";
// import { useDispatch, useSelector } from "react-redux";
// import { setArticles } from "../redux/slices/articleSlice";
// import { useNavigate } from "react-router-dom";
// import { routes } from "../utils";

// const QuestionnaireForm = () => {
//   const userId = useSelector(({ auth: { user } }) => user.userId); // Accessing userId from Redux state
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [answers, setAnswers] = useState(
//     Array(8)
//       .fill("")
//       .reduce((acc, _, index) => {
//         acc[`question${index + 1}`] = ""; // Generate keys like question1, question2, ...
//         return acc;
//       }, {})
//   );
//   const [loading, setLoading] = useState(false); // Add loading state
//   // Handle change in input fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAnswers((prevAnswers) => ({
//       ...prevAnswers,
//       [name]: value, // Dynamically update the state based on the question name
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Check if all answers are filled in
//     const allAnswered = Object.values(answers).every(
//       (answer) => answer.trim() !== ""
//     );

//     if (!allAnswered) {
//       toast.error("Please answer all the questions before submitting.");
//       return;
//     }
//     setLoading(true); 
//     // toast.loading("Fetching Articles");

//     try {
//       //new api that is questionair / topic from post man
//       const { data } = await requests.submitQuestionnaire({
//         ...answers,
//         userId,
//         numberOfArticles: 2,
//       });
//       if (data) {
//         dispatch(setArticles(data?.articles));
//         toast.success(data?.message);
//         navigate(routes.articles_unlocked, { replace: true });
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally{
//       setLoading(false)
//     }
//   };

//   return (
//     <RootLayout>
//       <div className="p-6 max-w-4xl mx-auto relative">
//         <h1 className="font-bold text-center mb-8 text-xl">
//           Fill the Questionnaire
//         </h1>

//         <form onSubmit={handleSubmit}>
//           {[
//             "What industry do your contributions being talked about in this article cater/belong to?",
//             "What professional achievements have you secured while working on the subject matter of this article?",
//             "How have you been able to create impact at your workplace through your work in the capacity of a crucial member of your organization, by being involved and participating in the area of work that this particular article would cover?",
//             "What have been some of your biggest projects within or outside of an organization while being engaged in this particular arena?",
//             "What are some of your works or results thereof that can be measured in quantifiable terms (in the context of the subject matter at hand)? Also share the quantified figures.",
//             "What are some major challenges that you successfully overcame as part of your involvement in the concerned area of work, which in turn allowed you to achieve a great result?",
//             "Please enlist all of your published work within the context of the subject matter being covered in this article.",
//             "From the standpoint of an experienced professional in this particular arena/category of work, what are your original thoughts and insights in relevance to what you do/have done? You may also share your insights on the current or upcoming future trends and practices, and firsthand suggestions coming from having worked on major projects.",
//           ].map((question, index) => (
//             <div className="mb-8" key={`q${index + 1}`}>
//               <label className="block mb-2 text-lg">{`${
//                 index + 1
//               }. ${question}`}</label>
//               <input
//                 type="text"
//                 name={`question${index + 1}`}
//                 value={answers[`question${index + 1}`] || ""}
//                 onChange={handleChange}
//                 placeholder="Your answer"
//                 className="w-full p-3 border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           ))}

//           <div className="text-right">
//           <button
//               type="submit"
//               className={`bg-blue-500 text-white px-6 py-3 rounded-md text-sm cursor-pointer ${
//                 loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
//               }`}
//               disabled={loading} // Disable button when loading
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </RootLayout>
//   );
// };

// export default QuestionnaireForm;



import React, { useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { toast } from "react-toastify";
import requests from "../axios/instance";
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "../redux/slices/articleSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";

const QuestionnaireForm = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const userId = useSelector(({ auth: { user } }) => user.userId); // Accessing userId from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questions = [
    // topic questionare 
    "What professional achievements have you secured while working on the subject matter of this article? (List out your major achievements in a concise manner; for reference: scaling up the corporate or academic ladder, associating with major organizations/institutions of your field, etc.)",
    "How have you been able to create impact at your workplace through your work in the capacity of a crucial member of your organization, by being involved and participating in the area of work that this particular article would cover?(Enlist and describe impact of your work within the organization in terms of tangible metrics like cost savings, revenue increments, efficiency increments, etc. within the scope of this article’s content)",
    "What have been some of your biggest projects within or outside of an organization while being engaged in this particular arena? (Please enlist and describe in a concise manner) ",
    "What are some of your works or results thereof that can be measured in quantifiable terms (in the context of the subject matter at hand)? Also share the quantified figures.",
    "What are some major challenges that you successfully overcame as part of your involvement in the concerned area of work, which in turn allowed you to achieve a great result? (Even better if they hadn’t necessarily been tackled before you)",
    "Please enlist all of your published work within the context of the subject matter being covered in this article. (Research Papers, Scholarly articles, Media coverage, Blogs, etc.)",
    "From the standpoint of an experienced professional in this particular arena/category of work, what are your original thoughts and insights in relevance to what you do/have done? You may also share your insights on the current or upcoming future trends and practices, and firsthand suggestions coming from having worked on major projects.",
    // aritcle questionare 
    "What industry do your contributions being talked about in this article cater/belong to?",
    "What professional achievements have you secured while working on the subject matter of this article?",
    "How have you been able to create impact at your workplace through your work in the capacity of a crucial member of your organization, by being involved and participating in the area of work that this particular article would cover?",
    "What have been some of your biggest projects within or outside of an organization while being engaged in this particular arena?",
    "What are some of your works or results thereof that can be measured in quantifiable terms (in the context of the subject matter at hand)? Also share the quantified figures.",
    "What are some major challenges that you successfully overcame as part of your involvement in the concerned area of work, which in turn allowed you to achieve a great result?",
    "Please enlist all of your published work within the context of the subject matter being covered in this article.",
    "From the standpoint of an experienced professional in this particular arena/category of work, what are your original thoughts and insights in relevance to what you do/have done? You may also share your insights on the current or upcoming future trends and practices, and firsthand suggestions coming from having worked on major projects.",
  ];

  const [currentStep, setCurrentStep] = useState(0); // Current step index
  const [answers, setAnswers] = useState(
    Array(questions.length)
      .fill("")
      .reduce((acc, _, index) => {
        acc[`question${index + 1}`] = "";
        return acc;
      }, {})
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < Math.ceil(questions.length / 4) - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // When reaching the last step, hide the button for 2 seconds
      setIsButtonVisible(false);
      setTimeout(() => {
        setIsButtonVisible(true); // Show the button again after 2 seconds
      }, 2000);
    }
  };


  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allAnswered = Object.values(answers).every(
      (answer) => answer.trim() !== ""
    );

    if (!allAnswered) {
      toast.error("Please answer all the questions before submitting.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await requests.submitQuestionnaire({
        ...answers,
        userId,
        numberOfArticles: 2,
      });
      if (data) {
        dispatch(setArticles(data?.articles));
        toast.success(data?.message);
        navigate(routes.topic_unlocked, { replace: true });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = currentStep * 4;
  const endIndex = Math.min(startIndex + 4, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <RootLayout>
      <div className="p-6 max-w-4xl mx-auto relative">
        <h1 className="font-bold text-center mb-8 text-xl">
          Fill the Questionnaire
        </h1>

        <form onSubmit={handleSubmit}>
          {currentQuestions.map((question, index) => (
            <div className="mb-8" key={`q${startIndex + index + 1}`}>
              <label className="block mb-2 text-lg">{`${startIndex + index + 1
                }. ${question}`}</label>
              <input
                type="text"
                name={`question${startIndex + index + 1}`}
                value={answers[`question${startIndex + index + 1}`] || ""}
                onChange={handleChange}
                placeholder="Your answer"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="flex justify-between items-center">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 text-black px-6 py-3 rounded-md text-sm hover:bg-gray-400"
              >
                Previous
              </button>
            )}

            {currentStep < Math.ceil(questions.length / 4) - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-6 py-3 rounded-md text-sm hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <div>
                {isButtonVisible ? (
                  <button
                    type="submit"
                    className={`bg-green-500 text-white px-6 py-3 rounded-md text-sm ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                      }`}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                ) : (
                  <div className="w-full h-12 bg-gray-300 rounded-md animate-pulse"></div> // Placeholder for the hidden button
                )}

              </div>
            )}
          </div>
        </form>
      </div>
    </RootLayout>
  );
};

export default QuestionnaireForm;
