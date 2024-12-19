import React from "react";
import RootLayout from "../layouts/RootLayout";
import { PricingCard } from "../components/common/PricingCard";

const priceData = [
  {
    id: 1,
    category: "Basic",
    duration: "Monthly Charge",
    price: "$14.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    id: 2,

    category: "Basic",
    duration: "Monthly Charge",
    price: "$16.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    id: 3,

    category: "Basic",
    duration: "Monthly Charge",
    price: "$18.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    id: 4,

    category: "Basic",
    duration: "Monthly Charge",
    price: "$18.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    id: 5,

    category: "Basic",
    duration: "Monthly Charge",
    price: "$18.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
];

export const Pricing = () => {
  return (
    <RootLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-screen-lg p-4">
          <div className="text-center text-[32px] text-[#202224] font-bold my-[50px]">
            Tech PR Agency For Startups
          </div>
          <div className="flex flex-row flex-wrap gap-y-[50px] justify-center gap-[4%] mb-[100px]">
            {priceData.map((categoryData, categoryIndex) => (
              <div key={categoryIndex} className="w-full">
                <div className="text-[24px] font-semibold mb-[20px]">
                  {categoryData.category}
                </div>
                <div className="flex flex-wrap gap-[30px]">
                  {categoryData.items.map((item, itemIndex) => (
                    <PricingCard
                      key={itemIndex}
                      category={item.title}
                      price={item.price}
                      duration=""
                      included={item.included}
                      excluded={item.excluded}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};
