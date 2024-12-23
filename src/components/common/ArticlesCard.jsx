import React from "react";
import TruncatedText from "./TruncatedText";
import { useSelector } from "react-redux";
export const ArticlesCard = ({
  image,
  head,
  content,
  isSubmitted,
  onClick,
}) => {
  console.log("isssss",isSubmitted)
  return (
    <div
      onClick={
        !isSubmitted
          ? onClick
          : null
      } // Disable click if submitted
      className={`py-[32px] px-[40px] bg-[#FFFFFF] w-[300px] rounded-[12px] ${
        isSubmitted ? "cursor-not-allowed opacity-75" : "cursor-pointer"
      }`}
    >
      <div>
        <img src={image} alt="Article" className="w-full h-auto rounded-md" />
      </div>
      <div className="mt-[14px] text-[20px] text-[#201446] leading-[26px] font-semibold text-center">
        {head}
      </div>
      <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-start">
        <TruncatedText content={content} maxLength={100} />
        {
          ( isSubmitted && (
            <div className="text-green-500 font-medium mt-2 text-center">
              Verified
            </div>
          ))}
      </div>
    </div>
  );
};
