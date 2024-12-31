import React from "react";
import TruncatedText from "./TruncatedText";
import { useSelector } from "react-redux";
import { CiCircleCheck } from "react-icons/ci";
export const TopicCard = ({ image, head, content, status, onClick }) => {
  //   console.log("isssss",isSubmitted)
  return (
    <div
      onClick={status == "review" || status == "completed" ? null : onClick} // Disable click if submitted
      className={` bg-[#FFFFFF] w-[300px] rounded-[12px] ${
        status === "review"
          ? "py-[24px] px-[40px] cursor-not-allowed opacity-75 border-[1px] border-yellow-300 shadow-yellow-100 shadow-sm"
          : "py-[32px] px-[40px] cursor-pointer"
      }`}
    >
      <div>
        <img src={image} alt="Article" className="w-full h-auto rounded-md" />
      </div>
      <div className="mt-[14px] text-[20px] text-[#201446] leading-[26px] font-semibold text-center w-full">
        {head}
      </div>
      <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-start">
        <TruncatedText content={content} maxLength={100} />
        {status == "review" && (
          <div className="text-yellow-500 font-medium mt-2 text-center">
            Under Review
          </div>
        )}

        {status == "completed" && (
          <div className="text-green-500 font-medium mt-2 text-center flex justify-center items-center gap-2">
            <CiCircleCheck size={30} /> Completed
          </div>
        )}
      </div>
    </div>
  );
};
