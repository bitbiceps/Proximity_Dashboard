import React , {useEffect, useState } from "react";
import { ArticlesCard } from "../components/common/ArticlesCard";
import article from "../assets/article-image.png";
import RootLayout from "../layouts/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSelectedArticle } from "../redux/slices/articleSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";
const ArticlesUnlocked = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    // specificArticle,
    // articleVerify,
    // articleUpdate,
    // loading,
    // error,
    // articleGenerate,
    allTopics,
  } = useSelector((state) => state.generated);

  // Filter topics based on the conditions
  const submittedTopics = allTopics?.data?.filter(
    (topic) => topic.status === "completed" && topic.finalTopic
  );

  // Effect to reload page when switching tabs
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          window.location.reload();
          // navigate("/articles_unlocked")
        }
      };
  
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);
  return (
    <RootLayout>
      
      <div className="min-h-[calc(100vh-150px)] bg-gray-100 flex flex-col items-center py-8">
        {submittedTopics?.length > 0 ? (
          /* Render Articles Cards */
          <div className=" w-full flex gap-[20px] relative z-[10] flex-wrap  px-8 md:px-0">
            {submittedTopics.map((item, index) => (
              <ArticlesCard
                key={index}
                image={article}
                data={item}
                head={item.finalTopic}
                content={item.finalTopic} // Assuming finalTopic is the content as well
                articleStatus={item.articleStatus}
                onClick={() => {
                  const { _id, userId } = item;
                  const url = `${routes.generated_article}?id=${_id}`;
                  // dispatch(generateArticles({ _id, userId }));
                  window.open(url, "_blank"); // Opens in a new tab
                }}
              />
            
            ))}
            
          </div>
        ) : (
          /* Interactive Message */
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No Articles Available
            </h2>
            <p className="text-gray-600">
              It seems like your topics are not yet verified. Please verify your
              topics to unlock articles.
            </p>
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default ArticlesUnlocked;
