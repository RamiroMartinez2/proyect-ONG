import { Button } from "@chakra-ui/button";
import { Flex, Text, Box } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Link } from "react-router-dom";
import React from "react";
import Swal from "sweetalert2";
import { deleteCategory } from './CategoriesService';

export const MappedCategories = ({ categories, handleUpdate }) => {

  const flexDir = useBreakpointValue({ base: "column", md: "row" })
  const marginTop = useBreakpointValue({ base: "1rem", md: "0" })
  const widthSection = useBreakpointValue({ base: "100%", md: "33%" })
  const alignActivity = useBreakpointValue({ base: "center", md: "space-between" })
  const alignButtons = useBreakpointValue({ base: "center", md: "flex-end" })

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Confirmación",
      text: "¿Quieres borrar esta categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CC423D",
      confirmButtonText: "Borrar",
      cancelButtonColor: "#88BBF2",
      cancelButtonText: "Cancelar",
    });
    if (confirmation.isConfirmed === true) {
      // DELETE FUNCTION HERE
      deleteCategory(id)
      .then(res => {
        handleUpdate()
      })
    }
  };

  return (
    <Flex flexDir="column">
      {categories.map((category) => (
        <Flex
          flexDir="column"
          key={category.id}
          margin="1em"
          bg="gray.200"
          padding="1em"
          borderRadius="0.1em"
          boxShadow={"xl"}
        >
          <Flex justifyContent='space-between' flexDir={flexDir}>
            <Flex alignItems={"center"} justifyContent={alignActivity} width={widthSection} marginTop={marginTop}>
              <Box as="h2" fontWeight="bold">
                <Text fontSize="small" color="gray.400">Categoría: </Text>
                {`\u00A0\u00A0${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`}
              </Box>
            </Flex>
            <Flex alignItems="center" justifyContent="center" width={widthSection} marginTop={marginTop}>
              <Box as="h2" fontWeight="bold">
                <Text fontSize="small" color="gray.400">Creada el: </Text>
                  {`\u00A0\u00A0${category.created_at.slice(0, 10)}`}
              </Box>
            </Flex>
            <Flex justifyContent={alignButtons} width={widthSection} marginTop={marginTop}>
              <Link 
                  to={{
                      pathname: "/backoffice/categories/edit",
                      state: {category: category},
                  }}>
                <Button  variant={'somosMasOutline'} size="sm">
                Editar
                </Button>
              </Link>
              <Button
                size="sm"
                variant={'danger'}
                marginLeft="1em"
                onClick={() => handleDelete(category.id)}
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
