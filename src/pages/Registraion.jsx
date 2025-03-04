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


function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emails = [
    "tanvi.kapila@saimanshetty.com",
    "saanidhya@saimanshetty.com",
    "harsh@saimanshetty.com",
    "saiman@saimanshetty.com",
    "vinay.m@saimanshetty.com",
    "yogesh.y@saimanshetty.com",
    "vinaymaheshwari35@gmail.com",
    "kamran@saimanshetty.com",
    "omkar@saimanshetty.com",
    "sahil.b@saimanshetty.com"
  ];

  const [countryCode, setCountryCode] = useState("in");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const response = useSelector((state) => state.auth);

  const validatePhonenumber = () => {
    const parsedNumber = parsePhoneNumberFromString(`+${phoneNumber}`, countryCode);
    if (!parsedNumber || !parsedNumber.isValid()) {
      return false
    } 
    return true;
  }

  const validateInputs = () => {
    if (!fullName) {
      toast.error("Full name is required!");
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address!");
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

    if (emails.includes(email.toLocaleLowerCase())) {
      const formData = {
        fullName,
        email,
        password,
        phoneNumber: `${phoneNumber}`,
        termsAccepted,
      };

      dispatch(submitRegistration(formData));
    } else {
      toast.error("Email is not eligible");
    }
  };

  useEffect(() => {
    if (
      response?.registerUser &&
      response?.registerUser?.message === "User registered successfully"
    ) {
      toast.success("Registration successfull redirecting...");
      navigate("/login", { replace: true });
      dispatch(registerResetState());
    } else if (response?.error?.message === "Email is already registered")
      toast.error("Email is already registered");
    else if (response?.error?.message === "Phone number is already registered")
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

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
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

            <div className="flex items-center mt-2 mx-auto">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                id="terms"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-500">
                I accept the terms & Conditions
              </label>
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
