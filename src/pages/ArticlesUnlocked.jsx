import React from "react";
import { ArticlesCard } from "../components/common/ArticlesCard";
import article from "../assets/article-image.png";
import RootLayout from "../layouts/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSelectedArticle } from "../redux/slices/articleSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";
import { generateArticles } from "../redux/slices/generatedSlice";
const ArticlesUnlocked = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    specificArticle,
    articleVerify,
    articleUpdate,
    loading,
    error,
    articleGenerate,
    allTopics,
  } = useSelector((state) => state.generated);

  //   //   useSelector((state) => state.generated);
  // const { user } = useSelector((state) => state.auth);
  // const {}

  // Filter topics based on the conditions
  const submittedTopics = allTopics?.data?.filter(
    (topic) => topic.status === "completed" && topic.finalTopic
  );
  // console.log("unlocked", user.user, "uuuuuuu", updatedArticles);
  // const final =
  //   updatedArticles?.articles?.articles?.length > 0
  //     ? updatedArticles.articles.articles
  //     : user?.user?.articles?.length > 0
  //     ? user?.user?.articles
  //     : articles;
  // console.log("final", final);
  // already commented
  // const { specificArticle, articleVerify, articleUpdate, loading, error } =
  //   useSelector((state) => state.generated);
  // console.log("articles", specificArticle);
  console.log("dfgh", submittedTopics, allTopics);
  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        {submittedTopics?.length > 0 ? (
          /* Render Articles Cards */
          <div className=" w-full flex gap-[20px] relative z-[10] flex-wrap  px-8 md:px-0">
            {submittedTopics.map((item, index) => (
              <ArticlesCard
                key={index}
                image={article}
                head={item.finalTopic}
                content={item.finalTopic} // Assuming finalTopic is the content as well
                articleStatus={item.articleStatus}
                onClick={() => {
                  const { _id, userId } = item;
                  dispatch(generateArticles({ _id, userId }));
                  navigate(routes.generated_article);
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
