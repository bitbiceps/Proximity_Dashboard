import React from "react";
import RootLayout from "../layouts/RootLayout";

export const TextGenerating = () => {
 
  return (
    // <RootLayout>
    
       
        <div className="w-[90%] lg:w-[75%] mx-auto  ">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Generating Article .....
          </h2>
          <p className="text-gray-700 text-justify space-y-2 leading-relaxed mb-6">
            <div className=" ml-10 h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-[40%] h-6 bg-gray-400 rounded-full"></div>
            <div className="ml-10 h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-[80%] h-6 bg-gray-400 rounded-full"></div>
            <div className="ml-10 h-6 bg-gray-400 rounded-full"></div>
            <div className="w-full h-6 bg-gray-400 rounded-full"></div>
            <div className="w-[10%] h-6 bg-gray-400 rounded-full"></div>
           
          </p>

          

          <div className="flex justify-center space-x-4">
            <button
              disabled={true}
              className="px-8 py-2 text-gray-400 border border-gray-400 rounded-lg "
            >
              Update
            </button>
            <button
              disabled={true}
              // onClick={handleVerify}
              className="px-8 py-2 text-white bg-gray-400 rounded-lg "
            >
              Verify
            </button>
            
          </div>
        </div>
   
    //  </RootLayout>
  );
};


