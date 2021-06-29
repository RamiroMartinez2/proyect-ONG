import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Flex, Heading, Button } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import MappedTestimonials from "./MappedTestimonials";
import { getTestimonials } from './testimonials';
import Loader from '../layout/Loader'

const TestimonialList = () => {

    const [loading, setLoading] = useState(true);
    const [testimonials, setTestimonials] = useState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
      getTestimonials().then((res) => {
        setTestimonials(res.data);
        setLoading(false);
        setUpdate(false);
      })
      .catch(() => setLoading(false))
    }, [update]);

    const alignButton = useBreakpointValue({ base: "center", md: "flex-end" })
    const marginB = useBreakpointValue({ base: "1em", md: "0" })
    const marginR = useBreakpointValue({ base: "0", md: "1em" })

  if (loading) return <Loader/>
  return (
    <Container maxW="container.xl">
      <Flex flexDir="column" mb={10}>
        <Heading textAlign="center" mt={10} mb={marginB}>Testimonios</Heading>
        <Flex alignSelf={alignButton} marginRight={marginR}>
          <Link to="/backoffice/testimonials/create">
            <Button variant={'somosMas'}>+ Crear Testimonio</Button>
          </Link>
        </Flex>
        <MappedTestimonials testimonials={testimonials} handleUpdate={setUpdate} />
      </Flex>
    </Container>
  );
};

export default TestimonialList;
