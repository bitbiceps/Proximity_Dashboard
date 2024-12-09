import React, { useState } from "react";

function PopupSearch() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    console.log("Submitted: ", inputValue);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
          I am looking for something like...
        </h2>
        <div className="flex flex-col space-y-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows="4"
            className="border border-dashed border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your query here"
          />
          <div className="flex justify-between items-center">
            <button className="text-blue-500">
              <i className="fas fa-microphone text-xl"></i>
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupSearch;
