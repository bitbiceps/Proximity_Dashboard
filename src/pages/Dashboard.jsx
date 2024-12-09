import React, { useRef } from "react";
import RootLayout from "../layouts/RootLayout";

function Dashboard() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.children[0].offsetWidth;
      const scrollAmount = cardWidth + 16;

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <RootLayout>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="text-center bg-blue-50 p-6 rounded-md shadow-md">
          <h1 className="text-2xl font-bold">Welcome Back Sana!</h1>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            posuere convallis ligula vitae vulputate.
          </p>
          <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
            Explore Products
          </button>
        </header>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">AI Tools</h2>
          <div className="flex justify-around space-x-4">
            {["Payment", "Payment", "Payment"].map((tool, index) => (
              <button
                key={index}
                className="border border-purple-500 text-purple-500 py-2 px-4 rounded-md hover:bg-purple-100 flex items-center space-x-2"
              >
                <span className="material-icons text-purple-500">
                  credit_card
                </span>
                {tool}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 overflow-x-hidden">
          <div className="flex items-center justify-start mb-4">
            <h2 className="text-xl font-semibold">Blogs</h2>

            <div className="flex ">
              <button
                onClick={() => scroll("left")}
                className="bg-white border shadow-md rounded-full p-2 hover:bg-gray-100"
              >
                ❮
              </button>
              <button
                onClick={() => scroll("right")}
                className="bg-white border shadow-md rounded-full p-2 hover:bg-gray-100"
              >
                ❯
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex overflow-hidden space-x-4"
            style={{
              paddingRight: "calc(50% - 128px)",
              scrollSnapType: "x mandatory",
            }}
          >
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 bg-white shadow-md rounded-md scroll-snap-align"
                  style={{
                    scrollSnapAlign: "start",
                  }}
                >
                  <img
                    src="https://via.placeholder.com/300x200"
                    alt="Blog"
                    className="w-full h-40 object-cover rounded-t-md"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">Nature</p>
                    <h3 className="text-lg font-bold mb-2">
                      Lorem Ipsum Diator Heading
                    </h3>
                    <p className="text-gray-600 text-sm">Oct 11, 2023</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </RootLayout>
  );
}

export default Dashboard;
