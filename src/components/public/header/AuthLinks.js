import { Flex } from "@chakra-ui/react";
import React from "react";

import { LoggedInLinks } from "./LoggedInLinks";
import { LoggedOutLinks } from "./LoggedOutLinks";

export const AuthLinks = ({ username, isMobile }) => {
  return (
    <Flex alignItems="center">
      {username ? (
        <LoggedInLinks username={username} isMobile={isMobile} />
      ) : (
        <LoggedOutLinks isMobile={isMobile} />
      )}
    </Flex>
  );
};
