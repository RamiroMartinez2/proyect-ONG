import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Container, Flex, Heading, Text, Box } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getOrganization } from "./organizationService";
import Loader from '../layout/Loader'
import parse from "html-react-parser";

export const Organization = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  useEffect(() => {
    getOrganization()
    .then(res => {
      setData(res.data[0]);
      setLoading(false);
    })
    .catch(() => handleError())
  }, []);

  const maxWText = useBreakpointValue({ base: "250px", md: "600px" })

  return (
    <Container maxW="container.xl">
      {loading ? (
        <Loader />
      ) : (
        <Flex flexDir="column" mb={10} >
          <Heading textAlign="center" mt={10} >Organización</Heading>
          <Flex flexDir="column " mt="3em">
            <Text color="gray.500" fontWeight="bold">
              Nombre
            </Text>
            <Heading size="lg">{data.name}</Heading>
          </Flex>
          <Flex flexDir="column " mt="2em">
            <Text color="gray.500" fontWeight="bold">
              Logo
            </Text>
            <Image
            src={data.logo}
            w={'220px'}
            alignSelf="center"
            objectFit="cover"
            />
          </Flex>
          <Flex flexDir="column" mt="2em">
            <Text color="gray.500" fontWeight="bold">
              Descripción
            </Text>
            <Box alignSelf='center' maxWidth={maxWText}> {parse(data.short_description)}</Box>
          </Flex>
          <Flex justifyContent="center" mt="2em">
            <Link to="/backoffice/organization/edit">
              <Button variant={'somosMas'}>
                Editar
              </Button>
            </Link>
          </Flex>
        </Flex>
      )}
    </Container>
  );
};
