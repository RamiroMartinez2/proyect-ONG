import { Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { SomosMasLogo } from "../../../assets/SomosMasLogo";
import { ActivitiesMenu } from "../layout/ActivitiesMenu";
import { AuthLinks } from "./AuthLinks";
import { HeaderRoutes } from "./HeaderRoutes";
import { HeaderMenuBtn } from "./HeaderMenuBtn";
import { HeaderDrawer } from "./HeaderDrawer";
import { DonateBtn } from "./DonateBtn";
import { BackofficeRoutes } from "./backoffice/BackofficeRoutes";
import { BackofficeDrawer } from "./backoffice/BackofficeDrawer";
import { BackofficeBtn } from "./backoffice/BackofficeBtn";
import { PublicBtn } from "./PublicBtn";

export const HeaderMain = ({ isBackoffice }) => {
  const publicRoutes = [
    { url: "/us", name: "Nosotros" },
    { url: "/novedades", name: "Novedades" },
    { url: "/contacto", name: "Contacto" },
    { url: "/testimonios", name: "Testimonios" },
  ];

  const checkDataInLocalStorage = () => {
    if (localStorage.getItem("data")) {
      return true;
    } else return false;
  };

  const parseUserData = () => {
    const userData = JSON.parse(localStorage.getItem("data"));
    return userData;
  };

  const checkIfAdmin = (userData) => {
    if (userData.role_id === 0) return true;
    return false;
  };

  const returnNeededData = () => {
    const isUserData = checkDataInLocalStorage();
    if (isUserData) {
      const userData = parseUserData();
      const isAdmin = checkIfAdmin(userData);
      const username = userData.name;
      return { username, isAdmin };
    }
    const username = undefined;
    const isAdmin = false;
    return { username, isAdmin };
  };

  const { username, isAdmin } = returnNeededData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex height="5em" boxShadow="sm">
      <Flex alignItems="center" margin="1em">
        <SomosMasLogo />
      </Flex>
      {isBackoffice ? (
        <>
          <Flex
            marginLeft="auto"
            marginRight="1em"
            display={{ base: "none", md: "none", lg: "none", xl: "flex" }}
          >
            <PublicBtn />
            <BackofficeRoutes />
            <AuthLinks username={username} />
          </Flex>
          <HeaderMenuBtn onOpen={onOpen} isBackoffice={true} />
          <BackofficeDrawer
            onClose={onClose}
            isOpen={isOpen}
            username={username}
            isMobile={true}
          />
        </>
      ) : (
        <>
          <Flex
            marginLeft="auto"
            marginRight="1em"
            alignItems="center"
            display={{ base: "none", md: "none", lg: "flex" }}
          >
            <BackofficeBtn isAdmin={isAdmin} />
            <ActivitiesMenu />
            <HeaderRoutes routes={publicRoutes} />
            <AuthLinks username={username} />
            <DonateBtn />
          </Flex>
          <HeaderMenuBtn onOpen={onOpen} />
          <HeaderDrawer
            onClose={onClose}
            isOpen={isOpen}
            routes={publicRoutes}
            username={username}
            isAdmin={isAdmin}
          />
        </>
      )}
    </Flex>
  );
};
