import React, { useCallback, useEffect, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import requests from "../axios/instance";
import { toast } from "react-toastify";
import Loading from "../components/common/Loading";
import axios from "axios";
const TopicGenerator = () => {
  const article = useSelector(
    ({ articles: { currentSelectedArticle } }) => currentSelectedArticle
  );

  const [topics, setTopics] = useState([]);

  const fetchTopics = useCallback(async () => {
    try {
      // If no topics in the article, fetch from the API
      const { data } = await requests.addTopic({ articleId: article._id });

      // Log the response to check the structure
      console.log("API Response:", data);

      // Safely set topics, if the response is as expected
      console.log("typeof", typeof data?.topic?.topics, data?.topic?.topics);
      if (Array.isArray(data?.topic?.topics)) {
        console.log("dfghj", data?.topic?.topics);
        setTopics(data?.topic?.topics); // Set topics if it's an array
      } else {
        toast.error("Topics are not available or response is malformed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  }, [article]);
  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);
  const handleVerify = async (topicId, index) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/topic/request-verify",
        { topicId, index } 
      );

      if (response.status === 200) {
        const updatedTopics = [...topics];
        updatedTopics[index].verifyRequested = true;
        setTopics(updatedTopics);
        console.log("Topicss verified successfully:", response.data);
      }
    } catch (error) {
      console.error("Error verifying topic:", error);
    }
  };
  return (
    <RootLayout>
      {topics ? (
        <div className="min-h-screen  flex flex-col items-center py-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <button className="text-orange-500 font-medium">
              Upload Photo
            </button>
          </div>
          <div className="w-full max-w-3xl p-6 ">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Generated Titles
            </h2>
            <div className="space-y-6 mt-8">
              {topics.map((title, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 border border-gray-300 rounded-lg"
                >
                  <span className="text-gray-700 font-semibold">
                    {title.value}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleVerify(title._id, index)}
                      className={`px-6 py-2 text-sm font-medium rounded-sm ${
                        title.verifyRequested
                          ? "bg-green-500 text-white"
                          : "bg-[#4D49F6] text-white"
                      }`}
                    >
                        {title.verifyRequested ? "Verified" : "Verify"}

                    </button>
                    <button className="px-4 py-2 text-sm font-medium  border border-[#00CDE2] rounded-sm ">
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 px-40 mt-16">
              <Link to="/popup_search">
                {" "}
                <button className="px-4 py-2  border border-[#00CDE2] rounded-lg hover:bg-blue-50">
                  Have Another Suggestion
                </button>
              </Link>
              <Link to="/generated_article">
                {" "}
                <button className="px-8 py-2 text-white bg-[#4D49F6] rounded-lg hover:bg-blue-600">
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </RootLayout>
  );
};

export default TopicGenerator;
