import React from "react";
import RootLayout from "../layouts/RootLayout";

const TitleSuggestions = () => {
  const titles = [
    "Lorem ipsum heading",
    "Lorem ipsum heading",
    "Lorem ipsum heading",
  ];

  return (
    <RootLayout>
    <div className="min-h-screen  flex flex-col items-center py-8">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <button className="text-orange-500 font-medium">Upload Photo</button>
      </div>
      <div className="w-full max-w-3xl p-6 ">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Generated Titles
        </h2>
        <div className="space-y-6 mt-8">
          {titles.map((title, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 border border-gray-300 rounded-lg"
            >
              <span className="text-gray-700 font-semibold">{title}</span>
              <div className="space-x-2">
                <button className="px-6 py-2 text-sm font-medium text-white bg-[#4D49F6] rounded-sm ">
                  Verify
                </button>
                <button className="px-4 py-2 text-sm font-medium  border border-[#00CDE2] rounded-sm ">
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 px-40 lg:mt-16">
          <button className="px-4 py-2  border border-[#00CDE2] rounded-lg hover:bg-blue-50">
            Have Another Suggestion
          </button>
          <button className="px-8 py-2 text-white bg-[#4D49F6] rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
    </RootLayout>
  );
};

export default TitleSuggestions;
