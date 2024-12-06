import React from "react";
import RootLayout from "../layouts/RootLayout";
import { PricingCard } from "../components/common/PricingCard";

const priceData = [
  {
    category: "Basic",
    duration: "Monthly Charge",
    price: "$14.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    category: "Basic",
    duration: "Monthly Charge",
    price: "$14.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    category: "Basic",
    duration: "Monthly Charge",
    price: "$14.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
];

export const Pricing = () => {
  return (
    <RootLayout>
      <div>
        <div className="text-center text-[32px] text-[#202224] font-bold my-[50px] ">Tech PR Agency For Startups</div>
        <div className="flex flex-row flex-wrap gap-y-[50px] justify-center gap-[4%] mb-[100px] ">
            {priceData.map((data, index) => (
            <div key={index}>
                <PricingCard
                category={data.category}
                duration={data.duration}
                price={data.price}
                included={data.included}
                excluded={data.excluded}
                />
            </div>
            ))}
        </div>
      </div>
    </RootLayout>
  );
};
