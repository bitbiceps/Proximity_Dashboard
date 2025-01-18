import React from "react";
import Header from "../components/common/Header";

const RootLayout2 = ({ children }) => {
  return (
    <>
      <Header />
      <div className="bg-blue-50 lg:p-4">{children}</div>
    </>
  );
};

export default RootLayout2;
