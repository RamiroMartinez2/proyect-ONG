import React from "react";
import { useHistory } from "react-router-dom";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink as LinkRouterDom } from "react-router-dom";
import Sidebar from "./Sidebar";

import { useDispatch } from "react-redux";
import { SET_LOGOUT } from "./../../../features/authReducer";
import { SomosMasLogo } from "../../../assets/SomosMasLogo";

const Routes = [
  { route: "/backoffice/news", name: "Novedades" },
  { route: "/backoffice/activities", name: "Actividades" },
  { route: "/backoffice/testimonials", name: "Testimonios" },
  { route: "/backoffice/members", name: "Miembros" },
];

export default function Header() {
  const { isOpen } = useDisclosure();

  const dispatch = useDispatch();

  const [open, setopen] = React.useState(false);

  const history = useHistory();

  const handleLogout = () => {
    dispatch(SET_LOGOUT());
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={10}
        boxShadow={"lg"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"left"}>
          <HStack>
            <SomosMasLogo />
          </HStack>
          <HStack
            as={"nav"}
            ml="auto"
            spacing={10}
            display={{ base: "none", md: "flex" }}
          >
            {Routes.map((link) => (
              <NavLink
                key={link.name}
                route={link.route}
                name={link.name}
              ></NavLink>
            ))}
          </HStack>

          <Flex alignItems={"center"} ml={{ base: "auto", md: "2rem" }}>
            <Button
              bg="#FAFA88"
              mx="10px"
              cursor={"pointer"}
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>

            <IconButton
              onClick={() => {
                setopen(!open);
              }}
              style={{ padding: ".5rem" }}
              icon={<GiHamburgerMenu />}
            ></IconButton>

            {open ? <Sidebar /> : null}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Routes.map((link) => (
                <NavLink key={link.name} route={link.route} name={link.name} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export const NavLink = ({ name, route }) => {
  return (
    <LinkRouterDom
      to={route}
      exact
      activeStyle={{
        fontWeight: "bold",
        color: "#db5752",
      }}
      className="nav-link"
    >
      {name}
    </LinkRouterDom>
  );
};
