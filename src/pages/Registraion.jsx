import React, { useState } from "react";
import Auth from "../assets/auth.jpg";
import Google from "../assets/google.jpg";
import India from "../assets/indiaflag.jpg";
import USFlag from "../assets/us.jpg"; // Add a US flag image

function Registration() {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Map for country flags based on country codes
  const countryFlags = {
    "+91": { code: "IN", flag: India },
    "+1": { code: "US", flag: USFlag },
    "+44": { code: "UK", flag: India },
    "+61": { code: "AU", flag: USFlag },
  };

  const handleCountryChange = (code) => {
    setCountryCode(code);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Country Code:", countryCode);
    console.log("Phone Number:", phoneNumber);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full h-full max-w-none bg-white">
        {/* Left Section (Image) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <img
            src={Auth}
            alt="Tablet in hand"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="flex flex-col w-full md:w-1/2 px-8 md:px-48 py-6 md:py-16 h-full justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
            Unlock Your PR Potential
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Sana Ray"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-black"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="sanaray12@gmail.com"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">Password</label>
              <input
                type="password"
                placeholder="****"
                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
              <div className="flex items-center border-b-2 border-gray-300 pb-1">
                {/* Country Code Selector */}
                <div className="relative flex items-center">
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="cursor-pointer text-sm font-medium"
                  >
                    <img
                      src={countryFlags[countryCode].flag}
                      alt="Country Flag"
                      className="w-5 h-5 mr-2"
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 bg-white border shadow-lg w-[70px] z-10 mt-1">
                      {Object.entries(countryFlags).map(
                        ([code, { flag, code: countryCode }]) => (
                          <div
                            key={code}
                            className="flex items-center p-1 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCountryChange(code)}
                          >
                            <img
                              src={flag}
                              alt={countryCode}
                              className="w-5 h-5 mr-2"
                            />
                            <span className="text-xs">{countryCode}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <span className="border-r-2 h-4 mx-2"></span>
                <input
                  type="tel"
                  placeholder="+919999999999"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="w-full focus:outline-none text-sm text-gray-800"
                />
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-[#4D49F6] text-white py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              CREATE ACCOUNT
            </button>

            {/* Terms & Conditions */}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-500">
                I accept the terms & Conditions
              </label>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="h-[1px] bg-gray-300 flex-1"></div>
            <span className="px-4 bg-[#EDEDED] text-[#212121] text-md font-medium">
              Or
            </span>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          {/* Google Sign-up */}
          <button className="w-full flex items-center bg-gray-50 justify-center border py-2 rounded-md text-sm">
            <img src={Google} alt="Google" className="w-4 h-4 mr-2" />
            Sign up with Google
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Own an Account?{" "}
            <a href="/login" className="underline font-bold">
              JUMP RIGHT IN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
