import { Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import { OrganizationForm } from "./OrganizationForm";

export const OrganizationEdit = () => {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      minHeight="100vh"
      align="center"
      justify="center"
      padding={10}
    >
      <Heading margin={5}>Editar Organización</Heading>
      <OrganizationForm />
    </Flex>
  );
};
