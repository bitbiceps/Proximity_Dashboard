import RootLayout2 from "../layouts/RootLayout2";
import noMessage from "../assets/noMessage.jpg"

const TeamMessage = () => {
    return ( 
    <RootLayout2>
      <div className="flex flex-col items-center justify-center  min-h-[95vh] md:min-h-[70vh] 2xl:h-[90vh] rounded-lg shadow-md">
        <div className="w-[90%] md:w-[35%] lg:w-[25%]">
             <img src={noMessage} className="rounded-md shadow-lg" alt="no messsage illustration"/>
        </div>
        <p className="text-gray-500 text-xl md:text-2xl mt-12 lg:text-4xl">No team messages yet.</p>
      </div>
    </RootLayout2>
    );
  };
  
  export default TeamMessage;
  