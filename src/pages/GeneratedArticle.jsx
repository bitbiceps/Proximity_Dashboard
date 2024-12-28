import React, { useState, useEffect } from "react";
import RootLayout from "../layouts/RootLayout";
import TermsCondition from "../components/common/modal/TermsCondition";
import { useSelector, useDispatch } from "react-redux";
import {
  resetState,
  updateRequestArticle,
} from "../redux/slices/generatedSlice";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast
const GeneratedArticle = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { articleVerify, articleUpdate, loading, error, articleGenerate } =
    useSelector((state) => state.generated);
  const articles = useSelector(({ articles: { articles } }) => articles);
  const currentArticle = useSelector(
    (state) => state.articles.currentSelectedArticle
  );
  console.log("articleGenerated", articleGenerate);
  useEffect(() => {
    if (
      articleUpdate?.message ===
      "Article updateRequested status toggled successfully"
    ) {
      toast.success(articleUpdate?.message);
    }
  }, [articleUpdate]);

  const handleUpdate = (articleId) => {
    console.log("adsssssss", articleId);
    dispatch(updateRequestArticle({ articleId }));
  };
  console.log("showModal", showModal);
  const handleVerify = () => {
    setShowModal(true);
    console.log("reseeeeeeee");
  };
  return (
    <RootLayout>
      <div className="  flex flex-col items-center py-8">
        {/* Upload Photo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <button className="text-orange-500 font-medium">Upload Photo</button>
        </div>

        {/* Generated Article Section */}
        <div className="w-full max-w-4xl ">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Generated Article
          </h2>
          {/* <p className="text-gray-700 text-justify leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
            lacus sem. Fusce volutpat fermentum turpis a mollis. Pellentesque
            ornare imperdiet eros, et convallis eros tristique id. Aliquam
            elementum, erat non rhoncus tristique, risus metus malesuada sem, et
            tincidunt quam ex vel lectus. Nulla sagittis suscipit felis, laoreet
            consequat ligula fermentum nec. Morbi vestibulum elit in congue
            mattis. Morbi est est, facilisis auctor dui et, dignissim elementum
            augue.
          </p> */}

          {/* {articles.map((a, i) => (
            <div
              key={a._id}
              className="text-gray-700 text-justify leading-relaxed mb-6"
            >
              {a._id == currentArticle._id && <p>{a.value}</p>}
            </div>
          ))} */}
          <div>{articleGenerate?.value}</div>

          {/* <p className="text-gray-700 text-justify leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
            lacus sem. Fusce volutpat fermentum turpis a mollis. Pellentesque
            ornare imperdiet eros, et convallis eros tristique id. Aliquam
            elementum, erat
          </p> */}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleUpdate(articleGenerate._id)}
              className="px-8 py-2 text-blue-500 border border-[#4D49F6] rounded-lg "
            >
              Update
            </button>
            <button
              onClick={handleVerify}
              className="px-8 py-2 text-white bg-[#4D49F6] rounded-lg "
            >
              Verify
            </button>
            {showModal && <TermsCondition />}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default GeneratedArticle;
