import { Button } from "@chakra-ui/button";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Link } from "react-router-dom";
import React from "react";
import Swal from "sweetalert2";
import { deleteUser, removeUserFromState } from "../../../features/userSlice";
import { useDispatch } from "react-redux";

export const MappedUsers = ({ users, handleUpdate }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Confirmación",
      text: "¿Quieres borrar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CC423D",
      confirmButtonText: "Borrar",
      cancelButtonColor: "#88BBF2",
      cancelButtonText: "Cancelar",
    });
    if (confirmation.isConfirmed === true) {
      dispatch(deleteUser(id));
      dispatch(removeUserFromState(id));
    }
  };

  const flexDir = useBreakpointValue({ base: "column", md: "row" });
  const marginTop = useBreakpointValue({ base: "1rem", md: "0" });
  const widthSection = useBreakpointValue({ base: "100%", md: "33%" });
  const alignActivity = useBreakpointValue({
    base: "center",
    md: "space-between",
  });
  const alignUser = useBreakpointValue({ base: "center", md: "left" });
  const alignButtons = useBreakpointValue({ base: "center", md: "flex-end" });

  return (
    <Flex flexDir="column">
      {users.map((user, index) => (
        <Flex
          key={index}
          flexDir="column"
          margin="1em"
          bg="gray.200"
          padding="1em"
          borderRadius="0.1em"
          boxShadow={"xl"}
        >
          <Flex justifyContent="space-between" flexDir={flexDir}>
            <Flex
              alignItems={"center"}
              justifyContent={alignActivity}
              width={widthSection}
              marginTop={marginTop}
            >
              <Box as="h2" fontWeight="bold" textAlign={alignUser}>
                <Text fontSize="small" color="gray.400">
                  Usuario:
                </Text>
                {user.name}
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              width={widthSection}
              marginTop={marginTop}
            >
              <Box as="h2" fontWeight="bold">
                <Text fontSize="small" color="gray.400">
                  Email:{" "}
                </Text>
                {user.email}
              </Box>
            </Flex>
            <Flex
              justifyContent={alignButtons}
              width={widthSection}
              marginTop={marginTop}
            >
              <Link to={`/backoffice/users/${user.id}`}>
                <Button variant={"somosMasOutline"} size="sm">
                  Editar
                </Button>
              </Link>
              <Button
                size="sm"
                variant={"danger"}
                marginLeft="1em"
                onClick={() => handleDelete(user.id)}
              >
                Borrar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
