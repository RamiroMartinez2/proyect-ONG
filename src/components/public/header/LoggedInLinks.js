import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { SET_LOGOUT } from "../../../features/authReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const LoggedInLinks = ({ username, isMobile }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const handleLogout = () => {
    dispatch(
      SET_LOGOUT({
        name: null,
        email: null,
        role_id: null,
        loggedIn: false,
      })
    );
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    history.push("/login");
  };

  return (
    <Flex flexDir={isMobile ? "column" : "row"}>
      <Button
        variant="somosMasOutline"
        borderWidth="0"
        color="brandBlue.400"
        cursor="default"
        _hover={{ color: "brandBlue.300" }}
        _focus={{ borderRadius: "0" }}
        leftIcon={<FaUser />}
        textTransform="capitalize"
        size="sm"
      >
        {username}
      </Button>
      <Button
        variant="dangerOutline"
        marginLeft="1em"
        onClick={handleLogout}
        size="sm"
      >
        Cerrar Sesión
      </Button>
    </Flex>
  );
};
