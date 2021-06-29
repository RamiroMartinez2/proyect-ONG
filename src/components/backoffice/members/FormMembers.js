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
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaFileImage, FaFacebook, FaLinkedin } from "react-icons/fa";
import Swal from "sweetalert2";
import { createMember, editMember } from "../../../functions/membersService";
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

const FormMembers = ({ member }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (member) {
      setName(member.name);
      setDescription(member.description);
      setImage(member.image);
      setFacebook(member.facebookUrl);
      setLinkedin(member.linkedinUrl);
    }
  }, [member]);

  const handleSuccess = (name) => {
    Swal.fire({
      title: "Hecho",
      text: `Miembro ${name} creado`,
      icon: "success",
      confirmButtonColor: '#5796D9',
      confirmButtonText: "Ok",
    });
  };

  const handleSuccessEdit = (name) => {
    Swal.fire({
      title: "Hecho",
      text: `Miembro ${name} editado`,
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

  const { setAlert } = useAlert();

  async function handleSubmit(e) {
    e.preventDefault();
    if (name === "" || description === "" || image === "" || facebook === "" || linkedin === "") {
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
          facebookUrl: facebook,
          linkedinUrl: linkedin
        };
      } else {
        let urlToBase64Img = await urlToBase64(image);
        data = {
          name: name,
          description: description,
          image: urlToBase64Img,
          facebookUrl: facebook,
          linkedinUrl: linkedin
        };
      }
    

      if (member) {
         editMember(member.id, data)
         .then((res) => {
           handleSuccessEdit(res.data.data.name);
             history.push("/backoffice/members");
           })
           .catch(err => handleError())
       } else {
         createMember(data)
        .then((res) => {
             handleSuccess(res.data.data.name);
             history.push("/backoffice/members");
           })
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
        {member ? "Editar miembro" : "Crear miembro"}
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
              data={member ? member.description : description}
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
            <FormControl>
                <FormLabel>Linkedin</FormLabel>
                <InputGroup>
                    <InputLeftElement
                    pointerEvents="none"
                    children={<FaLinkedin color="brandBlue.300" />}
                    />
                    <Input type='url' 
                    placeholder="Linkedin URL" 
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    bg="white"
                    isRequired
                    />
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Facebook</FormLabel>
                <InputGroup>
                    <InputLeftElement
                    pointerEvents="none"
                    children={<FaFacebook color="brandBlue.300" />}
                    />
                    <Input type='url' 
                    placeholder="Facebook URL" 
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    bg="white"
                    isRequired
                    />
                </InputGroup>
            </FormControl>
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
                  {member ? member.name : image.name}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <Button variant={'somosMas'} type="submit" size="sm" marginTop={5}>
                {member ? "Editar" : "Crear"}
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default FormMembers;