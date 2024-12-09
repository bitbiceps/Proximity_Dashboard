import React from "react";
import RootLayout from "../layouts/RootLayout";

const QuestionnaireForm = () => {
  return (
    <RootLayout>
      <div className="flex justify-center items-start h-screen overflow-hidden">
        <div className="w-full max-w-4xl mt-8 px-4">
          <h1 className="text-2xl font-bold text-center mb-8">
            Fill the Questionnaire
          </h1>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-4 mb-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent"
                />
              </div>
            </div>

            {Array.from({ length: 4 }, (_, index) => (
              <div className="mb-4" key={index}>
                <label
                  htmlFor={`field-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id={`field-${index}`}
                  placeholder="Enter your first name"
                  className="mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent"
                />
              </div>
            ))}

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-20 py-4 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </RootLayout>
  );
};

export default QuestionnaireForm;
