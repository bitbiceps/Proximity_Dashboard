import React from "react";
import Product1 from "../assets/product-image-1.svg";
import Product2 from "../assets/product-image-2.svg";
import Product3 from "../assets/product-image-3.svg";
import Product4 from "../assets/product-image-4.svg";
import Product5 from "../assets/product-image-5.svg";
import Product6 from "../assets/product-image-6.svg";
import Product7 from "../assets/product-image-7.svg";
import RootLayout from "../layouts/RootLayout";
import { CgLock } from "react-icons/cg";

const PRServices = () => {
  const services = [
    { title: "PR for Immigration", image: Product1, locked: false },
    { title: "Tech PR Agency for Startups", image: Product2, locked: true },
    { title: "Publishing Services", image: Product3, locked: true },
    { title: "Arts & Entertainment PR", image: Product4, locked: true },
    { title: "B2B PR", image: Product5, locked: true },
    { title: "Health and Medtech PR", image: Product6, locked: true },
    { title: "PR For Businesses", image: Product7, locked: true },
  ];

  return (
    <RootLayout>
      <div className="bg-gray-100 py-10">
        <h2 className="text-center text-3xl font-bold mb-8">
          Tailored PR Solutions for Every Need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-28">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#00CDE21A] shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow  relative"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-48 w-full object-cover"
              />
              {service.locked && (
                <div className="h-48 absolute top-0 left-0 w-full flex items-center justify-center bg-black bg-opacity-70">
                  <CgLock className="text-white" size={30} />
                </div>
              )}
              <div className="p-4 flex flex-col justify-between h-40">
                <h3 className="text-xl font-semibold text-center">
                  {service.title}
                </h3>
                <div className="flex justify-center">
                  <button
                    disabled={service.locked}
                    className={`bg-[#4D49F6] text-white py-3 px-4 rounded hover:bg-blue-600 transition-colors ${
                      service.locked ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    Choose Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default PRServices;
