import React from "react";
import { BrandHeader } from "../components/common/BrandHeader";


const QuestionnaireLayout = ({ children }) => {
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <BrandHeader/>
      <div className=" lg:p-4">{children}</div>
    </div>
  );
};

export default QuestionnaireLayout;
