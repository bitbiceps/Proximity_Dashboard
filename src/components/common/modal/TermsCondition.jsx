import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetState,
  verifyRequestArticle,
} from "../../../redux/slices/generatedSlice";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast
import { useNavigate } from "react-router-dom";

const TermsCondition = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const navigate = useNavigate();
  const { articleVerify, articleUpdate, loading, error, articleGenerate } =
    useSelector((state) => state.generated);
  // console.log("r", articleVerify.message);
  console.log("articleGenerate",articleGenerate,articleVerify)
  const articles = useSelector(({ articles: { articles } }) => articles);
  const currentArticle = useSelector(
    (state) => state.articles.currentSelectedArticle
  );


  const handleAgree = (articleId) => {
    console.log("artaa", articleId);
    if (isChecked) {
      dispatch(verifyRequestArticle({ articleId }));
      if (articleVerify?.message === "Article submitted for review") {
        toast.success("Article submitted for review");
        navigate("/", { replace: true });
      }
      dispatch(resetState());

      console.log("staterest");
    } else {
      alert("Please accept the terms and conditions to proceed.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Proximity Terms & Conditions</h2>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-80 text-sm text-gray-600 mb-6">
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In bibendum
            vitae nisi a aliquam. In in purus hendrerit, efficitur magna
            sodales, dapibus dui. Praesent libero lacus, placerat quis elit in,
            semper mollis elit. Donec ullamcorper aliquet rhoncus. In faucibus
            efficitur eros ac elementum. Duis ut finibus libero. Nullam tempor
            justo justo, id mattis arcu sollicitudin et.
          </p>
          <p className="mb-4">
            Nam consectetur lacus eros, at pretium mi sagittis ac. Donec sed
            euismod ante, nec tincidunt lectus. Duis tortor mi, scelerisque sit
            amet libero ut, consequat vehicula metus. Sed eget sapien a mi
            convallis auctor vel in felis. Sed sit amet massa sed urna pulvinar
            fermentum id non mauris. Donec elementum in purus at fermentum.
          </p>
          <p>
            Fusce sollicitudin, erat at tempus eleifend, diam sapien tincidunt
            ante, quis scelerisque nunc augue ornare purus. Fusce dignissim dui
            lorem, et fringilla est varius vel.
          </p>
        </div>

        {/* Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
            I confirm that I have read and accept the terms and conditions and
            privacy policy.
          </label>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            className={`px-8 py-3 text-white font-semibold rounded-lg ${
              isChecked
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              console.log(handleAgree(articleGenerate._id))
            }}
            disabled={!isChecked}
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
