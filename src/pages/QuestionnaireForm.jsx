import React, { useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { toast } from "react-toastify";
import requests from "../axios/instance";

const QuestionnaireForm = () => {
  const [answers, setAnswers] = useState(
    Array(8)
      .fill("")
      .reduce((acc, _, index) => {
        acc[`question${index + 1}`] = ""; // Generate keys like question1, question2, ...
        return acc;
      }, {})
  );

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value, // Dynamically update the state based on the question name
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all answers are filled in
    const allAnswered = Object.values(answers).every(
      (answer) => answer.trim() !== ""
    );

    if (!allAnswered) {
      toast.error("Please answer all the questions before submitting.");
      return;
    }

    try {
      const res = await requests.submitQuestionnaire({ ...answers });
    } catch (error) {}
  };

  return (
    <RootLayout>
      <div className="p-6 max-w-4xl mx-auto relative">
        <h1 className="font-bold text-center mb-8 text-xl">
          Fill the Questionnaire
        </h1>

        <form onSubmit={handleSubmit}>
          {[
            "What industry do your contributions being talked about in this article cater/belong to?",
            "What professional achievements have you secured while working on the subject matter of this article?",
            "How have you been able to create impact at your workplace through your work in the capacity of a crucial member of your organization, by being involved and participating in the area of work that this particular article would cover?",
            "What have been some of your biggest projects within or outside of an organization while being engaged in this particular arena?",
            "What are some of your works or results thereof that can be measured in quantifiable terms (in the context of the subject matter at hand)? Also share the quantified figures.",
            "What are some major challenges that you successfully overcame as part of your involvement in the concerned area of work, which in turn allowed you to achieve a great result?",
            "Please enlist all of your published work within the context of the subject matter being covered in this article.",
            "From the standpoint of an experienced professional in this particular arena/category of work, what are your original thoughts and insights in relevance to what you do/have done? You may also share your insights on the current or upcoming future trends and practices, and firsthand suggestions coming from having worked on major projects.",
          ].map((question, index) => (
            <div className="mb-8" key={`q${index + 1}`}>
              <label className="block mb-2 text-lg">{`${
                index + 1
              }. ${question}`}</label>
              <input
                type="text"
                name={`question${index + 1}`}
                value={answers[`question${index + 1}`] || ""}
                onChange={handleChange}
                placeholder="Your answer"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md text-sm cursor-pointer hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </RootLayout>
  );
};

export default QuestionnaireForm;
