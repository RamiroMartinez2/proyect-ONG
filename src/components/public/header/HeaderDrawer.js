import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { ActivitiesMenu } from "../layout/ActivitiesMenu";
import { AuthLinks } from "./AuthLinks";
import { BackofficeBtn } from "./backoffice/BackofficeBtn";
import { DonateBtn } from "./DonateBtn";
import { HeaderRoutes } from "./HeaderRoutes";

export const HeaderDrawer = ({
  routes,
  onClose,
  isOpen,
  username,
  isAdmin,
}) => {
  return (
    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <Flex flexDir="column" align="center">
            <BackofficeBtn isAdmin={isAdmin} />
            <ActivitiesMenu />
            <HeaderRoutes routes={routes} />
            <AuthLinks username={username} isMobile={true} />
            <DonateBtn />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
