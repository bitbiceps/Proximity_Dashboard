import React from 'react';

const TruncatedText = ({ content }) => {
  // Function to truncate the text after 30 words
  const truncateText = (text, wordLimit) => {
    if (typeof text !== 'string') {
      return ''; // Return an empty string if content is not a string
    }

    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'; // Truncate and add ellipsis
    }
    return text; // Return original text if word count is within limit
  };

  return (
    <div className="mt-[14px] text-[14px] leading-[20px] text-[#202224] font-normal text-start">
      {truncateText(content, 30)}
    </div>
  );
};

export default TruncatedText;
