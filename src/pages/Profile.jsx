// import React,{useState, useEffect} from "react";
// import RootLayout from "../layouts/RootLayout";
// import { useSelector } from "react-redux";
// import { fetchUser } from "../redux/slices/authSlice";

// const Profile = async () => {
//   const [baseQuestions, setBaseQuestions] = useState(null); // State for baseQuestions
//   const userdata = useSelector((state) => state.auth); // Get user data from Redux
//   const userId = userdata?.user?.user?._id;
//   const getUserData = async () => {
//     if (userId) {
//       try {
//         const user = await fetchUser(userId); // Fetch user data
//         const basicInformation = user?.questionnaire?.basicInformation;
//         setBaseQuestions(basicInformation); // Update state
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     }
//   };

//   useEffect(() => {

//     getUserData();
//   }, []);
//   return (
//     <RootLayout>
//       <div className=" flex  justify-center ">
//         <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-5xl">
//           <div className="flex flex-col items-center">
//             <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
//               <button className="text-gray-500">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-12 w-12"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M4 3a2 2 0 012-2h8a2 2 0 012 2v2h1a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1h1V3zm10 2V3H6v2h8zM4 9v7h12V9H4zm8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </button>
//             </div>
//             <h2 className="mt-4 text-lg font-medium text-gray-700">
//               Upload Photo
//             </h2>
//           </div>

//           <form className="mt-8 space-y-6">
//             <div className="grid grid-cols-2 px-16 gap-16">
//               <div>
//                 <label className="block text-sm text-gray-600">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your first name"
//                   className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Last Name</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your last name"
//                   className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 px-16 gap-16">
//               <div>
//                 <label className="block text-sm text-gray-600">
//                  Email
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your email"
//                   className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600">Phone Number</label>
//                 <input
//                   type="number"
//                   placeholder="Enter your phone number"
//                   className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>


//             <div className="grid grid-cols-2  px-16 gap-16">
//               <div>
//                 <label className="block text-sm text-gray-600">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="mr-48">
//                 <label className="block text-sm text-gray-600">Gender</label>
//                 <select className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             </div>
//             <div className="flex flex-col justify-center items-center">
//                 <div className="mt-4 text-lg font-medium text-gray-700 ">Basic Information</div>
//                 <div>
//                   <div className=" text-gray-600 text-[16px] ">1.) Field of Industry : <span>{baseQuestions[1].answer}</span> </div>
//                   <div className=" text-gray-600 text-[16px] ">1.) Field of Industry : <span>{baseQuestions[2].answer}</span> </div>
//                   <div className=" text-gray-600 text-[16px] ">1.) Role of Job  : <span>{baseQuestions[3].answer}</span> </div>
//                 </div>
//             </div>

//             <div className="px-[400px] py-4">
//               <button
//                 type="submit"
//                 className="w-full bg-[#4D49F6] text-white py-3 rounded-md text-sm font-medium "
//               >
//                 SUBMIT
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </RootLayout>
//   );
// };

// export default Profile;


import React, { useEffect, useState , useCallback} from "react";
import RootLayout from "../layouts/RootLayout";
import { useSelector , useDispatch } from "react-redux";
import { fetchUser , fetchUserData } from "../redux/slices/authSlice";
import { baseURL } from "../axios/instance";
import profile from "../assets/sidebar/profile.svg";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import parsePhoneNumberFromString from "libphonenumber-js";
import Cropper from 'react-easy-crop'


const getCroppedImg = async (imageSrc, crop, zoom) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width;
      canvas.height = crop.height;

      // Create a circular clipping path
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        0,
        2 * Math.PI
      );
      ctx.clip(); // Clip to circle

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      }, "image/png"); // Use PNG to preserve transparency
    };

    image.onerror = (err) => reject(new Error("Failed to load image: " + err.message));
  });
};



const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for the profile picture
  const [uploadMessage, setUploadMessage] = useState(""); // State for success/error message
  const userdata = useSelector((state) => state.auth); // Get user data from Redux
  const profileImage = userdata?.user?.user?.profileImage?.filepath || '';
  const [previewURL, setPreviewURL] = useState(null);
  const [countryCode, setCountryCode] = useState("in");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageUrlCrop , setImageUrlCrop] = useState(null);
  const [showUpload , setShowUpload] = useState(false);
  const [fileName , setFileName] = useState('');
  const dispatch = useDispatch();




  const userId = userdata?.user?.user?._id;
  const [baseQuestions, setBaseQuestions] = useState({
    fieldOfIndustry: "",
    jobTitle: "",
    areasOfExpertise: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBaseQuestions((prev) => ({ ...prev, [name]: value }));
  };



  


  const validatePhonenumber = () => {
      const parsedNumber = parsePhoneNumberFromString(`+${phoneNumber}`, countryCode);
      if (!parsedNumber || !parsedNumber.isValid()) {
        return false
      } 
      return true;
  }

  const onCropComplete =(_, croppedAreaPixels) => {
    console.log('pixels',croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels);
  };


  useEffect(() => {
    const getUserData = async () => {
      if (userId) {
        try {
          const user = await fetchUser(userId); // Fetch user data
          const basicInformation = user?.questionnaire?.basicInformation || {};
          setBaseQuestions({
            fieldOfIndustry: basicInformation[1]?.answer || "",
            jobTitle: basicInformation[2]?.answer || "",
            areasOfExpertise: basicInformation[3]?.answer || "",
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    getUserData();
  }, [userId]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageUrlCrop(URL.createObjectURL(file));
      const fileName = file.name
      setFileName(fileName)
      setIsModalOpen(true);
      event.target.value = ""
    }
  };;

  // Handle profile picture upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    setShowUpload(false);
    if (!selectedFile) {
      setUploadMessage("Please select a file before uploading.");
      toast.info("Please select a file before uploading.",{
        theme: "light",
        
      })
      return;
    }
  
    // // Extract the file extension from the selected file
    // const fileExtension = selectedFile.name.split(".").pop(); // Get the last part after '.'
    
    // // Rename the file to 'profile' while keeping the extension
    // const renamedFile = new File([selectedFile], `profile.${fileExtension}`, {
    //   type: selectedFile.type,
    // });
  
    // Create FormData and append the renamed file
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user", userId);
  
  
    try {
      const response = await axios.post(
        `${baseURL}/upload/profile`, // Your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      setUploadMessage(response.data.message); // Display success message
      if(response){
        toast.success("Profile pic uploaded!!",{
          theme: "light",
          
        })
        dispatch(fetchUserData(userId))
      }
    } catch (error) {
      setUploadMessage("Error uploading file: " + (error.response?.data || error.message));
    }
  };
  
  const handleCropSave = async () => {
    if (imageUrlCrop && croppedAreaPixels) {
      try {
        const croppedBlob = await getCroppedImg(imageUrlCrop, croppedAreaPixels, zoom);
        if (!croppedBlob) {
          throw new Error("Cropped image is empty");
        }
        const croppedFile = new File([croppedBlob], fileName , { type: "image/jpeg" });
        const croppedImageUrl = URL.createObjectURL(croppedFile);
        const url = URL.createObjectURL(croppedFile);

        setSelectedFile(() => croppedFile)
        setIsModalOpen(false)
        setShowUpload(true);
        setPreviewURL(croppedImageUrl);

      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };
  


  return (
    <RootLayout>
      <div className="flex justify-center">
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
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-5xl">
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

                    <label htmlFor="profile-upload" className={`text-gray-500 cursor-pointer ${selectedFile || profileImage ? 'h-full w-full' : 'h-[40px]'}`}>
                      <div className="w-full h-full rounded-full"><img className="w-full h-full object-cover rounded-full" src={selectedFile ? previewURL : profileImage || profile} /></div>
                      <div className="absolute bottom-0 right-[-10px] h-[40px] w-[40px] bg-gray-100 rounded-full text-[20px] text-gray-400 flex justify-center items-center "><FaPen /></div>
                    </label>
                  }
                </div>
                {
                  showUpload && <button
                    onClick={handleFileUpload}
                    className="mt-4 bg-app-blue-1 text-white px-4 py-2 rounded-md hover:scale-105"
                  >
                    Upload
                  </button>
                }
              </div>

          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-2 lg:px-16 px-0 gap-2 lg:gap-16">
              <div className="">
                <label className="block text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 lg:px-16 px-0 gap-2 lg:gap-16">
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-600">Phone Number</label>
                <PhoneInput
                country={countryCode}
                value={phoneNumber}
                onChange={(value, country) => {
                  setPhoneNumber(value);
                  setCountryCode(country?.countryCode || "");
                }}               
                enableSearch={true}
                disableDropdown={false}
                containerClass="w-full"
                inputClass="!w-full  !px-3 !py-3 !ps-12 !rounded-md !text-sm border !border-gray-300 !bg-transparent focus:!border-blue-500 focus:!outline-none"
                buttonClass="!border"
              />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:px-16 px-0 gap-2 lg:gap-16">
              <div>
                <label className="block text-sm text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="lg:mr-48">
                <label className="block text-sm text-gray-600">Gender</label>
                <select className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              {baseQuestions ? (
                <>
                  <div className="grid grid-cols-2 lg:px-16 px-0 gap-2 lg:gap-16">
                    <div>
                      <label className="block text-sm text-gray-600">Field of Industry:</label>
                      <input
                        type="text"
                        name="fieldOfIndustry"
                        value={baseQuestions.fieldOfIndustry}
                        onChange={handleInputChange}
                        placeholder="Enter your field of industry"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Role/Job Title:</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={baseQuestions.jobTitle}
                        onChange={handleInputChange}
                        placeholder="Enter your job title"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mt-6 lg:px-16 px-0 gap-2 lg:gap-16">
                    <div>
                      <label className="block text-sm text-gray-600">Areas of Expertise:</label>
                      <input
                        type="text"
                        name="areasOfExpertise"
                        value={baseQuestions.areasOfExpertise}
                        onChange={handleInputChange}
                        placeholder="Enter your area of expertise"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                  </div>
                </>
              ) : (
                <div>Loading basic information...</div>
              )}
            </div>


            {/* <div className="px-[400px] py-4">
              <button
                type="submit"
                className="w-full bg-[#4D49F6] text-white py-3 rounded-md text-sm font-medium"
              >
                SUBMIT
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile;
