import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ActivitiesMenu = () => {
  const { organization } = useSelector((state) => ({ ...state }));
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
        Actividades
      </MenuButton>
      <MenuList>
        <MenuItem _hover={{ color: "brandBlue.300" }}>
          <Link to="/actividades">Todas las actividades</Link>
        </MenuItem>
        {organization.activitiesData
          ? organization.activitiesData.map((activity) => (
              <MenuItem key={activity.id} _hover={{ color: "brandBlue.300" }}>
                <Link to={`/actividades/${activity.id}`}>{activity.name}</Link>
              </MenuItem>
            ))
          : "Loading..."}
      </MenuList>
    </Menu>
  );
};
