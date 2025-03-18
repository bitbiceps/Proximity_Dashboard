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


import React, { useEffect, useState} from "react";
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
import { getCroppedImg } from "../utils";
import dayjs from "dayjs";
import { industryJobRoles } from "../utils";





const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for the profile picture
  const [uploadMessage, setUploadMessage] = useState(""); // State for success/error message
  const userdata = useSelector((state) => state.auth); // Get user data from Redux
  const [profileImage , setProfileImage] = useState(userdata?.user?.user?.profileImage?.filepath || '')
  const [previewURL, setPreviewURL] = useState(null);
  const [countryCode, setCountryCode] = useState("in");
  const {fullName , email} = userdata?.user?.user
  const [phoneNumber, setPhoneNumber] = useState(userdata?.user?.user?.phoneNumber || '');
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageUrlCrop , setImageUrlCrop] = useState(null);
  const [showUpload , setShowUpload] = useState(false);
  const [fileName , setFileName] = useState('');
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const userId = userdata?.user?.user?._id;
  const [firstName, ...lastNameParts] = fullName?.split(" ") || [];
  const lastName = lastNameParts.join(" ");
  const [formTouched , setFormTouched] = useState(false);

  const [userDetails , setUserDetails] = useState({
    firstName: { label: "First Name", value: firstName },
    lastName: { label: "Last Name", value: lastName },
    email: { label: "Email", value: email },
    phoneNumber: { label: "Phone Number", value: phoneNumber },
    dob:{label : "Date of birth" , value : ""},
    gender : {label : "Gender" , value : ""},
    fieldOfIndustry: { label: "Field of Industry", value: "" },
    jobTitle: { label: "Job Title", value: "" },
    companyName: { label: "Company name", value: "" },
  })


  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    dateOfBirth: "",
    gender: "",
    fieldOfIndustry: "",
    jobTitle: "",
    companyName: "",
  });


  const validateForm = () => {
    let errorMessage = "";
    let isValid = true;
    if (!formData.firstName.trim()) {
      errorMessage = "First name is required";
      isValid = false;
    }
    // else if (!formData.lastName.trim()) {
    //   errorMessage = "Last name is required";
    //   isValid = false;
    // }
    else if (!formData.email.trim()) {
      errorMessage = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorMessage = "Invalid email format";
      isValid = false;
    } else if (!formData.phoneNumber.trim()) {
      errorMessage = "Phone number is required";
      isValid = false;
    } else if (!validatePhonenumber()) {
      errorMessage = "Phone number is not valid";
      isValid = false;
    }
    else if (!formData.fieldOfIndustry.trim()) {
      errorMessage = "Field of industry is required";
      isValid = false;
    } else if (!formData.jobTitle.trim()) {
      errorMessage = "Job title is required";
      isValid = false;
    } else if (!formData.companyName.trim()) {
      errorMessage = "Company name is required";
      isValid = false;
    }

    return { isValid, errorMessage };
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormTouched(true);
    const updatedData = {...formData , [name] : value};
    if(name === 'fieldOfIndustry'){
      updatedData["jobTitle"]=""
    }
    setFormData(updatedData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const {isValid , errorMessage} = validateForm();
    if(!isValid){
      toast.error(errorMessage);
      return ;
    }
    if(formTouched){
      await handleUserDetailsSubmit();
    }
    if(selectedFile){
      await handleFileUpload();
    }
    if(formTouched || selectedFile) {
      await dispatch(fetchUserData(userId))
      setFormTouched(false);
      setIsEditing(false);
    }
    setSelectedFile(null);
    setPreviewURL(null);

  }

  const handleUserDetailsSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/user/update`,
        {
          user: userId,
          fields : {
            fullName: formData.firstName + " " + formData.lastName,
            email: formData.email,
            gender: formData.gender || null,
            dateOfBirth: formData.dateOfBirth || null,
            phoneNumber: phoneNumber,
          },
          basicQuestionnaire: [formData.fieldOfIndustry, formData.jobTitle, formData.companyName]
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      if(response){
        toast.success("User Profile updated!!",{
          theme: "light",
        })
      }
    } catch (error) {
      toast.error('Error while uploading the user details')
    }
  };




  const handlePhoneChange = (value, country) => {
    setCountryCode(country?.countryCode || "");
    setPhoneNumber(value)
    setFormData({
      ...formData,
      phoneNumber: value,
    });
  };

  const validatePhonenumber = () => {
    const parsedNumber = parsePhoneNumberFromString(`+${phoneNumber}`, countryCode);
    if (!parsedNumber || !parsedNumber.isValid()) {
      return false
    }
    return true;
  }

  const onCropComplete =(_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const updateBaseQuestions = (user, baseQuestions) => {
    const [firstName, ...lastNameParts] = fullName?.split(" ") || [];
    const lastName = lastNameParts.join(" ");
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      firstName: { ...prevDetails.firstName, value: firstName || "" },
      lastName: { ...prevDetails.lastName, value: lastName || "" },
      email: { ...prevDetails.email, value: user?.email || "" },
      phoneNumber: { ...prevDetails.phoneNumber, value: user?.phoneNumber || "" },
      dob: { ...prevDetails.dob, value: user?.dateOfBirth ? dayjs(user?.dateOfBirth).format("DD MMM, YYYY") : "" },
      gender: { ...prevDetails.gender, value: user?.gender || "" },
      fieldOfIndustry: { ...prevDetails.fieldOfIndustry, value: baseQuestions?.fieldOfIndustry || "" },
      jobTitle: { ...prevDetails.jobTitle, value: baseQuestions?.jobTitle || "" },
      companyName: { ...prevDetails.companyName, value: baseQuestions?.companyName || "" },
    }));

    setFormData((prevDetails) => ({
      ...prevDetails,
      firstName: firstName || "",
      lastName: lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      dateOfBirth: user?.dateOfBirth || "",
      gender: user?.gender || "",
      fieldOfIndustry: baseQuestions?.fieldOfIndustry || "",
      jobTitle: baseQuestions?.jobTitle || "",
      companyName: baseQuestions?.companyName || "",
    }));
  };




  useEffect(() => {
    const getUserData = async () => {
      if (userdata) {
        try {
          const user = userdata?.user?.user
          const basicInformation = user?.questionnaire?.basicInformation || {};
          const baseQuestions = {
            fieldOfIndustry: basicInformation[1]?.answer || "",
            jobTitle: basicInformation[2]?.answer || "",
            companyName: basicInformation[3]?.answer || "",
          };
          updateBaseQuestions(user , baseQuestions);
          setProfileImage(user?.profileImage?.filepath || '')

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    getUserData();
  }, [userdata]);



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
  const handleFileUpload = async () => {
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
        setPreviewURL(croppedImageUrl);

      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  const UserDetailsComponent = () => {
    return <>
      <div className="h-full rounded-xl p-2  bg-[#f3f4f6] shadow-md">
        <div className="flex justify-end items-center mb-2">
          <div
            className="absolute h-10 w-10 top-2 right-3 cursor-pointer rounded-full text-xl text-gray-500 flex justify-center items-center hover:scale-110 transition-transform duration-300 ease-in-out hover:bg-gray-200"
            onClick={() => setIsEditing(true)}
          >
            <FaPen />
          </div>
        </div>
        <div className="flex flex-col mb-4 items-center">
          <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center relative overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profile-upload"
            />
            <label htmlFor="profile-upload" className="cursor-pointer w-full h-full rounded-full group">
              <div className="w-full h-full rounded-full flex items-center justify-center transition-all duration-300">
                <img className={`${profileImage ? 'w-full h-full':' w-[45%]  h-[45%]'} object-cover rounded-full`} src={profileImage || profile} />
              </div>
            </label>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:px-20 px-4  md:gap-x-10 md:gap-y-6">
            {Object.entries(userDetails).map(([key, details]) => (
              <div key={key} className="mb-4 md:ps-10">
                <label className="text-base md:text-base font-semibold text-gray-700 block">
                  {details.label}
                </label>
                <div className="text-sm md:text-base lg:text-lg font-semibold text-gray-500">
                  {details.value || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  }


  return (
    <RootLayout>
      <div className="flex justify-center items-center md:h-[90vh] p-0 md:p-7  overflow-auto scrollbar-hide">
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
        <div className="bg-white rounded-lg shadow-md w-full max-w-5xl relative">
          {
            !isEditing ? <>
              <div className="relative p-10 mt-4">
                <UserDetailsComponent/>
              </div>
            </> : <>
              <div className="px-2 py-4">
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
                </div>
                <form className="mt-8 md:mt-4 space-y-8 md:space-y-4 profileForm">
                  <div className="grid grid-cols-2 lg:px-16 px-0 gap-2 lg:gap-16">
                    <div className="">
                      <label className="block text-sm md:text-base text-gray-600">First Name *</label>
                      <input
                        name="firstName"
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-xs md:text-base focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm md:text-base text-gray-600">Last Name</label>
                      <input
                        name="lastName"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.lastName}
                        placeholder="Enter your last name"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-xs md:text-base focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:px-16 px-0 gap-2 lg:gap-16">
                    <div>
                      <label className="block text-sm md:text-base text-gray-600">Email *</label>
                      <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                        placeholder="Enter your email"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-xs md:text-base focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm md:text-base mb-2 text-gray-600">Phone Number *</label>
                      <PhoneInput
                        country={countryCode}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        enableSearch={true}
                        disableDropdown={false}
                        containerClass="w-full"
                        inputClass="!w-full  !px-3 !py-3 !ps-12 !rounded-md !text-xs md:!text-base border !border-gray-300 !bg-transparent focus:!border-blue-500 focus:!outline-none"
                        buttonClass="!border"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:px-16 px-0 gap-2 lg:gap-16">
                    <div>
                      <label className="block text-sm md:text-base text-gray-600">Date of Birth</label>
                      <input
                        value={formData.dateOfBirth ? dayjs(formData.dateOfBirth).format("YYYY-MM-DD") : ""}
                        onChange={handleInputChange}
                        name="dateOfBirth"
                        type="date"
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-xs md:text-base focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="">
                      <label className="block text-sm md:text-base text-gray-600">Gender</label>
                      <select onChange={handleInputChange} value={formData.gender} name="gender" className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base focus:ring-blue-500 focus:border-blue-500">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-8 md:space-y-4">
                    <div className="grid grid-cols-2 lg:px-16 px-0 gap-2 lg:gap-16">
                      <div>
                        <label className="block text-sm md:text-base text-gray-600">Field of industry *</label>
                        <select
                          name="fieldOfIndustry"
                          value={formData.fieldOfIndustry}
                          onChange={handleInputChange}
                          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-xs md:text-base focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="" disabled>Select your field</option>
                          {[
                            "Software and IT",
                            "Finance and Banking",
                            "Healthcare and Medicine",
                            "Education and Research",
                            "Marketing and Advertising",
                            "Sales and Business Development",
                            "Human Resources",
                            "Manufacturing and Engineering",
                            "Legal and Compliance",
                            "Creative and Design"
                          ].map((title) => (
                            <option key={title} value={title}>
                              {title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm md:text-base text-gray-600">Role/Job Title *</label>
                        <select
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-xs md:text-base focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="" disabled>Select your job title</option>
                          {industryJobRoles[formData.fieldOfIndustry]?.length > 0 ? (
                            industryJobRoles[formData.fieldOfIndustry].map((title) => (
                              <option key={title} value={title}>
                                {title}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>
                              No job roles available
                            </option>
                          )}

                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2  lg:px-16 px-0 gap-2 lg:gap-16">
                      <div>
                        <label className="block text-sm md:text-base text-gray-600">Company name *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Enter your area of expertise"
                          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-xs md:text-base focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    <button
                      className="text-white bg-gray-800 px-4 py-2 rounded-md hover:scale-105"
                      onClick={() => {
                        setFormTouched(false)
                        setIsEditing(false)
                        setSelectedFile(null)
                        setPreviewURL("")
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-app-blue-1 text-white px-4 py-2 rounded-md hover:scale-105  disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmit}
                      disabled={!formTouched && !selectedFile}
                    >
                      Update
                    </button>
                  </div>

                </form>
              </div>
            </>
          }
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile;
