import Icon from "@chakra-ui/icon";
import { Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { FcPhoneAndroid } from "react-icons/fc";
import { HiLocationMarker } from "react-icons/hi";

export const ContactData = ({
  name,
  phone,
  cellphone,
  facebook,
  facebookUrl,
  instagram,
  instagramUrl,
  linkedIn,
  linkedInUrl,
  address,
  mail,
}) => {
  const socialMedia = (contactName, contactUrl, icon) => {
    if (contactName) {
      return (
        <Flex alignItems="center" justifyContent="flex-start" marginTop="1em">
          <Icon color="brandBlue.400" as={icon} marginRight="1em" />
          <Link href={contactUrl} _hover={{ textDecoration: "none" }}>
            <Text
              fontWeight="bold"
              color="gray.600"
              _hover={{ color: "black" }}
            >
              {contactName}
            </Text>
          </Link>
        </Flex>
      );
    }
  };
  return (
    <Flex
      flexDir="column"
      margin="1em"
      bg="gray.200"
      padding="1em"
      borderRadius="0.2em"
      justifyContent="space-between"
      boxShadow="lg"
    >
      <Text color="gray.400">Información de contacto</Text>
      <Heading size="md" color="gray.600">
        {name}
      </Heading>
      <Flex alignItems="center" marginTop="1em">
        <Icon color="brandBlue.400" as={FaPhoneAlt} marginRight="1em" />
        <Text fontWeight="bold" color="gray.600">
          {phone}
        </Text>
      </Flex>
      <Flex alignItems="center" marginTop="1em">
        <Icon
          fontSize="1em"
          color="brandBlue.400"
          as={FcPhoneAndroid}
          marginRight="1em"
        />
        <Text fontWeight="bold" color="gray.600">
          {cellphone}
        </Text>
      </Flex>

      <Flex alignItems="center" marginTop="1em">
        <Icon
          fontSize="1em"
          color="brandBlue.400"
          as={HiLocationMarker}
          marginRight="1em"
        />
        <Text fontWeight="bold" color="gray.600">
          {address}
        </Text>
      </Flex>
      {socialMedia(facebook, facebookUrl, FaFacebookF)}
      {socialMedia(instagram, instagramUrl, FaInstagram)}
      {socialMedia(linkedIn, linkedInUrl, FaLinkedinIn)}
    </Flex>
  );
};
