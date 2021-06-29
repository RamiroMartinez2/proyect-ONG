import { Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./brand-logo.svg";

export const SomosMasLogo = ({ maxW, fontSize }) => {
  return (
    <Link to="/">
      <Flex flexDir="column" maxW={maxW}>
        <Image src={logo} />
        <Heading
          fontSize={fontSize}
          textTransform="uppercase"
          fontWeight="semiBold"
        >
          Somos Más
        </Heading>
      </Flex>
    </Link>
  );
};
