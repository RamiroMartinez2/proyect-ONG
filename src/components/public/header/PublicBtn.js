import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { MdPublic } from "react-icons/md";
import { Link } from "react-router-dom";

export const PublicBtn = () => {
  return (
    <Flex margin="1em" alignItems="center">
      <Link to="/">
        <Button variant="somosMasOutline" rightIcon={<MdPublic />} size="sm">
          Ir a Sitio Público
        </Button>
      </Link>
    </Flex>
  );
};
