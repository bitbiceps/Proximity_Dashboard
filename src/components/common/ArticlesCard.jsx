import React from "react";

export const ArticlesCard = ({
  image,
  head,
  content,
  articleStatus,
  onClick,
}) => {
  return (
    <div
      onClick={articleStatus === "review" ? null : onClick} // Disable click if in review
      className={`py-[32px] px-[40px] ${
        articleStatus === "review"
          ? "cursor-not-allowed opacity-75 border-[1px] border-yellow-300 shadow-yellow-100 shadow-sm"
          : "bg-[#FFFFFF]"
      } w-[300px] rounded-[12px]`}
    >
      <div>
        <img src={image} alt="Article" className="w-full h-auto rounded-md" />
      </div>
      <div
        className={`mt-[14px] ${
          articleStatus === "review"
            ? "text-yellow-500 font-medium mt-2 text-center"
            : "text-[#201446]"
        }`}
      >
        {/* {articleStatus === "review" 
          ? "Under review" 
          : articleStatus === "completed" 
          ? "Completed" 
          : "Pending"} */}
      </div>
      <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-center capitalize">
        {/* Render the content if available */}
        {content || "No content available"}
      </div>
    </div>
  );
};
