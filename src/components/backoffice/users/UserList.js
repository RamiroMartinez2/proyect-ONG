import { Button } from "@chakra-ui/button";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../../features/userSlice";
import { MappedUsers } from "./MappedUsers";
import Loader from "../layout/Loader";

export const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.userList);
  const status = useSelector((state) => state.users.status);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const alignButton = useBreakpointValue({ base: "center", md: "flex-end" });
  const marginB = useBreakpointValue({ base: "1em", md: "0" });
  const marginR = useBreakpointValue({ base: "0", md: "1em" });

  return (
    <Container maxW="container.xl">
      {status === "loading" ? (
        <Loader />
      ) : (
        <Flex flexDir="column" mb={10}>
          <Heading textAlign="center" mt={10} mb={marginB}>
            Usuarios
          </Heading>
          <Flex alignSelf={alignButton} marginRight={marginR}>
            <Link to="/backoffice/users/create">
              <Button variant={"somosMas"}>+ Nuevo Usuario</Button>
            </Link>
          </Flex>
          <MappedUsers users={users} />
        </Flex>
      )}
    </Container>
  );
};
