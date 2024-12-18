import React from "react";
import TruncatedText from "./TruncatedText";

export const ArticlesCard = ({ image, head, content }) => {
  return (
    <div className="py-[32px] px-[40px] bg-[#FFFFFF] w-[300px] rounded-[12px]">
      <div>
        <img src={image}></img>
      </div>
      <div className="mt-[14px] text-[20px] text-[#201446] leading-[26px] font-semibold text-center">
        {head}
      </div>
      <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-start">
        <TruncatedText content={content}/>
      </div>
    </div>
  );
};
