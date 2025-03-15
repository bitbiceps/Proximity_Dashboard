import RootLayout2 from "../layouts/RootLayout2";
import noMessage from "../assets/noMessage.jpg"
import { useSelector  , useDispatch} from "react-redux";
import { FcClock } from "react-icons/fc";
import dayjs from "dayjs";
import { MdRefresh } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchUserData} from "../redux/slices/authSlice";
const TeamMessage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userDatatTemp = useSelector((state) => state.auth.user.user);
  const [userData, setUserData] = useState(userDatatTemp);
  const [userTeamMessage, setUserTeamMessage] = useState(userDatatTemp?.teamReply || []);

  const handleRefreshMessage = async () => {
    setLoading(true);
    try {
      const updatedUserData = await dispatch(fetchUserData(userData._id)).unwrap();
      setUserData(updatedUserData.user);
    } catch (error) {
      console.log("Error while fetching the user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUserTeamMessage(userData?.teamReply || []);
  }, [userData]);

  return (
    <RootLayout2>
      <div className="flex justify-between items-center p-3">
        <h1 className="text-center font-semibold text-lg md:text-2xl text-gray-700">Team Messages</h1>
        <button
          className="flex items-center justify-between gap-1 bg-app-blue-1 text-white hover:scale-110 p-2 rounded-md transition-all"
          onClick={handleRefreshMessage}
        >
          <MdRefresh className={`${loading ? "animate-spin" : ""}`} size={24} />
          <div className="font-semibold text-sm md:text-sm">{loading ? "Loading..." : "Refresh"}</div>
        </button>
      </div>

      {userTeamMessage.length > 0 ? (
        <div className="flex flex-col min-h-[95vh] md:min-h-[70vh] 2xl:h-[90vh] p-4 rounded-lg shadow-md">
          <div className="w-full px-2 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {userTeamMessage.map((item, index) => (
              <div className="w-full p-3 flex flex-col justify-between border-2 border-gray-300 rounded-md" key={index}>
                <div className="text-[12px] md:text-[16px] text-blue-950 font-medium">
                  {item.message}
                </div>
                <div className="flex text-[10px] md:text-[12px] items-center justify-end gap-2 mt-2">
                  <FcClock /> <div className="font-semibold"> {dayjs(item.createdAt).format("DD MMM ,YYYY")} </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[95vh] md:min-h-[70vh] 2xl:h-[90vh] rounded-lg shadow-md">
          <div className="w-[90%] md:w-[35%] lg:w-[25%]">
            <img src={noMessage} className="rounded-md shadow-lg" alt="no message illustration" />
          </div>
          <p className="text-gray-500 text-base xl:text-xl mt-12 lg:text-4xl">No team messages yet.</p>
        </div>
      )}
    </RootLayout2>
  );
};

export default TeamMessage;
