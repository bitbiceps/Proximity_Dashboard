import RootLayout2 from "../layouts/RootLayout2";
import noMessage from "../assets/noMessage.jpg";
import { useSelector, useDispatch } from "react-redux";
import { FaClock } from "react-icons/fa";
import dayjs from "dayjs";
import { MdRefresh } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchMessages } from "../redux/slices/messageSlice";

const TeamMessage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state) => state.auth.user?.user?._id);
  const userTeamMessage = useSelector((state) => state.message.messages) || [];
  console.log('userTeanMessage',userTeamMessage);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMessages(userId));
    }
  }, [dispatch, userId]);

  const handleRefreshMessage = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      await dispatch(fetchMessages(userId)).unwrap();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootLayout2>
      <div className="flex justify-between items-center p-3">
        <h1 className="text-center font-semibold text-lg md:text-2xl text-gray-700">
          Team Messages
        </h1>
        <button
          className="flex items-center justify-between gap-1 bg-app-blue-1 text-white hover:scale-110 p-2 rounded-md transition-all"
          onClick={handleRefreshMessage}
          disabled={loading}
        >
          <MdRefresh className={`${loading ? "animate-spin" : ""}`} size={24} />
          <div className="font-semibold text-sm md:text-sm">
            {loading ? "Loading..." : "Refresh"}
          </div>
        </button>
      </div>

      {/* Message List */}
      {userTeamMessage.length > 0 ? (
        <div className="flex flex-col min-h-[95vh] md:min-h-[70vh] 2xl:h-[90vh] p-4 rounded-lg shadow-md">
          <div className="w-full px-2 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {userTeamMessage.map((item, index) => (
              <div
                className={`w-full p-3 flex flex-col justify-between border-2 border-gray-300 rounded-md ${item.status === 'sent' ? 'bg-blue-200' : 'bg-gray-200'}`}
                key={item._id || index}
              >
                <div className="text-[14px] md:text-[16px] text-blue-950 font-medium">
                  {item.content}
                </div>
                <div className="">
                   {
                      item.messageType === 'topic_update' && item.topicContent?.status == 'approved' && <div className="mt-3">
                            <div className="text-[12px] md:text-[14px] text-gray-900 flex flex-col gap-1">
                                 <div className="text-gray-700 font-semibold text-nowrap">Updated Topic : </div> 
                                 <div>{item.topicContent.topic} </div>
                            </div> 
                            <div className="text-[10px] mt-2 md:text-[12px] text-gray-700 font-medium">
                                {item.topicContent.message}
                            </div>
                        </div>
                   } 
                </div>
                <div className="flex text-[10px] md:text-[14px] items-center justify-end gap-2 mt-2">
                  <FaClock size={18}/>
                  <div className="font-semibold">
                    {dayjs(item.createdAt).format("DD MMM ,YYYY")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[95vh] md:min-h-[70vh] 2xl:h-[90vh] rounded-lg shadow-md">
          <div className="w-[90%] md:w-[35%] lg:w-[25%]">
            <img src={noMessage} className="rounded-md shadow-lg" alt="No message illustration" />
          </div>
          <p className="text-gray-500 text-base xl:text-xl mt-12 lg:text-4xl">
            No team messages yet.
          </p>
        </div>
      )}
    </RootLayout2>
  );
};

export default TeamMessage;
