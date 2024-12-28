// import React from "react";
// import { ArticlesCard } from "../components/common/ArticlesCard";
// import article from "../assets/article-image.png";
// import RootLayout from "../layouts/RootLayout";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentSelectedArticle } from "../redux/slices/articleSlice";
// import { useNavigate } from "react-router-dom";
// import { routes } from "../utils";

// const ArticlesUnlocked = () => {
//   const articles = useSelector(({ articles: { articles } }) => articles);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, loading, error, updatedArticles, registerUser } = useSelector(
//     (state) => state.auth
//   );
//   console.log("ussssssssssssssssss",user)
//   // const final =
//   //   updatedArticles?.articles?.articles?.length > 0
//   //     ? updatedArticles.articles.articles
//   //     : user?.user?.articles?.length > 0
//   //     ? user?.user?.articles
//   //     : articles;
//   // console.log("final", final);
//   // const { specificArticle, articleVerify, articleUpdate, loading, error } =
//   //   useSelector((state) => state.generated);
//   // console.log("articles", specificArticle);
//   return (
//     <RootLayout>
//       <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
//         {/* Articles Container */}
//         <div className="w-full flex justify-center gap-[20px] relative z-[10]">
//           {user.map((item, index) => (
//             <ArticlesCard
//               key={index}
//               image={article}
//               head={
//                 <>
//                   <div>
//                     Tech Pr Agency <br /> for startups
//                   </div>
//                 </>
//               }
//               content={item.value}
//               isSubmitted={item.submitted} // Pass submitted status
//               onClick={() => {
//                 dispatch(setCurrentSelectedArticle(item));
//                 navigate(routes.topic_generator);
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </RootLayout>
//   );
// };

// export default ArticlesUnlocked;
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
    (topic) => topic.status === "submitted" && topic.finalTopic
  );
  console.log("dfgh", submittedTopics, allTopics);
  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        {submittedTopics?.length > 0 ? (
          /* Render Articles Cards */
          <div className="  gap-[20px] relative z-[10]">
            {submittedTopics.map((item, index) => (
              <ArticlesCard
                key={index}
                image={article}
                head={item.finalTopic}
                content={item.finalTopic} // Assuming finalTopic is the content as well
                isSubmitted={true} // All rendered topics are submitted
                onClick={() => {
                  {
                    console.log("eeee", item._id);
                  }
                  dispatch(generateArticles(item._id));
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
            {/* <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
              onClick={() => navigate(routes.verify_topics)} // Navigate to topics verification page
            >
              Verify Topics
            </button> */}
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default ArticlesUnlocked;
