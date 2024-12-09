import React,{useState} from "react";
import RootLayout from "../layouts/RootLayout";
import TermsCondition from "../components/common/modal/TermsCondition";
const GeneratedArticle = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <RootLayout>
    <div className="  flex flex-col items-center py-8">
      {/* Upload Photo Section */}
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
        <button className="text-orange-500 font-medium">Upload Photo</button>
      </div>

      {/* Generated Article Section */}
      <div className="w-full max-w-4xl ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Generated Article
        </h2>
        <p className="text-gray-700 text-justify leading-relaxed mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at lacus
          sem. Fusce volutpat fermentum turpis a mollis. Pellentesque ornare
          imperdiet eros, et convallis eros tristique id. Aliquam elementum, erat
          non rhoncus tristique, risus metus malesuada sem, et tincidunt quam ex
          vel lectus. Nulla sagittis suscipit felis, laoreet consequat ligula
          fermentum nec. Morbi vestibulum elit in congue mattis. Morbi est est,
          facilisis auctor dui et, dignissim elementum augue.
        </p>
        <p className="text-gray-700 text-justify leading-relaxed mb-6">
          Phasellus non arcu laoreet, gravida ligula non, tempus libero. Donec
          volutpat erat non augue viverra, et tincidunt felis ullamcorper. Cras
          laoreet mi dictum dapibus imperdiet. Nulla tempor dolor quis ligula
          scelerisque, tincidunt ornare eros mattis. Orci varius natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse at
          mauris neque. Nunc augue ipsum, aliquam non rhoncus ac, condimentum
          commodo dui. In ornare neque sapien, sed blandit felis gravida
          scelerisque.
        </p>
        <p className="text-gray-700 text-justify leading-relaxed mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at lacus
          sem. Fusce volutpat fermentum turpis a mollis. Pellentesque ornare
          imperdiet eros, et convallis eros tristique id. Aliquam elementum, erat
         
        </p>

      
        <div className="flex justify-center space-x-4">
          <button className="px-8 py-2 text-blue-500 border border-[#4D49F6] rounded-lg ">
            Update
          </button>
          <button   onClick={() => setShowModal(true)} className="px-8 py-2 text-white bg-[#4D49F6] rounded-lg ">
            Verify
          </button>
          {showModal && <TermsCondition />}

        </div>
      </div>
    </div>
    </RootLayout>
  );
};

export default GeneratedArticle;
