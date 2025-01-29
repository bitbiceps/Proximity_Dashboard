import React, { useEffect, useCallback, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { setTopics, setCurrentSelectedTopic } from "../redux/slices/topicSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";
import { ArticlesCard } from "../components/common/ArticlesCard";
import article from "../assets/article-image.png";
import { TopicCard } from "../components/common/TopicCard";
import { baseURL } from "../axios/instance";

const TopicUnlocked = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [topicsData, setTopicsData] = useState([]); // State to hold raw topics data

  // Fetch topics from Redux store
  const topics = useSelector((state) => state.topics?.topics || []);
  const { user } = useSelector((state) => state.auth); // Fetch user details

  // Fetch topics from the backend
  const fetchGeneratedTopic = useCallback(async () => {
    if (!user?.userId) return; // Early return if no user is present
    try {
      const url = `${baseURL}/topic?userId=${user.userId}`;

      const { data } = await axios.get(url);

      // Directly use the fetched data without restructuring
      setTopicsData(data.data); // Set the raw data directly

      // Store raw topic data in Redux as well (if needed)
      dispatch(setTopics(data.data));
    } catch (err) {
      console.error("Error fetching topics:", err);
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetchGeneratedTopic();
  }, [fetchGeneratedTopic]);

    // Effect to reload page when switching tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Early return if no topics are available
  if (topicsData.length === 0) {
    return (
      <RootLayout>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No Topics Available
            </h2>
            <p className="text-gray-600">
              It seems like there are no topics available. Please try again
              later.
            </p>
          </div>
        </div>
      </RootLayout>
    );
  }

  // Render Topic Cards
  return (
    <RootLayout>
      <div className="min-h-[calc(100vh-140px)] bg-gray-100 flex flex-col items-center py-8 px-8 md:px-0">
        <div className="w-full h-full items-center flex flex-wrap gap-4">
          {topicsData.map((item) => (
            <TopicCard
              key={item._id} // Using unique ID for the key
              image={article}
              status={item.status}
              head={<div>{item.topics[0]?.value}</div>} // Assuming you want to display the first topic value
              content={<div>hello</div>} // Placeholder for content
              onClick={() => {
                dispatch(setCurrentSelectedTopic(item._id));
                navigate(routes.topic_generator);
              }}
              
            />
          
          ))}
          
        </div>
      </div>
    </RootLayout>
  );
};

export default TopicUnlocked;


// please verify for your title for this article
// text to add 