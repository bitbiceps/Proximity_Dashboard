// import React, { useCallback, useEffect, useRef } from "react";
// import RootLayout from "../layouts/RootLayout";
// import payment from "../assets/common/payment.png";
// import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import person from "../assets/person.png";
// import gradientImage from "../assets/gradient.png";
// import star from "../assets/common/star.png";
// import calender from "../assets/common/calender.png";

// // swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Autoplay, Navigation } from "swiper/modules";
// import Cookies from "js-cookie";
// import { cookieAccessKeys } from "../utils";
// import { useSelector } from "react-redux";

// function Dashboard() {
//   const response = useSelector((state) => state.auth);

//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   const initialDashboardCallback = useCallback(() => {
//     console.log(
//       Cookies.get(cookieAccessKeys?.tokens?.accessToken),
//       "Access Token"
//     );
//     console.log(
//       Cookies.get(cookieAccessKeys.tokens.refreshToken),
//       "Refresh Token"
//     );
//   }, [cookieAccessKeys]);

//   useEffect(() => {
//     initialDashboardCallback();
//   }, []);

//   return (
//     <RootLayout>
//       <div className="min-h-screen bg-gray-100 py-4 px-8">
//         <header className="text-center bg-blue-50 p-4 rounded-md shadow-md w-full lg:w-[72vw] mx-auto">
//           <h1 className="text-[24px] font-bold text-app-black-1">
//             Welcome Back, {response?.user?.user?.fullName}!
//           </h1>
//           <p className="mt-2 text-[10px] lg:text-[16px] font-light">
//             We're excited to have you back! Explore our latest tools and
//             features designed to make your life easier and more productive.
//           </p>
//           <Link to="/pr_services">
//             <button className="mt-4 bg-purple-600 text-white text-[12px] px-6 py-2 rounded-md hover:bg-purple-700">
//               Explore Products
//             </button>
//           </Link>
//         </header>

//         <section className="mt-8">
//           <h2 className="text-[16px] lg:text-[24px] font-medium mb-4 text-app-black-1">
//             AI Tools
//           </h2>
//           <div className="flex flex-wrap justify-start w-full lg:w-[60%] gap-4">
//             {Array(3)
//               .fill(0)
//               .map((_, idx) => (
//                 <img
//                   key={idx + "Payment button"}
//                   src={payment}
//                   alt="Payment"
//                   className="cursor-pointer w-[45%] lg:w-[25%] mb-4"
//                 />
//               ))}
//           </div>
//         </section>

//         <section className="mt-8 overflow-x-hidden">
//           <div className="flex items-center justify-between mb-4 w-full lg:w-[95%]">
//             <h2 className="text-[28px] lg:text-[32px] font-medium">Blogs</h2>

//             <div className="flex w-fit transition-colors duration-300 justify-center">
//               <div ref={prevRef} className="cursor-pointer">
//                 <FaCaretLeft
//                   size={30}
//                   className="w-fit h-fit text-app-black-1 hover:text-gray-400"
//                 />
//               </div>

//               <div ref={nextRef} className="cursor-pointer">
//                 <FaCaretRight
//                   size={30}
//                   className="w-fit h-fit text-app-black-1 hover:text-gray-400"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="relative">
//             <Swiper
//               className="overflow-x-hidden"
//               modules={[Navigation, Autoplay]}
//               slidesPerView={3.3} // Number of slides shown at once
//               loop={true}
//               autoplay={{
//                 delay: 1500,
//                 disableOnInteraction: false,
//               }}
//               spaceBetween={20} // Reduced space between slides for better responsiveness
//               speed={1000}
//               navigation={{
//                 prevEl: prevRef.current,
//                 nextEl: nextRef.current,
//               }}
//               onBeforeInit={(swiper) => {
//                 // Assign navigation refs
//                 swiper.params.navigation.prevEl = prevRef.current;
//                 swiper.params.navigation.nextEl = nextRef.current;
//               }}
//               breakpoints={{
//                 // Mobile screens
//                 320: {
//                   slidesPerView: 1, // Show 1.5 slides on mobile
//                   spaceBetween: 10, // Less space between slides on mobile
//                 },
//                 // Tablets (768px)
//                 768: {
//                   slidesPerView: 2, // Show 2 slides on tablet
//                   spaceBetween: 20, // Moderate space between slides
//                 },
//                 // Desktops (1024px)
//                 1024: {
//                   slidesPerView: 3, // Show 3 slides on desktop
//                   spaceBetween: 30, // Moderate space between slides on desktop
//                 },
//                 // Extra large screens (1280px and above)
//                 1280: {
//                   slidesPerView: 3.3, // Show 3.3 slides on larger screens
//                   spaceBetween: 40, // More space on large screens
//                 },
//               }}
//             >
//               {Array(5)
//                 .fill(0)
//                 .map((_, index) => (
//                   <SwiperSlide key={index} className="z-10">
//                     <div
//                       style={{ backgroundImage: `url(${person})` }}
//                       className="bg-cover bg-center overflow-hidden rounded-2xl shadow-md w-[100%] h-[350px] lg:h-[400px] xl:w-[350px] xl:h-[350px] mx-auto"
//                     >
//                       <div className="h-full flex w-full p-4 flex-col items-start justify-end">
//                         <div className="w-full h-fit flex items-start gap-4">
//                           <div className="w-fit bg-[#FFFFFF4F] border-[0.18px] border-white flex items-center gap-1 rounded-full overflow-hidden px-[2px] justify-between">
//                             <img
//                               src={star}
//                               alt="Star"
//                               className="object-contain w-[12px]"
//                             />
//                             <p className="text-[8px]">Featured</p>
//                           </div>

//                           <div className="w-fit bg-[#FFFFFF4F] border-[0.18px] border-white flex items-center gap-1 rounded-full overflow-hidden px-[2px] justify-between">
//                             <img
//                               src={calender}
//                               alt="Calendar"
//                               className="object-contain w-[12px]"
//                             />
//                             <p className="text-[8px]">OCT 17, 2024</p>
//                           </div>
//                         </div>
//                         <p className="text-[20px] lg:text-[22px] text-app-black-1 font-semibold w-[84%]">
//                           Enhance Your Productivity with AI-Powered Tools
//                         </p>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//             </Swiper>
//             <div
//               style={{ backgroundImage: `url(${gradientImage})` }}
//               className="hidden xl:block absolute w-[300px] h-[300px] right-[-10vw] top-0 z-20 overflow-hidden"
//             />
//           </div>
//         </section>
//       </div>
//     </RootLayout>
//   );
// }

// export default Dashboard;






import React, { useCallback, useEffect, useRef } from "react";
import RootLayout from "../layouts/RootLayout";
import payment from "../assets/common/payment.png";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import person from "../assets/person.png";
import gradientImage from "../assets/gradient.png";
import star from "../assets/common/star.png";
import calender from "../assets/common/calender.png";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import Cookies from "js-cookie";
import { cookieAccessKeys } from "../utils";
import { useSelector } from "react-redux";

function Dashboard() {
  const response = useSelector((state) => state.auth);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const initialDashboardCallback = useCallback(() => {
    console.log(
      Cookies.get(cookieAccessKeys?.tokens?.accessToken),
      "Access Token"
    );
    console.log(
      Cookies.get(cookieAccessKeys.tokens.refreshToken),
      "Refresh Token"
    );
  }, [cookieAccessKeys]);

  useEffect(() => {
    initialDashboardCallback();
  }, []);

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 py-4 px-8">
        <header className="text-center bg-blue-50 p-6 rounded-md shadow-md w-full lg:w-[72vw] mx-auto">
          <h1 className="text-[32px] font-bold text-app-black-1">
            Welcome Back, {response?.user?.user?.fullName}!
          </h1>
          <p className="mt-2 text-[16px] lg:text-[20px] font-light">
            We're excited to have you back! Explore our latest tools and
            features designed to make your life easier and more productive.
          </p>
          <Link to="/pr_services">
            <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
              Explore Products
            </button>
          </Link>
        </header>

        <section className="mt-8">
          <h2 className="text-[28px] lg:text-[32px] font-medium mb-4 text-app-black-1">
            AI Tools
          </h2>
          <div className="flex flex-wrap justify-between w-full lg:w-[60%] gap-4">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <img
                  key={idx + "Payment button"}
                  src={payment}
                  alt="Payment"
                  className="cursor-pointer w-[45%] lg:w-[30%] mb-4"
                />
              ))}
          </div>
        </section>

        <section className="mt-8 overflow-x-hidden">
          <div className="flex items-center justify-between mb-4 w-full lg:w-[95%]">
            <h2 className="text-[28px] lg:text-[32px] font-medium">Blogs</h2>

            <div className="flex w-fit transition-colors duration-300 justify-center">
              <div ref={prevRef} className="cursor-pointer">
                <FaCaretLeft
                  size={30}
                  className="w-fit h-fit text-app-black-1 hover:text-gray-400"
                />
              </div>

              <div ref={nextRef} className="cursor-pointer">
                <FaCaretRight
                  size={30}
                  className="w-fit h-fit text-app-black-1 hover:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <Swiper
              className="overflow-x-hidden"
              modules={[Navigation, Autoplay]}
              slidesPerView={3.3} // Number of slides shown at once
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              spaceBetween={20} // Reduced space between slides for better responsiveness
              speed={1000}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // Assign navigation refs
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                // Mobile screens
                320: {
                  slidesPerView: 1, // Show 1.5 slides on mobile
                  spaceBetween: 10, // Less space between slides on mobile
                },
                // Tablets (768px)
                768: {
                  slidesPerView: 2, // Show 2 slides on tablet
                  spaceBetween: 20, // Moderate space between slides
                },
                // Desktops (1024px)
                1024: {
                  slidesPerView: 3, // Show 3 slides on desktop
                  spaceBetween: 30, // Moderate space between slides on desktop
                },
                // Extra large screens (1280px and above)
                1280: {
                  slidesPerView: 3.3, // Show 3.3 slides on larger screens
                  spaceBetween: 40, // More space on large screens
                },
              }}
            >
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <SwiperSlide key={index} className="z-10">
                    <div
                      style={{ backgroundImage: `url(${person})` }}
                      className="bg-cover bg-center overflow-hidden rounded-2xl shadow-md w-[100%] h-[350px] lg:h-[400px] xl:w-[350px] xl:h-[350px] mx-auto"
                    >
                      <div className="h-full flex w-full p-4 flex-col items-start justify-end">
                        <div className="w-full h-fit flex items-start gap-4">
                          <div className="w-fit bg-[#FFFFFF4F] border-[0.18px] border-white flex items-center gap-1 rounded-full overflow-hidden px-[2px] justify-between">
                            <img
                              src={star}
                              alt="Star"
                              className="object-contain w-[12px]"
                            />
                            <p className="text-[8px]">Featured</p>
                          </div>

                          <div className="w-fit bg-[#FFFFFF4F] border-[0.18px] border-white flex items-center gap-1 rounded-full overflow-hidden px-[2px] justify-between">
                            <img
                              src={calender}
                              alt="Calendar"
                              className="object-contain w-[12px]"
                            />
                            <p className="text-[8px]">OCT 17, 2024</p>
                          </div>
                        </div>
                        <p className="text-[20px] lg:text-[22px] text-app-black-1 font-semibold w-[84%]">
                          Enhance Your Productivity with AI-Powered Tools
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div
              style={{ backgroundImage: `url(${gradientImage})` }}
              className="hidden xl:block absolute w-[300px] h-[300px] right-[-10vw] top-0 z-20 overflow-hidden"
            />
          </div>
        </section>
      </div>
    </RootLayout>
  );
}

export default Dashboard;
