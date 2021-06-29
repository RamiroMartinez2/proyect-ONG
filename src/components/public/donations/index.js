import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import Title from "../../Title/Title";
import imgSubtitle from "../../../assets/Foto10.jpg";
import { useHistory} from 'react-router-dom';

export const Donations = () => {

  const history = useHistory();


  const handleThanks = () => {
    setTimeout (() => {
    history.push('/thanks');
    }, 10000)
  }

  return (
    <Box mb="2rem">
      <Title image={imgSubtitle} title="Donaciones" />
      <Box maxW="900px" m={{base:"1rem",md:"auto"}} my="2rem">
        <Text
          mt="2rem"
          fontSize={{md:"5xl",base:"3xl"}}
          paddingBottom={6}
          fontWeight="bold"
        >
          ¡Gracias por querer ser parte de Somos Más!
        </Text>
        <Text fontSize="2xl" textAlign="justify" w="100%">
          Gracias por su gran generosidad, su ayuda es invaluable para nosotros.
          Su apoyo ayuda a avanzar en nuestra misión.
        </Text>
        <Text fontSize="2xl" textAlign="justify" mt="2rem" w="100%">
          Las donaciones son procesadas en el entorno seguro de MercadoPago.
          Haga click en el siguiente botón para comenzar:
        </Text>

        <Button
          mt="3rem"
          mb="3rem"
          bg="rgb(1,160,223)"
          _hover={{ opacity: ".6" }}
          color="white"
          borderRadius="4px"
          size="lg"
          onClick = {handleThanks}
        > 
          <a href='https://mpago.la/2hi6cHW' target="_blank"> Donar con Mercado Pago </a> 

        </Button>

      </Box>
    </Box>
  );
};

export default Donations;
