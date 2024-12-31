import React, { useCallback, useMemo } from "react";
import { ArticlesCard } from "../components/common/ArticlesCard";
import article from "../assets/article-image.png";
import RootLayout from "../layouts/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";
import { generateArticles } from "../redux/slices/generatedSlice";

const ArticlesUnlocked = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructuring the required state values directly from useSelector
  const { allTopics } = useSelector((state) => state.generated);

  // Filter topics based on the conditions
  const submittedTopics = allTopics?.data?.filter(
    (topic) => topic.status === "completed" && topic.finalTopic
  );

  // Early return if no topics are available
  if (!submittedTopics?.length) {
    return (
      <RootLayout>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No Articles Available
            </h2>
            <p className="text-gray-600">
              It seems like your topics are not yet verified. Please verify your
              topics to unlock articles.
            </p>
          </div>
        </div>
      </RootLayout>
    );
  }

  // Render Articles Cards
  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div className="w-full flex gap-[20px] relative z-[10]">
          {submittedTopics.map((item) => (
            <ArticlesCard
              key={item._id} // Use unique _id as the key for better performance
              image={article}
              head={item.finalTopic}
              content={item.finalTopic} // Assuming finalTopic is the content as well
              articleStatus={item.articleStatus}
              onClick={() => handleCardClick(item._id)} // Use memoized handler
            />
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default ArticlesUnlocked;
