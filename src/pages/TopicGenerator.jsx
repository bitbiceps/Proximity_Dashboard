import React, { useCallback, useEffect, useState } from "react";
import RootLayout from "../layouts/RootLayout";
import { useSelector } from "react-redux";
import { baseURL } from "../axios/instance";
import { toast } from "react-toastify";
import Loading from "../components/common/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopicGenerator = ({ topicId }) => {
  const currentSelectedTopic = useSelector(
    ({ topics: { currentSelectedTopic } }) => currentSelectedTopic
  );
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [topics, setTopics] = useState([]);
  const [parentId, setParentId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [editTopicRequest , setEditTopicRequest] = useState(false);
  const [suggestionData, setSuggestionData] = useState({
    topic : "",
    message : ""
  }); // State for modal input

  const handleSuggestedModal = (e) => {
    const { name, value } = e.target;
    setSuggestionData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const fetchTopicById = useCallback(async () => {
    try {
      const url = `${baseURL}/topic/get?topicId=${currentSelectedTopic}`; // Use the full backend URL

      const { data } = await axios.get(url);

      setEditTopicRequest(data.topic?.suggestion?.topic ? true : false);
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
    } catch (error) {
      console.error("Error verifying topic:", error);
    }
  };

  const handleUpdate = async (topicId, index) => {
    try {
      const response = await axios.put(`${baseURL}/topic/request-update`, {
        topicId,
        index,
      });
      if (response.status === 200) {
        setTopics(response?.data?.data?.topics);
        toast.success("Topic updated successfuly");
      }
    } catch (error) {
      toast.error("You can only update once");
      console.error("Error verifying topic:", error);
    }
  };

  const handleSubmit = async (_id) => {
    try {
      const response = await axios.put(`${baseURL}/topic/submit`, {
        _id,
      });
      if (response.data.message === "Topic submitted successfully") {
        navigate("/topic_unlocked");
      }
    } catch (err) {
      console.error("Error verifying topic:", err);
    }
  };

  const handleSuggestionSubmit = async (topicId) => {
    
    if(!suggestionData.topic || !suggestionData.message){
         toast.error('Please fill all required fields');
         return ;
    }

    try {
      const response = await axios.put(`${baseURL}/topic/add-suggestion`, {
        topicId,
        suggestedTopic : suggestionData.topic,
        message : suggestionData.message
      });
      toast.success(response.data?.message);
      setEditTopicRequest(true)
      setSuggestionData({
        topic: "",
        message: ""
      });

      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.data?.response?.message || 'Error while giving suggestion');
    }
  };

  const handleModalClose = ( ) => {
    setIsModalOpen(false);
    setSuggestionData({
      title : "",
      message : ""
    })
  }

  const handleSuggestionModalClick = () => {
    if(editTopicRequest) {
      toast.error('You alreading having one pending request');
      return ;
    }
    setIsModalOpen(true);
  }

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
          <div className="w-full  md:max-w-3xl lg:max-w-5xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Generated Titles
            </h2>
            <div className="space-y-6 mt-8">
              {topics.map((title, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center gap-2 justify-between p-4 bg-gray-50 border border-gray-300 rounded-lg"
                >
                  <span className="text-gray-700 font-semibold">
                    {title.value}
                  </span>
                  <div className=" flex justify-between mt-2 md:mt-0 gap-2">
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
                    <button
                      disabled={title?.verifyRequested}
                      onClick={() => handleUpdate(currentSelectedTopic, index)}
                      className="px-4 py-2 text-sm font-medium border border-[#00CDE2] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                      {
                        title.updateRequested ? 'Updated' : 'Update'
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between gap-2 justify-self-center items-center mt-16">
              <button
                onClick={handleSuggestionModalClick} // Open modal
                className="px-4 py-2 border border-[#4D49F6] rounded-lg 
             text-[#4D49F6] font-medium transition-all duration-300
             hover:bg-[#4D49F6]/10 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#4D49F6]/50"
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
          className="fixed  inset-0 z-50 backdrop-blur-md bg-black bg-opacity-40 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // Close modal on overlay click
        >
          <div
            className="relative bg-white  p-2 md:p-6 rounded-lg w-[90%]  md:w-[60%] xl:w-[50%]"
            onClick={(e) => e.stopPropagation()}
          >
          <div>
              <div className="flex flex-col space-y-4">
                <div>
                  <label className="text-gray-500 text-sm md:text-base font-semibold">Suggested Topic * </label>
                  <input
                    onChange={handleSuggestedModal}
                    placeholder="Enter your message here..."
                    name="topic"
                    className="w-full p-2 mt-2 border border-gray-300 focus:outline-none bg-[#4D49F60F] border-dashed rounded-md"
                  ></input>
                </div>
                <div>
                  <label className="text-gray-500 text-sm md:text-base font-semibold">Message * </label>
                  <textarea
                    onChange={handleSuggestedModal}
                    name="message"
                    placeholder="Enter your message here..."
                    rows={4}
                    className="w-full  mt-2  p-2 border border-gray-300 focus:outline-none bg-[#4D49F60F] border-dashed rounded-md"
                  ></textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-center w-full space-x-4">
                <button
                  onClick={handleModalClose}
                  className="px-[40px] py-[8px] bg-gray-700 text-white hover:scale-105 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSuggestionSubmit(parentId)}
                  className="inline-flex h-12 hover:animate-shimmer items-center justify-center rounded-md px-[35px] bg-[linear-gradient(110deg,#4D49F6,45%,#4D49F690,55%,#4D49F6)] bg-[length:250%_100%] font-medium hover:scale-105 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  SUBMIT
                </button>
              </div>
            </div>  
          </div>
        </div>
      )}
    </RootLayout>
  );
};

export default TopicGenerator;
