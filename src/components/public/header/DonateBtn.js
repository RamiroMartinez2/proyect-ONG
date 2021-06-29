import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

export const DonateBtn = () => {
  const router = useHistory();
  function handleClick() {
    router.push("/donar");
  }
  return (
    <Flex alignItems="center" justifyContent="center" margin="1em">
      <Button
        bg="white"
        variant="dangerOutline"
        borderWidth="2px"
        borderRadius="full"
        _hover={{ backgroundColor: "brandRed.200", color: "white" }}
        color="brandRed.200"
        onClick={handleClick}
      >
        Donar
      </Button>
    </Flex>
  );
};
