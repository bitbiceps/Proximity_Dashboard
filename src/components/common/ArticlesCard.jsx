import React from "react";

export const ArticlesCard = ({ image, head, content, articleStatus, onClick }) => {
  const isInReview = articleStatus === "review";

  return (
    <div
      onClick={onClick} // Disable click if in review
      className={`py-[32px] px-[40px] ${
        isInReview ? "py-[32px] px-[40px] cursor-not-allowed opacity-75 border-[1px] border-yellow-300 shadow-yellow-100 shadow-sm" : "bg-[#FFFFFF]"
      } w-[300px] rounded-[12px]`}
    >
      <div>
        <img src={image} alt="Article" className="w-full h-auto rounded-md" />
      </div>
      <div className={`mt-[14px] ${
        isInReview ? "text-yellow-500 font-medium mt-2 text-center" : "text-[#201446]"
      }`}>
        {isInReview ? "Under review" : "Generate Article"}
      </div>
      <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-start">
        {/* Placeholder for content or other elements */}
      </div>
    </div>
  );
};

