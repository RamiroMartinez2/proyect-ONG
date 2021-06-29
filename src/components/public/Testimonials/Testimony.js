import React from "react";
import { Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import parse from "html-react-parser";

export default function Testimony({ testimonials }) {
  const flexDir = useBreakpointValue({ base: "column", md: "row" });
  const marginTop = useBreakpointValue({ base: "1rem", md: "0" });

  return (
    <Flex flexDir="column">
      {testimonials?.map((testimony) => (
        <Flex
          flexDir="column"
          key={testimony.id}
          margin="1em"
          bg="gray.200"
          padding="1em"
          borderRadius="5px"
          boxShadow={"xl"}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDir={flexDir}
          >
            <Flex alignItems="center" justifyContent="center">
              <Image
                marginRight="2em"
                boxSize="100px"
                borderRadius="full"
                objectFit="cover"
                src={testimony.image}
                fallbackSrc="/brand-logo.svg"
                alt={testimony.name}
              />

              <Text fontWeight="bold" marginRight="1em">
                {testimony.name}
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              marginRight="1em"
              marginTop={marginTop}
              maxW={"70%"}
              color="gray.600"
            >
              {parse(testimony.description)}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
