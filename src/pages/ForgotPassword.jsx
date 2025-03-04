import { useState } from "react";
import lefBg from "../assets/bg-left.png";
import news from "../assets/news.png";
import Google from "../assets/google.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../axios/instance";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";
import requests from "../axios/instance";

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const validateEmail = (email) => {
        if (!email.trim()) {
            toast.error("Email is required.");
            return false;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
    
        return true;
    };

    const handleOtpSend = async (event) => {
        event.preventDefault()

        if(validateEmail(email)){
            setLoading(true);
            try {
                const response = await  requests.resetPassword({ email });
                if (response.status === 200) {
                    toast.success(response.data.message);
                    handleNext();
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to send OTP");
            }
        }
        setLoading(false);
    };

    const verifyOtp = async () => {
        setLoading(true);
        try {
            const response = await requests.verifyOtp({email, otp });
            if (response.status === 200) {
                toast.success("OTP Verified Successfully");
                handleNext();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        }
        setLoading(false);
    };

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const response = await requests.changePassword({
                email,
                password : newPassword,
            });
            if (response.status === 200) {
                toast.success("Password reset successful");
                navigate(routes.login);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }
        setLoading(false);
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col md:flex-row w-full h-full max-w-none bg-white">
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                    <img src={lefBg} alt="Background" className="w-full h-full object-cover" />
                    <img className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" src={news} />
                </div>

                <div className="flex flex-col w-full md:w-1/2 px-8 md:px-48 py-6 md:py-16 h-full justify-center">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-center">
                        Unlock Your PR Potential
                    </h2>
                    <div className="max-w-xl mt-2 p-2 bg-white rounded-lg">
                        {step === 1 && (
                            <>
                                <h2 className="text-lg font-semibold mb-10">Reset Your Password</h2>
                                <label className="block text-sm text-gray-500 mb-1">
                                    Email Address
                                </label>
                                <input type="email" placeholder="Enter your email" className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button onClick={handleOtpSend} className={`mt-4 w-full bg-[#4D49F6] text-white py-[15px] rounded-full text-sm font-semibold shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>Send OTP</button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h2 className="text-lg font-semibold mb-2">Verify OTP</h2>
                                <input type="text" placeholder="Enter OTP" className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                <button onClick={verifyOtp} className={`mt-4 w-full bg-[#4D49F6] text-white py-[15px] rounded-full text-sm font-semibold shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>Verify OTP</button>
                            </>
                        )}
                        {step === 3 && (<>
                            <h2 className="text-lg font-semibold mb-2">Set New Password</h2>
                            <label className="block text-sm text-gray-600 mb-1">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center"
                                >
                                    {showPassword ? (
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
                                            <path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z" />
                                        </svg>
                                    )}                                    </button>
                            </div>

                            <label className="block text-sm text-gray-600 mt-3">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full border-b-2 border-gray-300 py-1 focus:outline-none focus:border-blue-600 text-sm text-gray-800"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <div className="flex justify-between mt-3">
                                <button
                                   onClick={resetPassword}
                                    className="bg-green-600 w-full text-white py-2 px-4 rounded hover:bg-green-700"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </>
                        )}
                    </div>
                    <button className="mt-8 w-full flex items-center bg-gray-50 justify-center border py-2 rounded-md text-sm">
                        <img src={Google} alt="Google" className="w-4 h-4 mr-2" />
                        Login with Google
                    </button>
                    <p className="text-center text-xs text-gray-600 mt-6">
                        New to Account? <Link to="/registration" className="underline font-bold">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
