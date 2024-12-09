import React from "react";
import { ArticlesCard } from "../components/common/ArticlesCard";
import article from "../assets/article-image.png";
import RootLayout from "../layouts/RootLayout";
const ArticlesUnlocked = () => {
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
  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
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
    </RootLayout>
  );
};

export default ArticlesUnlocked;
