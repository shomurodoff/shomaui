import React from "react";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { hotkeysDevtoolsPlugin } from "@tanstack/react-hotkeys-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { pacerDevtoolsPlugin } from "@tanstack/react-pacer-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";

const Index: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <TanStackDevtools
        eventBusConfig={{
          debug: false,
        }}
        config={{
          position: "bottom-left",
        }}
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "TanStack Query",
            render: <ReactQueryDevtools />,
          },
          hotkeysDevtoolsPlugin(),
          pacerDevtoolsPlugin(),
          formDevtoolsPlugin(),
        ]}
      />
    </>
  );
};

export default Index;
