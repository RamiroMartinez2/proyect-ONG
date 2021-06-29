import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose as CloseIcon } from "react-icons/gr";
import { NavLink as LinkRouterDom, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../../scss/app.scss";
import ItemCategories from "./ItemCategories";
import { SET_LOGOUT } from "../../../features/authReducer";
import "../../../scss/app.scss";
// import ItemCategories from "./ItemCategories";
import { SomosMasLogo } from "../../../assets/SomosMasLogo";
import { ActivitiesMenu } from "./ActivitiesMenu";

const Routes = [
  { route: "/us", name: "Nosotros" },
  { route: "/novedades", name: "Novedades" },
  { route: "/contacto", name: "Contacto" },
  { route: "/testimonios", name: "Testimonios" },
  // { route: "/login", name: "Iniciar Sesion" },
];

export default function HeaderPublic() {
  const [display, setDisplay] = useState("none");
  const dispatch = useDispatch();
  let history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // PARA USAR INFO DESDE REDUX
  // const logo = useSelector((state) => state.organization.organizationData.logo);
  // const userName = useSelector((state) => state.register.user.name);
  // const Logged = useSelector(selectUser.loggedIn);
  const Logged = useSelector((state) => state.user.user.loggedIn);
  const Name = useSelector((state) => state.user.user.name);
  console.log(Logged);

  // console.log(Logged.loggedIn);

  const hadleLogout = () => {
    dispatch(
      SET_LOGOUT({
        name: null,
        email: null,
        role_id: null,
        loggedIn: false,
      })
    );
    localStorage.removeItem("token");
    history.push("/login");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={10}>
        <Flex h={16} alignItems={"center"} justifyContent={"left"}>
          <HStack>
            {/* <LinkRouterDom to="/">
              <img src={logo} width="120px" alt="Somos más logo" />
            </LinkRouterDom> */}
            {/* <span> {userName} </span> */}
            <SomosMasLogo />
          </HStack>
          <HStack
            as={"nav"}
            ml="auto"
            spacing={10}
            display={{ base: "none", md: "none", lg: "flex" }}
          >
            {Logged ? (
              <Text mr="1rem" fontSize="xl" color="gray.500">
                {" "}
                Bienvenido {Name}
              </Text>
            ) : null}

            <ActivitiesMenu />
            {Routes.map((link) => (
              <NavLink key={link.name} route={link.route} name={link.name} />
            ))}

            {/* Donations */}
            <DonateButton />

            {/* <Flex> */}
            {Logged ? (
              <Button
                onClick={hadleLogout}
                bg="red.300"
                color="white"
                textColor="white"
              >
                {" "}
                Cerrar Sesion{" "}
              </Button>
            ) : (
              <Button
                onClick={handleLogin}
                bg="blue.300"
                textColor="white"
                _hover={{ textColor: "blue.300", background: "white" }}
              >
                Iniciar Sesion
              </Button>
            )}
            {/* </Flex> */}
          </HStack>

          <Flex
            alignItems={"center"}
            ml={{ base: "auto", md: "auto", lg: "2em" }}
          >
            <IconButton
              aria-label="Open Menu"
              size="lg"
              mr={2}
              icon={<GiHamburgerMenu />}
              display={["flex", "flex", "flex", "none"]}
              onClick={onOpen}
            />
          </Flex>
        </Flex>
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Flex flexDir="column" align="center">
                <ActivitiesMenu />
                {Routes.map((link) => (
                  <NavLink
                    key={link.name}
                    route={link.route}
                    name={link.name}
                  />
                ))}

                <DonateButton />

                {Logged ? (
                  <Button
                    onClick={hadleLogout}
                    bg="red.300"
                    color="white"
                    textColor="white"
                    mt={2}
                  >
                    {" "}
                    Cerrar Sesion{" "}
                  </Button>
                ) : (
                  <Button
                    onClick={handleLogin}
                    bg="blue.300"
                    textColor="white"
                    mt={2}
                    _hover={{ textColor: "blue.300", background: "white" }}
                  >
                    Iniciar Sesion
                  </Button>
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Flex
          w="100vw"
          bgColor="gray.100"
          zIndex={20}
          pb={10}
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
          display={display}
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={5}
              aria-label="CloseMenu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => setDisplay("none")}
            />
          </Flex>
          <Flex flexDir="column" align="center">
            <ActivitiesMenu />
            {Routes.map((link) => (
              <NavLink key={link.name} route={link.route} name={link.name} />
            ))}

            {/* Donations */}
            <DonateButton />
          </Flex>
        </Flex>
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
      {name === "Actividades" && <ItemCategories />}
    </LinkRouterDom>
  );
};

export const DonateButton = () => {
  const router = useHistory();
  function handleClick() {
    router.push("/donar");
  }
  return (
    <Button
      mt="1rem"
      bg="white"
      _hover={{ backgroundColor: "#DB5752", color: "white" }}
      border="solid 3px #DB5752"
      color="#DB5752"
      borderRadius="4px"
      onClick={handleClick}
    >
      Donar
    </Button>
  );
};
