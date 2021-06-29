import React from "react";
import { Heading, Text, Container, Flex } from "@chakra-ui/react";
import Slides from "./slides/HomeSlides";
import { PublicActivities } from "../activities/PublicActivities";
import { PublicNews } from "../News/PublicNews";
import { Link } from "react-router-dom";
import PublicTestimonials from "../Testimonials/PublicTestimonials";

const Home = () => {
  return (
    <>
      <Slides />
      <Container maxW="container.xl">
        <Flex
          marginTop="3em"
          marginBottom="2em"
          height="100%"
          padding="2em"
          borderRadius="3px"
          flexDir="column"
        >
          <Heading fontSize="3em">Somos Más</Heading>
          <Text fontWeight="semibold" fontSize="lg" marginTop="1em">
            Mediante nuestros programas educativos, buscamos incrementar la
            capacidad intelectual, moral y afectiva de las personas de acuerdo
            con la cultura y las normas de convivencia de la sociedad a la que
            pertenecen.
          </Text>
        </Flex>
      </Container>
      <PublicNews />
      <PublicTestimonials />
      <PublicActivities getOnlyLatest={true} />
      <Container maxW="container.xl">
        <Link to="/actividades" style={{ textDecoration: "none" }}>
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
            Ver actividades ➞
          </Text>
        </Link>
      </Container>
    </>
  );
};

export default Home;
