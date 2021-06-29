import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";

export const HeaderMenuBtn = ({ onOpen, isBackoffice }) => {
  return (
    <Flex
      display={
        isBackoffice
          ? { base: "flex", md: "flex", lg: "flex", xl: "none" }
          : { base: "flex", md: "flex", lg: "none" }
      }
      alignItems="center"
      marginLeft="auto"
      marginRight="2em"
    >
      <IconButton
        borderRadius="5px"
        icon={<HamburgerIcon />}
        aria-label="Open Menu"
        fontSize="2xl"
        onClick={onOpen}
      />
    </Flex>
  );
};
