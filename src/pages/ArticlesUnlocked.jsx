import React from "react";
import { ArticlesCard } from "../components/common/ArticlesCard";
import article from "../assets/article-image.png";
import RootLayout from "../layouts/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSelectedArticle } from "../redux/slices/articleSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";

const ArticlesUnlocked = () => {
  const articles = useSelector(({ articles: { articles } }) => articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, updatedArticles, registerUser } = useSelector(
    (state) => state.auth
  );
  console.log("unlocked", user.user, "uuuuuuu", updatedArticles);
  const final =
    updatedArticles?.articles?.articles?.length > 0
      ? updatedArticles.articles.articles
      : user?.user?.articles?.length > 0
      ? user?.user?.articles
      : articles;
  console.log("final", final);
  // const { specificArticle, articleVerify, articleUpdate, loading, error } =
  //   useSelector((state) => state.generated);
  // console.log("articles", specificArticle);
  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        {/* Articles Container */}
        <div className="w-full flex justify-center gap-[20px] relative z-[10]">
          {final.map((item, index) => (
            <ArticlesCard
              key={index}
              image={article}
              head={
                <>
                  <div>
                    Tech Pr Agency <br /> for startups
                  </div>
                </>
              }
              content={item.value}
              isSubmitted={item.submitted} // Pass submitted status
              onClick={() => {
                dispatch(setCurrentSelectedArticle(item));
                navigate(routes.topic_generator);
              }}
            />
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default ArticlesUnlocked;
