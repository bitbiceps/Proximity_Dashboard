import React, { useRef , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetState,
  verifyRequestArticle,
} from "../../../redux/slices/generatedSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TermsCondition = ({
  handleTermsChange,
  handleCompanyNameChange,
  handleAuthorNameChange,
  termsAndCondition,
  companyName,
  authorName,
  setShowModal
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth);
  const username = userdata?.user?.user?.fullName
  const containerRef = useRef(null)
  

  const { articleVerify, articleGenerate } = useSelector(
    (state) => state.generated
  );


  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAgree = async (articleId) => {
    try {
      if (termsAndCondition) {
        // Dispatch the verifyRequestArticle action
        dispatch(
          verifyRequestArticle({
            articleId,
            termsAndCondition, // You should pass the boolean values here
            companyName, // Similarly for the company name
            authorName, // And the author name
          })
        );

        // Check if the article was successfully submitted for review
        if (articleVerify?.message === "Article submitted for review") {
          toast.success("Article submitted for review");
          navigate("/", { replace: true });
        }

        // Reset state after dispatch
        dispatch(resetState);
      } else {
        alert("Please accept all terms and conditions to proceed.");
      }
    } catch (error) {
      console.error("Error during article verification:", error);
      toast.error(
        "An error occurred while submitting the article. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8"
      ref={containerRef}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="sm:text-2xl text-base font-bold">Proximity Terms & Conditions</h2>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-80 text-sm text-gray-600 mb-6">
          <p className="mb-4">
          </p>
          <p className="mb-4">
          By submitting content to Proximity, you, <strong>{username}</strong>, agree to these Terms and Conditions. 
          You retain ownership of your work but grant Proximity a non-exclusive, worldwide license to publish,
          distribute, and promote your content. Your submission must be original, free of plagiarism, and not 
          infringe on any third-party rights. Proximity reserves the right to edit, modify, or reject content 
          for clarity, accuracy, and compliance with guidelines. Content must not contain offensive, defamatory,
          misleading, or illegal material. You are responsible for ensuring the accuracy of your content and must 
          properly cite sources. Proximity is not liable for any inaccuracies, misinterpretations, or legal claims
          arising from published content. We may remove content that violates these terms without prior notice. 
          </p>
          <p>
          Proximity aims to maintain a respectful, informative, and engaging environment for readers 
          and contributors alike.Thank you for being a part of Proximity,
          We appreciate your valuable contributions to our platform
          </p>
        </div>

        {/* Checkbox for Terms */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="terms"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            checked={termsAndCondition}
            onChange={handleTermsChange}
          />
          <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
            I confirm that I have read and accept the terms and conditions and
            privacy policy.
          </label>
        </div>

        {/* Checkbox for Company Name */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="companyName"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            checked={companyName}
            onChange={handleCompanyNameChange}
          />
          <label htmlFor="companyName" className="ml-3 text-sm text-gray-700">
            Include company name in generated articles if needed.
          </label>
        </div>

        {/* Checkbox for Author Name */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="authorName"
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            checked={authorName}
            onChange={handleAuthorNameChange}
          />
          <label htmlFor="authorName" className="ml-3 text-sm text-gray-700">
            Include author name i:e; your name in the generated articles if
            needed
          </label>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            className={`px-8 py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700`}
            onClick={() =>{
              if(termsAndCondition){
                handleAgree(articleGenerate._id)
              }else {
                toast.error('You must agree to the Terms & Conditions')
              }
            }
          }
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
