import React, { useState, useEffect } from "react";
import TermsCondition from "../components/common/modal/TermsCondition";
import { useSelector, useDispatch } from "react-redux";
import {
  resetState,
  updateRequestArticle,
} from "../redux/slices/generatedSlice";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast
import { TextGenerating } from "./TextGenerating";
import GeneratedArticleLayout from "../layouts/GeneratedArticleLayout";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { generateArticles } from "../redux/slices/generatedSlice";
import { baseURL } from "../axios/instance";
import profile from "../assets/sidebar/profile.svg";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCroppedImg } from "../utils";
import Cropper from "react-easy-crop";

const GeneratedArticle = () => {
  const [showModal, setShowModal] = useState(false);
  const userdata = useSelector((state) => state.auth);
  const userId = userdata?.user?.user?._id;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isCompanyNameChecked, setIsCompanyNameChecked] = useState(false);
  const [isAuthorNameChecked, setIsAuthorNameChecked] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageUrlCrop, setImageUrlCrop] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [fileName, setFileName] = useState("");

  const dispatch = useDispatch();
  // const navigate = useNavigate();

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

  const [profileImage, setProfileImage] = useState("");
  const [articleData, setArticleData] = useState({
    title: "",
    value: "",
  });

  useEffect(() => {
    dispatch(generateArticles({ _id: id, userId }));
  }, []);

  const wordCount = (value) => {
    let totalWord = 0 ;
    if(value){
         totalWord = value.split(/\s+/).length;
    }
    return totalWord
  }

  useEffect(() => {
     if(articleGenerate.profileImage){
      setProfileImage(articleGenerate?.profileImage?.filepath)      
     }
     let title, content;
     const temp = articleGenerate.value.split(':');

    if (temp.length > 1) {
      title = temp.shift().trim();
      content = temp.join(":").trim();
    } else {
      title = "Generated Article";
      content = articleGenerate.value.trim();
    }

    setArticleData({
      title: title,
      value: content,
    });
  }, [articleGenerate]);

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

  const handleCropSave = async () => {
    if (imageUrlCrop && croppedAreaPixels) {
      try {
        const croppedBlob = await getCroppedImg(
          imageUrlCrop,
          croppedAreaPixels,
          zoom
        );
        if (!croppedBlob) {
          throw new Error("Cropped image is empty");
        }
        const croppedFile = new File([croppedBlob], fileName, {
          type: "image/jpeg",
        });
        const croppedImageUrl = URL.createObjectURL(croppedFile);
        const url = URL.createObjectURL(croppedFile);

        setSelectedFile(() => croppedFile);
        setIsModalOpen(false);
        setShowUpload(true);
        setPreviewURL(croppedImageUrl);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
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
        setShowUpload(false);
      }
    } catch (error) {
      setUploadMessage(
        "Error uploading file: " + (error.response?.data || error.message)
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageUrlCrop(URL.createObjectURL(file));
      const fileName = file.name;
      setFileName(fileName);
      setIsModalOpen(true);
      event.target.value = "";
    }
  };

  if (articleloading) {
    return (
      <GeneratedArticleLayout>
        <div className="flex items-center justify-center h-screen w-full">
          <TextGenerating />
        </div>
      </GeneratedArticleLayout>
    );
  }
  return (
    <GeneratedArticleLayout>
      <div className="  flex flex-col items-center pt-2 pb-4 px-6">
        {isModalOpen && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-xs sm:max-w-lg w-full relative mt:[150px] sm:mt-0">
              <h3 className="text-gray-700 font-semibold mb-4 text-lg text-center">
                Adjust Image Crop
              </h3>

              <div className="relative w-full h-48 sm:h-80 bg-gray-200">
                <Cropper
                  image={imageUrlCrop}
                  crop={crop}
                  zoom={zoom}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-between">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 hover:scale-105 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropSave}
                  className="px-4 py-2 rounded-md bg-app-blue-1 text-white hover:scale-105 w-full sm:w-auto"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
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
            {
              <label
                htmlFor="profile-upload"
                className={`text-gray-500 cursor-pointer ${
                  selectedFile || profileImage ? "h-full w-full" : "h-[40px]"
                }`}
              >
                <div className="w-full h-full rounded-full">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={selectedFile ? previewURL : profileImage || profile}
                  />
                </div>
                <div className="absolute bottom-0 right-[-10px] h-[40px] w-[40px] bg-gray-100 rounded-full text-[20px] text-gray-400 flex justify-center items-center ">
                  <FaPen />
                </div>
              </label>
            }
          </div>
          {showUpload && (
            <button
              onClick={handleFileUpload}
              className="mt-4 bg-app-blue-1 text-white px-4 py-2 rounded-md hover:scale-105"
            >
              Upload
            </button>
          )}{" "}
          {/* {uploadMessage && (
                      <p className="mt-2 text-sm text-green-500">{uploadMessage}</p>
                    )} */}
        </div>

        {/* Generated Article Section */}
        <div className="w-full max-w-4xl ">
          <h2 className="text-xl text-center mt-5 font-semibold text-gray-800 mb-4">
            {articleData?.title}
          </h2>
          <h4 className="flex justify-end font-semibold italic text-gray-600">Words Count : {wordCount(articleData?.value)}</h4>
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
          <div className="text-justify mt-2">{articleData?.value}</div>

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
          </div>
        </div>
        {showModal && (
          <TermsCondition
            handleTermsChange={handleTermsChange}
            handleCompanyNameChange={handleCompanyNameChange}
            handleAuthorNameChange={handleAuthorNameChange}
            termsAndCondition={isTermsChecked}
            authorName={isAuthorNameChecked}
            companyName={isCompanyNameChecked}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </GeneratedArticleLayout>
  );
};

export default GeneratedArticle;
