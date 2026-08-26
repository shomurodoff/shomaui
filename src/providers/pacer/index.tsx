import React from "react";
import { PacerProvider } from "@tanstack/react-pacer";

const Index: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PacerProvider
      defaultOptions={{
        debouncer: { wait: 1000 },
      }}
    >
      {children}
    </PacerProvider>
  );
};

export default Index;
