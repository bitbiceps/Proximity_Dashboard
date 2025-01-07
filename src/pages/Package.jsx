import React from "react";
import RootLayout from "../layouts/RootLayout";
import { PricingCard } from "../components/common/PricingCard";
import { useSelector } from "react-redux";
const priceData = [
  {
    id: 1,
    category: "Individual Services",
    duration: "Monthly Charge",
    price: "$14.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    id: 2,
    category: "Visa Service",
    duration: "Monthly Charge",
    price: "$16.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    id: 3,
    category: "Company Boost",
    duration: "Monthly Charge",
    price: "$18.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    id: 4,
    category: "Startup Boost",
    duration: "Monthly Charge",
    price: "$19.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
  {
    id: 5,
    category: "Writing Service",
    duration: "Monthly Charge",
    price: "$20.99",
    included: ["Lorem ipsum", "Lorem ipsum dolor sit"],
    excluded: ["Lorem ipsum dolor sit", "Lorem ipsum dolor sit"],
  },
];

const Package = () => {
  const { user, loading, error, registerUser } = useSelector(
    (state) => state.auth
  );
  // console.log("userssssssss",user.user.planId)
  const cardId = user.user.paymentStatus === true ? user.user.planId : null;
  console.log("cardId", cardId);
  return (
    <RootLayout>
    <div>
      <div className="text-center text-[32px] text-[#202224] font-bold my-[50px] ">
        Tech PR Agency For Startups
      </div>
      <div className="flex flex-row flex-wrap gap-y-[50px] justify-center gap-[4%] mb-[100px] ">
        {priceData.map((data, index) => (
          <div key={index}>
            <PricingCard
              active={cardId === data.id} 
              id={data.id}
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
export default Package;
