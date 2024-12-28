import React from "react";

export const ArticlesCard = ({ image, head, content, articleStatus, onClick }) => {
  const isInReview = articleStatus === "review";

  return (
    <div
      onClick={!isInReview ? onClick : undefined} // Disable click if in review
      className={`py-[32px] px-[40px] ${
        isInReview ? "bg-yellow-300 cursor-not-allowed" : "bg-[#FFFFFF]"
      } w-[300px] rounded-[12px]`}
    >
      <div>
        <img src={image} alt="Article" className="w-full h-auto rounded-md" />
      </div>
      <div className={`mt-[14px] text-[20px] leading-[26px] font-semibold text-center ${
        isInReview ? "text-gray-700" : "text-[#201446]"
      }`}>
        {isInReview ? "In review" : "Generate Article"}
      </div>
      <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-start">
        {/* Placeholder for content or other elements */}
      </div>
    </div>
  );
};

