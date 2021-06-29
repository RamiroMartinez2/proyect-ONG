import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Heading,
  Box,
  Text,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FaFileImage } from "react-icons/fa";
import { createSlide, editSlide } from "./slidesService";
import Swal from "sweetalert2";
import { useAlert } from "../layout/Alert";

// convert image to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// convert url to base64
const urlToBase64 = (img) => {
  var blob = new Blob([img]);
  var url = URL.createObjectURL(blob);

  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      var fr = new FileReader();
      fr.onload = () => {
        var b64 = fr.result;
        return b64;
      };
      fr.readAsDataURL(blob);
    });
};

const FormSlides = ({ slideToEdit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (slideToEdit) {
      setName(slideToEdit.name);
      setDescription(slideToEdit.description);
      setImage(slideToEdit.image);
    }
  }, [slideToEdit]);

  const handleSuccess = () => {
    Swal.fire({
      title: "Success",
      text: "Slide creada",
      icon: "success",
      confirmButtonColor: "#5796D9",
      confirmButtonText: "Ok",
    });
  };

  const handleSuccessEdit = () => {
    Swal.fire({
      title: "Success",
      text: "Slide editada",
      icon: "success",
      confirmButtonColor: "#5796D9",
      confirmButtonText: "Ok",
    });
  };

  const handleError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error",
      icon: "error",
      confirmButtonColor: "brandRed.200",
      confirmButtonText: "Ok",
    });
  };

  const { setAlert } = useAlert();

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || description === "" || image === "") {
      setAlert({
        title: "Campo vacío",
        text: "Por favor complete todos los campos.",
        show: true,
        type: "error",
      });
    } else {
      let data;
      if (typeof image !== "string") {
        let base64Img = await toBase64(image);
        data = {
          name: name,
          description: description,
          image: base64Img,
        };
      } else {
        let urlToBase64Img = await urlToBase64(image);
        data = {
          name: name,
          description: description,
          image: urlToBase64Img,
        };
      }
      if (slideToEdit) {
        editSlide(slideToEdit.id, data)
          .then(() => {
            handleSuccessEdit();
            console.log({ slideToEdit, data });
            history.push("/backoffice/slides");
          })
          .catch((err) => handleError());
      } else {
        createSlide(data)
          .then(() => {
            handleSuccess();
            history.push("/backoffice/slides");
          })
          .catch((err) => handleError());
      }
    }
  }

  return (
    <Flex
      w="100%"
      flexDirection="column"
      minHeight="100vh"
      align="center"
      justify="center"
      padding={10}
    >
      <Heading margin={5}>
        {slideToEdit ? "Editar slide" : "Crear slide"}
      </Heading>
      <Box
        bg="gray.100"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={[250, 400, 700]}
        maxWidth={700}
        boxShadow={"xl"}
      >
        <form method="POST" onSubmit={handleSubmit}>
          <Stack w={"90%"} margin={[3, 6, 8]} spacing={5}>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="white"
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel marginBottom={3}>Descripción</FormLabel>
            </FormControl>
            <Textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg="white"
              isRequired
              color="black"
            />
            <FormControl>
              <FormLabel>Foto</FormLabel>
              <Input
                type="file"
                id="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{
                  height: "0",
                  width: "0",
                  overflow: "hidden",
                  padding: "0",
                  border: "none",
                }}
              />
              <label htmlFor="file" style={{ cursor: "pointer" }}>
                <Box as={FaFileImage} size="36px" color="brandBlue.300" />
              </label>
              {image && (
                <Text style={{ textAlign: "left" }} marginTop={3}>
                  {slideToEdit ? slideToEdit.name : image.name}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <Button
                variant={"somosMas"}
                type="submit"
                size="sm"
                marginTop={5}
              >
                {slideToEdit ? "Editar" : "Crear"}
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default FormSlides;
