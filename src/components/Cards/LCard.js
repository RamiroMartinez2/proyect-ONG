import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export const LCard = ({ title, image, text, url, id, postedOn, maxW }) => {
  const formatDate = (dateToParse) => {
    const date = new Date(dateToParse);
    const formattedDate = new Intl.DateTimeFormat("es-AR").format(date);
    return formattedDate;
  };

  const returnConditionalUrl = (url, id) => {
    if (url && id) {
      return `/${url}/${id}`;
    } else if (id === undefined) {
      return `/${url}`;
    } else if (url === undefined) {
      return `/${id}`;
    }
  };

  return (
    <Container
      maxW={maxW}
      borderRadius="8px"
      boxShadow="xl"
      padding="0"
      position="relative"
      margin="1em"
      bg="gray.200"
    >
      <Image
        borderTopRadius="8px"
        width="100%"
        maxH="13em"
        objectFit="cover"
        src={image}
        fallbackSrc="https://via.placeholder.com/382x300"
      />
      {postedOn && (
        <Text
          textAlign="end"
          fontSize="small"
          color="brandBlue.200"
          marginRight="0.3em"
        >
          {formatDate(postedOn)}
        </Text>
      )}

      <Heading
        size="md"
        textAlign="center"
        color="gray.700"
        fontWeight="semibold"
        marginBottom="0.5em"
      >
        {parse(title)}
      </Heading>
      <Flex flexDir="column">
        {text && (
          <Box
            marginLeft="1em"
            marginRight="1em"
            maxHeight="3em"
            overflow="hidden"
            color="gray.600"
          >
            {parse(text)}
          </Box>
        )}

        <Flex justifyContent="center" margin="1em">
          <Link to={returnConditionalUrl(url, id)}>
            <Button
              textDecoration="none"
              margin="0.5em"
              variant="dangerOutline"
              textTransform="uppercase"
              size="sm"
            >
              ver más
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};
