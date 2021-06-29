import React from 'react'
import {  Flex, Box, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import { FaFacebookF, FaLinkedinIn} from "react-icons/fa";
import { Link } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import parse from "html-react-parser";


export default function Memmber({members}) {

    
  const flexDir = useBreakpointValue({ base: "column", md: "row" })
  const marginTop = useBreakpointValue({ base: "1rem", md: "0" })

    return (
        <Flex flexDir="column" mt={8} mb={14}>
      {members?.map((member) => (
        <Flex
          flexDir="column"
          key={member.id}
          margin="1em"
          bg="gray.200"
          padding="1em"
          borderRadius="0.1em"
        >
          <Flex alignItems='center' justifyContent='space-evenly' flexDir={flexDir}>
            <Flex alignItems="center" justifyContent="space-between">
                <Image
                    boxSize="100px"
                    borderRadius="full"
                    objectFit="cover"
                    src={member.image}
                    fallbackSrc="/brand-logo.svg"
                    alt={member.name}
                />
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" marginTop={marginTop}>
              <Box as="h2" fontWeight="bold">
                <Text fontSize="small" color="gray.400">Nombre: </Text>
                {member.name}
              </Box>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" marginTop={marginTop}>
              <Box as="h2" fontWeight="bold">
                <Text fontSize="small" color="gray.400">Descripción: </Text>
                {parse(member.description)}
              </Box>
            </Flex>

            <Flex justifyContent="space-between" marginTop={marginTop}>


           
                <Link href={member.facebookUrl} _hover={{ textDecoration: "none" }}>
                      <Icon color="brandBlue.400" as={FaFacebookF} marginRight="1em" />
                </Link>
          
                <Link href={member.linkedinUrl} _hover={{ textDecoration: "none" }}>
                     <Icon color="brandBlue.400" as={FaLinkedinIn} marginRight="1em" />
                </Link>


            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
    )
}
