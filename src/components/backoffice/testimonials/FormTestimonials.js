import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
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
} from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaFileImage } from "react-icons/fa";

import { useAlert } from "../layout/Alert";
import { createTestimonial } from "./testimonials";
import { editTestimonial } from "./testimonials";
import Swal from "sweetalert2";

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
  var blob = new Blob([img])
  var url = URL.createObjectURL(blob)
  
  return fetch(url)
  .then(res => res.blob())
  .then(blob => {
    var fr = new FileReader()
    fr.onload = () => {
      var b64 = fr.result
      return b64
    }
    fr.readAsDataURL(blob)
  })
}

const TestimonialsForm = ({ testimonialToEdit }) => {
  const { setAlert } = useAlert();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory()

  useEffect(() => {
    if (testimonialToEdit) {
      setName(testimonialToEdit.name);
      setDescription(testimonialToEdit.description);
      setImage(testimonialToEdit.image);
    }
  }, [testimonialToEdit]);

  const handleSuccess = () => {
    Swal.fire({
      title: "Hecho",
      text: "Testimonio creado",
      icon: "success",
      confirmButtonColor: '#5796D9',
      confirmButtonText: "Ok",
    });
  };

  const handleSuccessEdit = () => {
    Swal.fire({
      title: "Hecho",
      text: "Testimonio editado",
      icon: "success",
      confirmButtonColor: '#5796D9',
      confirmButtonText: "Ok",
    });
  };

  const handleError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error",
      icon: "error",
      confirmButtonColor: 'brandRed.200',
      confirmButtonText: "Ok",
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || description === "" || image === "") {
      setAlert({
        title: "Campo vacío",
        text: "Algún campo está vacio o no se ha cargado una imagen.",
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
      if (testimonialToEdit) {
        editTestimonial(testimonialToEdit.id, data)
        .then(() => {
          handleSuccessEdit()
          history.push("/backoffice/testimonials");
        })
        .catch(err => handleError())
      } else {
        // AGREGAR FUNCIÓN CREAR - pasar data
        createTestimonial(data)
        .then(() => {
          //HBAILITAR Linea inferior CUANDO SE INTRODUZAC SWEET ALERT
          handleSuccess();
          history.push("/backoffice/testimonials");
        })
        //HBAILITAR Linea inferior CUANDO SE INTRODUZAC SWEET ALERT
        .catch(err => handleError())
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
        {testimonialToEdit ? "Editar testimonio" : "Crear testimonio"}
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
              <FormLabel>Nombre</FormLabel>
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
            <CKEditor
              editor={ClassicEditor}
              data={
                testimonialToEdit ? testimonialToEdit.description : description
              }
              onReady={(editor) => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
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
                  {testimonialToEdit ? testimonialToEdit.name : image.name}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <Button variant={'somosMas'} type="submit" size="sm" marginTop={5}>
                {testimonialToEdit ? "Editar" : "Crear"}
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default TestimonialsForm;
