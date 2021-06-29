import React from "react";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import {
  Flex,
  Heading,
  Image,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteSlide } from "./slidesService";

export const MappedSlides = ({
  slideshow,
  prev,
  next,
  slides,
  parentCallBack,
}) => {
  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Confirmación",
      text: "¿Quieres borrar esta slide?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      confirmButtonColor: "#DB5752",
      cancelButtonText: "Cancelar",
    });

    if (confirmation.isConfirmed === true) {
      deleteSlide(id);
      parentCallBack(true);
    }
  };

  const marginArrow = useBreakpointValue({ base: "0", md: "0 18px" })

// let split = <p></p>
  return (
    <Flex color="black" wrap="nowrap" ref={slideshow} overflow="hidden">
      {slides?.map((slide, idx) => (
        <Flex
          key={idx}
          align="center"
          minW="100%"
          direction="column"
          overflow="hidden"
          pos="relative"
          zIndex="10"
        >
          {slide.image === "" ? (
            <Box h="22rem" w="90%" border="1px solid lightgray">
              <Text w="60%" display="block" mx="auto" mt="5rem">
                No hay slides para mostrar, haz click en editar para agregar una
              </Text>
            </Box>
          ) : (
            <Image
              h="22rem"
              w="90%"
              objectFit="cover"
              border="1px solid lightgray"
              src={slide.image}
              alt="slides-home"
              mt="1rem"
            />
          )}
          <Heading as="h3" mt="3rem">
            {slide.name}
          </Heading>
          <Text color="black" mt="1rem">
            {slide.description}
          </Text>
          <Flex mt="2rem">
            <Link
              to={{
                pathname: "/backoffice/slides/edit",
                state: slide,
              }}
            >
              <Button variant={'somosMasOutline'} size="sm">
                Editar
              </Button>
            </Link>
            <Button
              // DELETE FUNCTION  HERE
              onClick={()=> handleDelete(slide.id)}
              cursor="pointer"
              variant={'danger'}
              size="sm"
              ml="1rem"
            >
              Borrar
            </Button>
          </Flex>
          <Flex
            justify="space-between"
            pos="relative"
            bottom="24rem"
            margin={marginArrow}
            w="100%"
            color="blue"
          >
            <IoIosArrowDropleft
              onClick={prev}
              fontSize="30px"
              cursor="pointer"
              color="#5796D9"
            />

            <IoIosArrowDropright
              onClick={next}
              fontSize="30px"
              cursor="pointer"
              color="#5796D9"
            />
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
