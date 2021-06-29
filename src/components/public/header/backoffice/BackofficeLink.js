import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const BackofficeLink = ({ section, routes }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        fontWeight="regular"
        rightIcon={<ChevronDownIcon />}
        height="1.3em"
        padding="0"
        margin="0"
        bg="white"
        color="brandBlue.400"
        _hover={{ color: "brandBlue.300" }}
        _active={{ borderColor: "gray.100" }}
        _focus={{ borderColor: "gray.100" }}
      >
        {section}
      </MenuButton>
      <MenuList>
        {routes.map((route, index) => (
          <Box key={index}>
            <Link to={route.createRoute}>
              <MenuItem _hover={{ color: "brandBlue.300" }} textDecor="none">
                {route.createName}
              </MenuItem>
            </Link>
            <Link to={route.listRoute}>
              <MenuItem _hover={{ color: "brandBlue.300" }}>
                {route.listName}
              </MenuItem>
            </Link>
          </Box>
        ))}
      </MenuList>
    </Menu>
  );
};
