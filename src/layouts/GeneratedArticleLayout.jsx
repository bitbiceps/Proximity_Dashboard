import React from "react";
import { BrandHeader } from "../components/common/BrandHeader";
import { useNavigate} from "react-router-dom";
import leftArrow from "../assets/arows/left.png"

const GeneratedArticleLayout = ({ children }) => {

  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate("/", { replace: true });
  }
  
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-full flex justify-between items-center">
        <BrandHeader />
        <div
          className="flex md:hidden  items-center gap-2 text-[16px] h-fit lg:text-[24px] text-gray-600 border border-gray-400 w-fit me-5 mt-5 pr-3 py-2 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={handleBackBtn}
        >
          <img className="w-8 h-8" src={leftArrow} />
          <div className="font-semibold">
            Back
          </div>
        </div>
      </div>

      <div className=" lg:p-4 bg-[#fcfeff]">{children}</div>
    </div>
  );
};

export default GeneratedArticleLayout;
