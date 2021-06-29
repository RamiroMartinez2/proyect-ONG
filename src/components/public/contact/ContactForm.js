import React from "react";
import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaPhone, FaAt } from "react-icons/fa";
import { useState } from "react";
import { useAlert } from "../../backoffice/layout/Alert";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const { setAlert } = useAlert();

  const handleSuccess = () => {
    setAlert({
      title: "Mensaje enviado",
      text: "Muchas gracias, te responderemos a la brevedad.",
      show: true,
      type: "success",
      showCancelButton: false,
      confirmButtonColor: "#5796D9",
      confirmButtonText: "Cerrar",
      onConfirm: () => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      },
      onCancel: () => {},
    });
  };

  const handleError = () => {
    setAlert({
      title: "Algo salió mal",
      text: "Hubo un error al enviar el mensaje, por favor intenta de vuelta",
      show: true,
      icon: "error",
      type: "error",
      showCancelButton: false,
      confirmButtonColor: "#5796D9",
      confirmButtonText: "Cerrar",
      onConfirm: () => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      },
      onCancel: () => {},
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      created_at: new Date().toISOString(),
    };
    fetch("http://ongapi.alkemy.org/api/contacts", {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => handleSuccess())
      .catch((err) => {
        console.log(err);
        handleError();
      });
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} my="1rem" maxW={"xl"} px={6}>
        <Box
          rounded={"lg"}
          bg="gray.200"
          borderRadius="lg"
          boxShadow={"xl"}
          p={8}
        >
          <Stack align={"left"}>
            <Heading fontSize={"2xl"} textAlign={"left"}>
              Envíanos un mensaje
            </Heading>
          </Stack>
          <form method="POST" onSubmit={handleSubmit}>
            <FormControl id="nombre" mt={4}>
              <Input
                type="text"
                bg="white"
                value={name}
                placeholder="Nombre y apellido"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
            <Stack
              spacing={4}
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
              mt={4}
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaAt color="brandBlue.200" />}
                />
                <Input
                  type="email"
                  bg="white"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaPhone color="brandBlue.200" />}
                />
                <Input
                  type="tel"
                  bg="white"
                  value={phone}
                  placeholder="Teléfono"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </Stack>
            <Textarea
              value={message}
              bg="white"
              placeholder="Mensaje"
              mt={4}
              required
              onChange={(e) => setMessage(e.target.value)}
            />
            <Stack mt={4}>
              <Button variant={"somosMas"} type="submit">
                Enviar
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ContactForm;
