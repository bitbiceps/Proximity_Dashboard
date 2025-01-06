import React from "react";
import TruncatedText from "./TruncatedText";

export const TopicCard = ({
  image,
  head,
  content,
  status,
  onClick,
}) => {
  const isDisabled = status === "review" || status === "completed";

  return (
    <div
      onClick={isDisabled ? null : onClick} // Disable click if submitted or completed
      className={`py-[32px] px-[40px] ${
        status === "review"
          ? "py-[32px] px-[40px] cursor-not-allowed opacity-75 border-[1px] border-yellow-300 shadow-yellow-100 shadow-sm"
          : status === "completed"
          ? "py-[32px] px-[40px] cursor-not-allowed opacity-75 border-[1px] border-green-300 shadow-green-100 shadow-sm"
          : "bg-[#FFFFFF]"
      } w-[300px] rounded-[12px]`}
    >
      <div>
        <img src={image} alt="Article" className="w-full h-auto rounded-md" />
      </div>
      {/* <div className="mt-[14px] text-[20px] text-[#201446] leading-[26px] font-semibold text-center">
        {head}
      </div> */}
      <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-start">
        {/* <TruncatedText content={content} maxLength={100} /> */}
        {status === "review" && (
          <div className="text-yellow-500 font-medium mt-2 text-center">
            Under Review
          </div>
        )}
        {status === "completed" && (
          <div className="text-green-500 font-medium mt-2 text-center">
            Approved
          </div>
        )}
      </div>
    </div>
  );
};
