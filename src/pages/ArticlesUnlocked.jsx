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

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        {/* Articles Container */}
        <div className="w-full flex justify-center gap-[20px] relative z-[10]">
          {articles.map((item, index) => (
            <div
              onClick={() => {
                dispatch(setCurrentSelectedArticle(item));
                navigate(routes.topic_generator);
              }}
              className="cursor-pointer"
            >
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
              />
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default ArticlesUnlocked;
