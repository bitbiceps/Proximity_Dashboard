import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../axios/instance";

export const ArticlesCard = ({
  image,
  head,
  content,
  articleStatus,
  onClick,
  data,
}) => {
  const [articleImage, setArticleImage] = useState();
  const isDisabled =
    articleStatus === "review" || articleStatus === "completed";
  const fetchArticle = async () => {
    try {
      const response = await axios.post(`${baseURL}/article/get`, {
        articleId: data.articleId,
      });

      if (
        response.data.article.profileImage &&
        response.data.article.profileImage.filepath
      ) {
        setArticleImage(response.data.article.profileImage.filepath);
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);
  return (
    <div
      onClick={isDisabled ? null : onClick} // Disable click if in review
      className={`py-[32px] px-[40px] ${
        articleStatus === "review"
          ? "py-[32px] px-[40px] cursor-not-allowed opacity-75 border-[1px] border-yellow-300 shadow-yellow-100 shadow-sm"
          : articleStatus === "completed"
          ? "py-[32px] px-[40px] cursor-not-allowed opacity-75 border-[1px] border-green-300 shadow-green-100 shadow-sm"
          : "bg-[#FFFFFF]"
      } w-[300px] rounded-[12px]`}
    >
      <div>
        <img
          src={articleImage ? articleImage : image}
          alt="Article"
          className="w-full h-[250px] object-cover rounded-md"
        />
      </div>
      <div
        className={`mt-[14px] ${
          articleStatus === "review"
            ? "text-yellow-500 font-medium mt-2 text-center"
            : articleStatus === "completed"
            ? "text-green-500 font-medium mt-2 text-center"
            : "text-[#201446]"
        }`}
      >
        {articleStatus === "review"
          ? "Under review"
          : articleStatus === "completed"
          ? "Approved"
          : ""}
      </div>
      <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-center capitalize">
        {/* Render the content if available */}
        {content || "No content available"}
      </div>
    </div>
  );
};
