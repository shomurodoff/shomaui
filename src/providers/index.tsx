import React from "react";
import Theme from "#/providers/theme";
import Query from "#/providers/query";
import Pacer from "#/providers/pacer";

const Index: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Theme>
      <Query>
        <Pacer>{children}</Pacer>
      </Query>
    </Theme>
  );
};

export default Index;
