import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { AuthLinks } from "../AuthLinks";
import { PublicBtn } from "../PublicBtn";
import { BackofficeRoutes } from "./BackofficeRoutes";

export const BackofficeDrawer = ({ onClose, isOpen, username, isMobile }) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <Flex flexDir="column" align="center">
            <PublicBtn />
            <BackofficeRoutes />
            <AuthLinks username={username} isMobile={true} />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
