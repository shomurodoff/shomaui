import React from "react";
import Header from "./header";
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mt-16">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
