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
import { TextGenerating } from "./TextGenerating";
import axios from "axios";

import { baseURL } from "../axios/instance";
import profile from "../assets/sidebar/profile.svg";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GeneratedArticle = () => {
  const [showModal, setShowModal] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isCompanyNameChecked, setIsCompanyNameChecked] = useState(false);
  const [isAuthorNameChecked, setIsAuthorNameChecked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle checkbox changes
  const handleTermsChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const handleCompanyNameChange = () => {
    setIsCompanyNameChecked(!isCompanyNameChecked);
  };

  const handleAuthorNameChange = () => {
    setIsAuthorNameChecked(!isAuthorNameChecked);
  };

  const {
    articleVerify,
    articleUpdate,
    loading,
    error,
    articleGenerate,
    articleloading,
  } = useSelector((state) => state.generated);
  const articles = useSelector(({ articles: { articles } }) => articles);
  const currentArticle = useSelector(
    (state) => state.articles.currentSelectedArticle
  );
  useEffect(() => {
    if (
      articleUpdate?.message ===
      "Article updateRequested status toggled successfully"
    ) {
      toast.success(articleUpdate?.message);
    }
  }, [articleUpdate]);

  const handleUpdate = (articleId) => {
    dispatch(updateRequestArticle({ articleId }));
  };
  const handleVerify = () => {
    setShowModal(true);
  };

  //image update of article
  const [selectedFile, setSelectedFile] = useState(null); // State for the profile picture
  const [uploadMessage, setUploadMessage] = useState(""); // State for success/error message
  const [previewURL, setPreviewURL] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBaseQuestions((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  // Handle profile picture upload
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadMessage("Please select a file before uploading.");
      toast.info("Please select a file before uploading.", {
        theme: "light",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("article", articleGenerate?._id);

    try {
      const response = await axios.post(
        `${baseURL}/upload/article`, // Your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadMessage(response.data.message); // Display success message
      if (response) {
        toast.success("Article pic uploaded!!", {
          theme: "light",
        });
      }
    } catch (error) {
      setUploadMessage(
        "Error uploading file: " + (error.response?.data || error.message)
      );
    }
  };

  if (articleloading) {
    return (
      <RootLayout>
        <div className="flex items-center justify-center h-screen w-full">
          <TextGenerating />
        </div>
      </RootLayout>
    );
  }
  return (
    <RootLayout>
      <div className="  flex flex-col items-center py-8">
        {/* Upload Photo Section */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profile-upload"
            />
            {selectedFile ? (
              <div className="w-full h-full rounded-full">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={previewURL}
                />
              </div>
            ) : (
              <label
                htmlFor="profile-upload"
                className="text-gray-500 cursor-pointer "
              >
                {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M4 3a2 2 0 012-2h8a2 2 0 012 2v2h1a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1h1V3zm10 2V3H6v2h8zM4 9v7h12V9H4zm8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg> */}
                <img className="h-[40px] object-cover" src={profile}></img>
                <div className="absolute bottom-0 right-[-10px] h-[40px] w-[40px] bg-gray-100 rounded-full text-[20px] text-gray-400 flex justify-center items-center ">
                  <FaPen />
                </div>
              </label>
            )}
          </div>
          <h2 className="mt-4 text-lg font-medium text-gray-700">
            Upload Photo
          </h2>

          <button
            onClick={handleFileUpload}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Upload
          </button>
          {/* {uploadMessage && (
                      <p className="mt-2 text-sm text-green-500">{uploadMessage}</p>
                    )} */}
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
            {showModal && (
              <TermsCondition
                handleTermsChange={handleTermsChange}
                handleCompanyNameChange={handleCompanyNameChange}
                handleAuthorNameChange={handleAuthorNameChange}
                termsAndCondition={isTermsChecked}
                authorName={isAuthorNameChecked}
                companyName={isCompanyNameChecked}
              />
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default GeneratedArticle;
