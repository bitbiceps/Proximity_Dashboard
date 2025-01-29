import React, { useCallback, useEffect, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { useSelector } from "react-redux";
import requests, { baseURL } from "../axios/instance";
import { toast } from "react-toastify";
import Loading from "../components/common/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const TopicGenerator = ({ topicId }) => {
  const article = useSelector(
    ({ articles: { currentSelectedArticle } }) => currentSelectedArticle
  );
  const currentSelectedTopic = useSelector(
    ({ topics: { currentSelectedTopic } }) => currentSelectedTopic
  );
  console.log("selected id ", currentSelectedTopic)
  const articles = useSelector(({ articles: { articles } }) => articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state) => state.auth
  );



  const [topics, setTopics] = useState([]);
  const [parentId, setParentId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [suggestion, setSuggestion] = useState(""); // State for modal input

  //get topic if no topic then questionare 
  const fetchGeneratedTopic = useCallback(async () => {
    try {
      const url = `${baseURL}/topic?userId=${user.userId}`; // Use the full backend URL
      console.log("Request URL:", url);

      const { data } = await axios.get(url);

      console.log("Fetched topics:", data);

    } catch (err) {
      console.error("Error fetching topics:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchGeneratedTopic();
  }, [fetchGeneratedTopic]);
  //fetch topic 
  const fetchTopicById = useCallback(async () => {
    try {
      const url = `${baseURL}/topic/get?topicId=${currentSelectedTopic}`; // Use the full backend URL
      console.log("article to be fetiched :", currentSelectedTopic);

      const { data } = await axios.get(url);

      console.log("Fetched topics based on aritcles :", data.topic.topics);
      setParentId(data.topic._id);
      if (Array.isArray(data?.topic?.topics)) {
        setTopics(data?.topic?.topics);
      } else {
        toast.error("Topics are not available or response is malformed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  }, [user]);

  useEffect(() => {
    fetchTopicById();
  }, [fetchTopicById]);

  // const fetchTopics = useCallback(async () => {
  //   try {
  //     console.log("fetch", article._id)
  //     console.log("topics ", article.topics)
  //     const { data } = await requests.getTopics({ params: { topicId: article._id } });
  //     console.log("article._id:", article._id);
  //     console.log("data for topic generation", data)
  //     setParentId(data.topic._id);
  //     if (Array.isArray(data?.topic?.topics)) {
  //       setTopics(data?.topic?.topics);
  //     } else {
  //       toast.error("Topics are not available or response is malformed");
  //     }
  //   } catch (error) {
  //     toast.error(error.message || "Something went wrong!");
  //   }
  // }, [article]);

  // useEffect(() => {
  //   fetchTopics();
  // }, [fetchTopics]);

  const handleVerify = async (topicId, index) => {
    try {
      const response = await axios.put(`${baseURL}/topic/request-verify`, {
        topicId,
        index,
      });
      if (response.status === 200) {
        const updatedTopics = [...topics];
        updatedTopics[index].verifyRequested = true;
        setTopics(updatedTopics);
      }
      console.log("verify", response.data);
    } catch (error) {
      console.error("Error verifying topic:", error);
    }
  };

  const handleUpdate = async (topicId, index) => {
    console.log(topics)
    console.log("Inside udpate")
    try {
      const response = await axios.put(
        `${baseURL}/topic/request-update`,
        { topicId, index }
      );
      if (response.status === 200) {
        setTopics(response?.data?.data?.topics);
        toast.success("Topic updated successfuly")
      }
    } catch (error) {
      toast.error("You can only update once")
      console.error("Error verifying topic:", error);
    }
  };

  const handleSubmit = async (_id) => {
    try {
      const response = await axios.put(`${baseURL}/topic/submit`, {
        _id,
      });
      console.log("response", response);
      if (response.data.message === "Topic submitted successfully") {
        navigate("/topic_unlocked");
      }
    } catch (err) {
      console.error("Error verifying topic:", err);
    }
  };

  const handleSuggestionSubmit = async (topicId) => {
    if (suggestion.trim()) {
      const response = await axios.put(
        `${baseURL}/topic/add-suggestion`,
        {
          topicId,
          suggestion,
        }
      );
      // toast.success("Suggestion submitted successfully!");
      setSuggestion(""); // Clear the input

      setIsModalOpen(false); // Close the modal4

      if (response.data.message == "Suggestion updated successfully") {
        toast.success("Suggestion submitted successfully!");
      }
      console.log("ress", response.data);
    } else {
      toast.error("Please enter a suggestion.");
    }
  };

  return (
    <RootLayout>
      {topics ? (
        <div className="min-h-[calc(100vh-150px)] flex flex-col items-center py-8">
          {/* <div className="flex flex-col items-center mb-6">
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
          </div> */}
          <div className="w-full max-w-3xl p-6">
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
                      className={`px-6 py-2 text-sm font-medium rounded-sm ${title.verifyRequested
                          ? "bg-green-500 text-white"
                          : "bg-[#4D49F6] text-white"
                        }`}
                    >
                      {title.verifyRequested ? "Verified" : "Verify"}
                    </button>
                    <button
                      onClick={() => handleUpdate(currentSelectedTopic, index)}
                      className="px-4 py-2 text-sm font-medium border border-[#00CDE2] rounded-sm"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-16 px-40">
              <button
                onClick={() => setIsModalOpen(true)} // Open modal
                className="px-4 py-2 border border-[#00CDE2] rounded-lg hover:bg-blue-50"
              >
                Have Another Suggestion
              </button>
              <button
                onClick={() => handleSubmit(parentId)}
                className="px-8 py-2 text-white bg-[#4D49F6] rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {isModalOpen && (
        <div
          className="fixed ml-[330px] mr-[50px] mt-[120px] inset-0 z-50 backdrop-blur-md bg-black bg-opacity-40 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // Close modal on overlay click
        >
          <div
            className="relative bg-white p-10 rounded-lg w-[70vw] h-[50vh] "
            onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
          >
            {/* <h2 className="text-xl font-bold text-gray-800 mb-4">
              Suggest a New Topic
            </h2> */}
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Enter your suggestion here..."
              className="w-full h-[80%]  p-2 border border-gray-300 focus:outline-none bg-[#4D49F60F] border-dashed rounded-md"
            ></textarea>
            <div className="mt-4 flex justify-center w-full space-x-4">

              {/* <button
                onClick={() => handleSuggestionSubmit(parentId)}
                className="px-[40px] py-[8px] bg-[#4D49F6]  text-white rounded-lg"
              >
                SUBMIT
              </button> */}


              <button onClick={() => handleSuggestionSubmit(parentId)} className="inline-flex h-12 hover:animate-shimmer items-center justify-center rounded-md px-[35px] bg-[linear-gradient(110deg,#4D49F6,45%,#4D49F690,55%,#4D49F6)] bg-[length:250%_100%] font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                SUBMIT
              </button>




            </div>
          </div>
        </div>
      )}
    </RootLayout>
  );
};

export default TopicGenerator;
