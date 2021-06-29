import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const HeaderLink = ({ url, name }) => {
  return (
    <Flex margin="1em" alignItems="center">
      <Link to={url}>
        <Text color="brandBlue.400" _hover={{ color: "brandBlue.300" }}>
          {name}
        </Text>
      </Link>
    </Flex>
  );
};
