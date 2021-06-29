import React, { useState, useEffect } from "react";
import Title from "../../Title/Title";
import photoTitle from "../../../assets/Foto5.jpg";
import {
  Container,
  Flex,
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";

const PublicTestimonials = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState();

  useEffect(() => {
    fetch("http://ongapi.alkemy.org/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        const slicedData = data.data.slice(0, 4);
        setTestimonials(slicedData);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>cargando</h1>;
  return (
    <>
      <Title title="Testimonios" image={photoTitle} />
      <Container maxW="container.xl" mb={20}>
        <Flex flexWrap="wrap" justifyContent="center">
          {testimonials.map((testimonial) => (
            <Flex margin="2em 1em 0" key={testimonial.id}>
              <Box w={"260px"} align="stretch">
                <Image
                  pos={"relative"}
                  top={"80px"}
                  borderRadius="full"
                  height={"150px"}
                  width={"150px"}
                  ml={"55px"}
                  objectFit={"cover"}
                  src={testimonial.image}
                  boxShadow={"xl"}
                  borderColor={"brandBlue.300"}
                  borderWidth={"3px"}
                  borderStyle={"solid"}
                  zIndex={2}
                />
                <Box
                  role={"group"}
                  p={6}
                  maxW={"260px"}
                  w={"full"}
                  bg={"gray.200"}
                  boxShadow={"xl"}
                  rounded={"lg"}
                  pos={"relative"}
                  zIndex={1}
                >
                  <Stack align={"center"} pt={"80px"}>
                    <Box
                      as={FaQuoteLeft}
                      size="12px"
                      color="blue.500"
                      m={"0 auto 0 0"}
                    />
                    <Box
                      color={"gray.500"}
                      fontSize={"sm"}
                      mb={"1em !important"}
                    >
                      {parse(testimonial.description)}
                    </Box>
                    <Divider w={"12%"} borderBottomColor="brandBlue.300" />
                    <Heading fontSize={"xl"} fontWeight={600}>
                      {testimonial.name}
                    </Heading>
                  </Stack>
                </Box>
              </Box>
            </Flex>
          ))}
        </Flex>
        <Link to="/testimonios" style={{ margin: "0", textDecoration: "none" }}>
          <Text
            m="4rem 0.2rem 2rem auto"
            width="max-content"
            fontSize="1xl"
            alignSelf={"right"}
            textAlign="right"
            color="brandBlue.300"
            transition="500ms"
            fontWeight={700}
            _hover={{
              color: "brandRed.200",
              marginRight: "0rem",
              transition: "500ms",
            }}
          >
            Ver todos ➞
          </Text>
        </Link>
      </Container>
    </>
  );
};

export default PublicTestimonials;
