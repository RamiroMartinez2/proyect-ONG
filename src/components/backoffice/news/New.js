//REACT ROUTER DOM
import { Link } from "react-router-dom";
//ALERTAS
import Swal from "sweetalert2";
//SERVICIOS
import noveltysService from "./newsService";
//CHAKRA COMPONENTES
import { Flex, Box, Image, Button, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";

const Novelty = ({ noveltys, setUpdateList }) => {

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Confirmación",
      text: "¿Quieres borrar esta novedad?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CC423D",
      confirmButtonText: "Borrar",
      cancelButtonColor: "#88BBF2",
      cancelButtonText: "Cancelar",
    });

    if (confirmation.isConfirmed === true) {
      noveltysService.deleteNews(id)
      setUpdateList(true)
    }
  };

  const flexDir = useBreakpointValue({ base: "column", md: "row" })
  const marginTop = useBreakpointValue({ base: "1rem", md: "0" })
  const widthSection = useBreakpointValue({ base: "100%", md: "25%" })
  const widthName = useBreakpointValue({ base: "100%", md: "30%" })
  const widthPhoto = useBreakpointValue({ base: "100%", md: "15%" })
  const alignText = useBreakpointValue({ base: "center", md: "left" })
  const alignActivity = useBreakpointValue({ base: "center", md: "space-between" })
  const alignButtons = useBreakpointValue({ base: "center", md: "flex-end" })

  return (
    <Flex flexDir="column">
      {noveltys?.map((novelty) => (
        <Flex
          flexDir="column"
          key={novelty.id}
          margin="1em"
          bg="gray.200"
          padding="1em"
          borderRadius="0.1em"
          boxShadow={"xl"}
        >
          <Flex
            alignItems="center" justifyContent="space-between" flexDir={flexDir} >
            <Flex alignItems={"center"} justifyContent={alignActivity} width={widthPhoto} marginTop={marginTop}>
              <Image
                boxSize="100px"
                objectFit="cover"
                src={novelty.image}
                fallbackSrc="/brand-logo.svg"
                alt={novelty.name}
              />
            </Flex>
            <Flex alignItems={"center"} justifyContent={alignActivity} width={widthName} marginTop={marginTop} >
              <Box as="h2" fontWeight="bold" textAlign={alignText}>
                <Text fontSize="small" color="gray.400" textAlign={alignText}>
                  Nombre:{" "}
                </Text>
                {novelty.name}
              </Box>
            </Flex>
            <Flex alignItems="center" justifyContent="center" width={widthSection} marginTop={marginTop}>
              <Box as="h2" fontWeight="bold">
                <Text fontSize="small" color="gray.400">
                  Creada el:{" "}
                </Text>
                {novelty.created_at.slice(0, 10)}
              </Box>
            </Flex>
            <Flex justifyContent={alignButtons} marginTop={marginTop}>
              <Link
                to={{
                  pathname: "/backoffice/news/edit",
                  state: novelty,
                }}
              >
                <Button variant={'somosMasOutline'} size="sm">
                  Editar
                </Button>
              </Link>
              <Button
                size="sm"
                variant={'danger'}
                marginLeft="1em"
                onClick={() => handleDelete(novelty.id)}
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
export default Novelty;
