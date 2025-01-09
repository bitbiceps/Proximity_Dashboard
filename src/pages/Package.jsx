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
    included: [
      "24/7 Customer Support",
      "Free Consultation",
      "Access to Basic Tools",
    ],
    excluded: ["Premium Support", "Advanced Features", "Custom Integrations"],
  },
  {
    id: 2,
    category: "Visa Service",
    duration: "Monthly Charge",
    price: "$16.99",
    included: ["Document Review", "Visa Assistance", "Application Guidance"],
    excluded: [
      "Priority Processing",
      "Expedited Visa Service",
      "Personalized Consultation",
    ],
  },
  {
    id: 3,
    category: "Company Boost",
    duration: "Monthly Charge",
    price: "$18.99",
    included: [
      "Business Strategy Session",
      "Website Optimization",
      "Marketing Materials",
    ],
    excluded: [
      "Premium Business Coaching",
      "Advanced Analytics",
      "Customized Solutions",
    ],
  },
  {
    id: 4,
    category: "Startup Boost",
    duration: "Monthly Charge",
    price: "$19.99",
    included: ["Startup Consulting", "Market Research", "Growth Strategy"],
    excluded: [
      "Private Investors Access",
      "Full Business Automation",
      "Financial Planning Services",
    ],
  },
  {
    id: 5,
    category: "Writing Service",
    duration: "Monthly Charge",
    price: "$20.99",
    included: ["Content Creation", "SEO Optimization", "Article Revisions"],
    excluded: [
      "Custom Illustrations",
      "Social Media Management",
      "Video Content Creation",
    ],
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
