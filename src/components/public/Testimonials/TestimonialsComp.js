import React, { useEffect, useState } from "react";
import {
  Container,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Box,
} from "@chakra-ui/react";
import Testimony from "./Testimony";
import { getTestimonials } from "../../backoffice/testimonials/testimonials";

const arrMocks = [
  {
    id: 1,
    name: "Marita Gomez",
    description:
      "Otorgando un cambio de rumbo en cada individuo a través de la educación, salud, trabajo, deporte, responsabilidad y compromiso",
    image: "http://ongapi.alkemy.org/storage/Mb7qJKMAWA.jpeg",
  },
  {
    id: 2,
    name: "María Irola",
    description:
      "Intentamos brindar herramientas que logren mejorar la calidad de vida a través de su propio esfuerzo",
    image: "http://ongapi.alkemy.org/storage/vpXetNTugz.jpeg",
    createdAt: new Date("Jun 2 2021"),
  },

  {
    id: 4,
    name: "Marco Fernandez",
    description:
      "Buscamos incrementar la capacidad intelectual, moral y afectiva de las personas de acuerdo con la cultura y las normas de convivencia de la sociedad a la que pertenecen.",
    image: "http://ongapi.alkemy.org/storage/qOWEyDkqHK.jpeg",
  },
  {
    id: 5,
    name: "Miriam Rodriguez",
    description:
      "Este espacio también es utilizado por los jóvenes como un punto de encuentro y relación entre ellos y la institución.",
    image: "http://ongapi.alkemy.org/storage/8rP8O0xvcY.jpeg",
  },
  {
    id: 6,
    name: "Ernesto Cotella",
    description:
      "Intentamos brindar herramientas que logren mejorar la calidad de vida a través de su propio esfuerzo",
    image: "https://via.placeholder.com/150",
  },
];

export default function TestimonialsComp() {
  const [testimonials, setTestimonials] = useState();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getTestimonials()
      .then((res) => {
        console.log(res);
        setTestimonials(res.data);
        setLoading(false);
        setUpdate(false);
      })
      .catch(() => setLoading(false));
  }, [update]);

  return loading === false ? (
    <div>
      <Container maxW="container.xl">
        <Flex flexDir="column" marginTop="1em">
          <Testimony testimonials={testimonials} />
        </Flex>
      </Container>
    </div>
  ) : (
    <>
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
    </>
  );
}
