import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const Slide = ({ image, position }) => {
  return (
    <Box position="relative">
      <Image
        key={image.id}
        src={image.image}
        alt={image.name}
        minW="100vw"
        objectFit="cover"
        transition="transform .75s"
        transform={`translateX(-${position}%)`}
      />
      <Box
        position="absolute"
        left="0"
        top="50%"
        minW="100vw"
        paddingY="2rem"
        transition="transform .75s"
        transform={`translate(-${position}%, -50%)`}
        bg="rgba(0,0,0,.45)"
      >
        <Text
          fontSize={{ base: "2xl", md: "5xl" }}
          align="center"
          color="white"
          fontWeight="600"
        >
          {image.name}
        </Text>
        <Text
          fontSize={{ base: ".85rem", md: "2xl" }}
          align="center"
          color="white"
        >
          {image.description}
        </Text>
      </Box>
    </Box>
  );
};

export default Slide;
