import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerResetState,
  submitRegistration,
} from "../redux/slices/authSlice";
import lefBg from "../assets/bg-left.png";
import news from "../assets/news.png";
import Google from "../assets/google.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import parsePhoneNumberFromString from "libphonenumber-js";
import { FaCircleInfo } from "react-icons/fa6";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const emails = [
  //   "tanvi.kapila@saimanshetty.com",
  //   "saanidhya@saimanshetty.com",
  //   "harsh@saimanshetty.com",
  //   "saiman@saimanshetty.com",
  //   "vinay.m@saimanshetty.com",
  //   "yogesh.y@saimanshetty.com",
  //   "vinaymaheshwari35@gmail.com",
  //   "kamran@saimanshetty.com",
  //   "omkar@saimanshetty.com",
  // ];

  const [countryCode, setCountryCode] = useState("in");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const response = useSelector((state) => state.auth);
  const [showPassword , setShowPassword] = useState(false);

  const validatePhonenumber = () => {
    const parsedNumber = parsePhoneNumberFromString(
      `+${phoneNumber}`,
      countryCode
    );
    if (!parsedNumber || !parsedNumber.isValid()) {
      return false;
    }
    return true;
  };

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]{2,}\.[a-z]{2,}$/i;


    if (!fullName) {
      toast.error("Full name is required!");
      return false;
    }

   if (!nameRegex.test(fullName.trim())) {
      toast.error("Full name should not contain digits or special characters!");
      return false;
   }

   if (!email.trim()) {
    toast.error("Please enter the email address");
    return false;
  }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!validatePhonenumber()) {
      toast.error("Phone number is not valid");
      return false;
    }
    if (!password || password.length < 5) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions!");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    // if (emails.includes(email.toLocaleLowerCase())) {
    const formData = {
      fullName,
      email : email.toLowerCase(),
      password,
      phoneNumber: `${phoneNumber}`,
      termsAccepted,
    };

    dispatch(submitRegistration(formData));
    // } else {
    //   toast.error("Email is not eligible");
    // }
  };

  useEffect(() => {
    if (
      response?.registerUser &&
      response?.registerUser?.message === "User registered successfully"
    ) {
      toast.success("Registration successfull redirecting...");
      navigate("/login", { replace: true });
      dispatch(registerResetState());
    } else if (
      response?.error?.message === "Phone number is already registered"
    )
      toast.error("Phone number is already registered");
  }, [response, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full h-full max-w-none bg-white">
        <div className=" relative w-full md:w-1/2 h-1/2 md:h-full">
          <img
            src={lefBg}
            alt="Tablet in hand"
            className="w-full h-full object-cover"
          />
          <img
            className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
            src={news}
          ></img>
        </div>

        <div className="flex flex-col w-full md:w-1/2 px-8 md:px-48 py-6 md:py-16 h-full justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            Unlock Your PR Potential
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Full Name
              </label>
              <input
                type="text"
                maxLength={100}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sana Ray"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-black"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sanaray12@gmail.com"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
            </div>
            <div className="relative">
              <label className="block text-sm text-gray-500 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="w-full border-b-2 border-gray-300 py-1 pr-10 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 top-[22px] right-0 flex items-center pr-3"
              >
                  {!showPassword ? (
                    // Eye-off icon
                    <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                      <path d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z" /></svg>
                  ) : (
                    // Eye icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"/>
                    </svg>
                  )}
              </button>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Phone Number
              </label>
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
                inputClass="!w-full !text-sm !border-0 !border-b-2 !border-gray-300 !bg-transparent focus:!border-blue-500 focus:!outline-none" // Removes border, adds underline
                buttonClass="!bg-transparent !border-0"
              />
            </div>
            <button
              type="submit"
              style={{ boxShadow: "0px 24px 42.42px -8.48px #4D49F63D " }}
              className={`mt-4 w-full bg-[#4D49F6] text-white py-[15px] rounded-full text-sm font-semibold shadow-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging In..." : "CREATE ACCOUNT"}
            </button>
            {/* <button
              type="submit"
              style={{boxShadow: '0px 24px 42.42px -8.48px #4D49F63D '             }}
              className={`mt-4 w-full bg-[#4D49F6] text-white py-[15px] rounded-full text-sm font-semibold shadow-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging In..." : "CREATE ACCOUNT"}
            </button> */}

            <div className="flex gap-2 items-center mt-2 mx-auto">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  id="terms"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-xs cursor-pointer text-gray-500"
                >
                  I accept the terms & Conditions
                </label>
              </div>
              <a
                href="/terms_condition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaCircleInfo />
              </a>
            </div>
          </form>

          <div className="flex items-center my-6">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="px-4 bg-[#EDEDED] text-[#212121] text-md font-medium">
              Or
            </span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          <button className="w-full flex items-center bg-gray-50 justify-center border py-2 rounded-md text-sm">
            <img src={Google} alt="Google" className="w-4 h-4 mr-2" />
            Sign up with Google
          </button>

          <p className="text-center text-xs text-gray-600 mt-6">
            Own an Account?{" "}
            <Link to="/login" className="underline font-bold">
              JUMP RIGHT IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
