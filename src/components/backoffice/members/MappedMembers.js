import React from 'react'
import { Button, Flex, Image, Text, useBreakpointValue, Box } from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2"
import { deleteMember } from '../../../functions/membersService'

const MappedMembers = ({ members, parentCallBack }) => {

  const flexDir = useBreakpointValue({ base: "column", md: "row" })
  const marginTop = useBreakpointValue({ base: "1rem", md: "0" })

  const handleDelete = (id, name) => {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: `Se eliminará a ${name} de la base de datos.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CC423D",
      confirmButtonText: "Borrar",
      cancelButtonColor: "#88BBF2",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.value) {
        deleteMember(id);
        parentCallBack(true);
      }
    })
  }

  return (
    <Flex flexDir="column">
      {members?.map((member) => (
        <Flex
          flexDir="column"
          key={member.id}
          margin="1em"
          bg="gray.200"
          padding="1em"
          borderRadius="0.1em"
          boxShadow={"xl"}
        >
          <Flex alignItems='center' justifyContent='space-between' flexDir={flexDir}>
            <Flex alignItems="center" justifyContent="space-between">
                <Image
                    boxSize="100px"
                    borderRadius="full"
                    objectFit="cover"
                    src={member.image}
                    fallbackSrc="/brand-logo.svg"
                    alt={member.name}
                    boxShadow={"xl"}
                />
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" marginTop={marginTop}>
              <Box as="h2" fontWeight="bold">
                <Text fontSize="small" color="gray.400">Nombre: </Text>
                {member.name}
              </Box>
            </Flex>
            <Flex justifyContent="space-between" marginTop={marginTop}>
                <Link 
                    to={{
                        pathname: "/backoffice/members/edit",
                        state: member,
                    }}>
                    <Button variant={'somosMasOutline'} size="sm" >
                        Editar
                    </Button>
                </Link>
              <Button size="sm" 
                variant={'danger'} 
                marginLeft="1em"  
                onClick={() => handleDelete(member.id, member.name)}
              >
                Borrar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export default MappedMembers