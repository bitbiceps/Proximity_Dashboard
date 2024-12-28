import React from "react";
import RootLayout from "../layouts/RootLayout";
import { Button } from "../components/common/Button";
import { ArticlesCard } from "../components/common/ArticlesCard";
import article from "../assets/article-image.png";
import lock from "../assets/lock.svg";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../utils";
const articleData = [
  {
    head: (
      <div>
        Tech PR Agency <br /> for Startups
      </div>
    ),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere convallis ligula vitae vulputate. Mauris id ultrices mi, in tempor erat.",
    image: article,
  },
  {
    head: (
      <div>
        Tech PR Agency <br /> for Startups
      </div>
    ),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere convallis ligula vitae vulputate. Mauris id ultrices mi, in tempor erat.",
    image: article,
  },
  {
    head: (
      <div>
        Tech PR Agency <br /> for Startups
      </div>
    ),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere convallis ligula vitae vulputate. Mauris id ultrices mi, in tempor erat.",
    image: article,
  },
];

const FillQuestionnaire = () => {
  const navigate = useNavigate()
   

  return (
    <RootLayout>
      <div className="mx-[5%]">
        <div className="mt-[56px] text-[32px] leading-[38px] font-bold text-[#202224] text-center">
          Heading Of The Chosen Package
        </div>
        <div className="bg-[#FBFCFF] py-[26px] px-[40px] border-[0.6px] border-[#D5D5D5] rounded-[12px] mt-[53px]">
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              Lorem ipsum heading
            </div>
            <Button onClick={() => {
                            // dispatch(setCurrentSelectedArticle(item));
                            navigate(routes.questionnaire_form);
                          }} text={"Fill the Questionnaire"} />
          </div>
        </div>
        <div className="mt-[65px] text-[32px] leading-[38px] font-bold text-[#202224] text-center">
          Fill The Questionnaire to Unlock Articles Written for you
        </div>

        <div className="relative mt-[42px] mb-[60px] rounded-[8px] py-[40px] ">
          {/* overlay */}
          <div
            className="absolute inset-0 z-[20] rounded-[8px] bg-[#D0D0D04D] opacity-[95%] border-[1px] border-[#FE5E00] flex justify-center items-center "
            style={{
              boxShadow: "0px 0px 4px 0px #0000002B",
              backdropFilter: "blur(5px)",
            }}
          >
            <img src={lock} />
          </div>

          {/* Articles Container */}
          <div className="w-full flex justify-center gap-[20px] relative z-[10]">
            {articleData.map((item, index) => (
              <ArticlesCard
                key={index}
                image={item.image}
                head={item.head}
                content={item.content}
              />
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default FillQuestionnaire;
