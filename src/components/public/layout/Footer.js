import React, { useEffect, useState } from "react";
import {
  Flex,
  Link as LinkExter,
  Spinner,
  Text,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SomosMasLogo } from "../../../assets/SomosMasLogo";

const Footer = () => {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrganization = async () => {
      await axios
        .get("http://ongapi.alkemy.org/api/organization")
        .then((res) => {
          setFooter(res.data.data[0]);
          setLoading(false);
        });
    };
    getOrganization();
  }, []);

  return loading ? (
    <Flex height="10em" justifyContent="center" alignItems="center">
      <Spinner size="xl" color="#5796D9" />
    </Flex>
  ) : (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      backgroundColor="gray.100"
      p={"20px 30px"}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
    >
      <Flex flexDir="column" width="8em" justifyContent="center">
        <SomosMasLogo fontSize="xl" />
      </Flex>
      <Flex flexDir="column" display={{ base: "none", md: "flex" }}>
        <Heading fontSize="md" fontWeight="regular" color="gray.600">
          Más Información
        </Heading>
        {/* <br /> */}
        <Flex flexDir="row" w={"300px"} mt={1} justifyContent="space-between">
          <Link to="/us">
            <Text color="brandBlue.200" _hover={{ color: "brandBlue.300" }}>
              Nosotros
            </Text>
          </Link>
          {/* <br /> */}
          <Link to="/actividades">
            <Text color="brandBlue.200" _hover={{ color: "brandBlue.300" }}>
              Actividades
            </Text>
          </Link>
          {/* <br /> */}
          <Link to="/novedades">
            <Text color="brandBlue.200" _hover={{ color: "brandBlue.300" }}>
              Novedades
            </Text>
          </Link>
        </Flex>
      </Flex>
      {/* <Flex
        flexDir="column"
        justifyContent="center"
        display={{ base: "none", md: "flex" }}
      > */}
      <Flex
        justifyContent="space-between"
        width="150px"
        mt={{ base: "1.5em", md: "0" }}
      >
        <LinkExter
          href="https://facebook.com/Somos_Más"
          isExternal
          color="blue.500"
        >
          <FaFacebook size="30px" />
        </LinkExter>
        <LinkExter
          href="https://instagram.com/SomosMás"
          isExternal
          color="blue.300"
        >
          <FaTwitter size="30px" />
        </LinkExter>
        <LinkExter
          href="https://twitter.com/SomosMás"
          isExternal
          color="red.400"
        >
          <FaInstagram size="30px" />
        </LinkExter>
      </Flex>
      {/* </Flex> */}

      {/* <Flex justify="flex-end" display={{ base: "flex", md: "none" }}>
        <IconButton
          aria-label="CloseMenu"
          size="lg"
          icon={<GiHamburgerMenu />}
          onClick={() => setDisplay(display === "none" ? "flex" : "none")}
        />
      </Flex>

      <Flex
        w="60vw"
        bgColor="gray.100"
        zIndex={20}
        pb={10}
        pos="fixed"
        bottom="10"
        left="0"
        overflowY="auto"
        flexDir="column"
        display={display}
        paddingTop={3}
      >
        <Flex flexDir="column" align="center">
          <Link to="/us" style={{ color: "#9AC9FB" }}>
            Nosotros
          </Link>
          <br />
          <Link to="/activities" style={{ color: "#9AC9FB" }}>
            Actividades
          </Link>
          <br />
          <Link to="/news" style={{ color: "#9AC9FB" }}>
            Novedades
          </Link>
        </Flex>

        <Flex justifyContent="space-around" pt={25}>
          <LinkExter
            href="https://facebook.com/Somos_Más"
            isExternal
            color="blue.500"
          >
            <FaFacebook size="30px" />
          </LinkExter>
          <LinkExter
            href="https://instagram.com/SomosMás"
            isExternal
            color="blue.300"
          >
            <FaTwitter size="30px" />
          </LinkExter>
          <LinkExter
            href="https://twitter.com/SomosMás"
            isExternal
            color="red.400"
          >
            <FaInstagram size="30px" />
          </LinkExter>
        </Flex>
      </Flex> */}
    </Flex>
  );
};

export default Footer;
