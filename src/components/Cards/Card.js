import React from "react";
import { Box, Text, Image, Button, Flex, VStack } from "@chakra-ui/react";
import parse from "html-react-parser";

const Cards = ({ image, title, description, max }) => {

  let descriptionLength
  if (description) {
    descriptionLength = `${description.slice(0, 150)}...`
  }

  return (
    <VStack
      maxW={max ? max : "382px"}
      h="auto"
      rounded="20px"
      overflow="hidden"
      boxShadow="dark-lg"
      justifyContent="space-between"
      mt="2rem"
    >
      <Box>
        <Image
          src={image}
          h={max ? "150" : "250"}
          width="100%"
          layout={"fill"}
          fit={'cover'}
          fallbackSrc="https://via.placeholder.com/382x300"
        />
        <Box textAlign="left" p={4}>
          <Text
            fontWeight="extrabold"
            fontSize="large"
            fontFamily="Source+Sans+Pro"
            textTransform="uppercase"
          >
            {title}
          </Text>
          { description &&
          <Text fontWeight="normal" fontSize="sm" my={2} fontFamily="Open+Sans">
            {parse(descriptionLength)}
          </Text>
          }
        </Box>
      </Box>
      <Box>
        <Button variant="dangerOutline" mb={4}>VER MÁS</Button>
      </Box>
    </VStack>
  );
};

export default Cards;
