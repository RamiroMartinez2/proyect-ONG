import React from "react";
import { Formik, Form } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";
import { registerUser } from "../app/authService";
import { useHistory } from "react-router-dom";
import { Stack, useToast } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { SET_REGISTER } from "../features/authReducer";

import { Button, Heading, Flex, Spacer } from "@chakra-ui/react";
import swal from "sweetalert";

const Register = () => {
  const dispatch = useDispatch();

  let history = useHistory();
  const toast = useToast();

  const validate = Yup.object({
    name: Yup.string().required("Requerido"),
    apellido: Yup.string().required("Requerido"),
    email: Yup.string().email("Requerido").required("Requerido"),
    password: Yup.string()
      .min(6, "Inserte mas de 6 caracteres")
      .required("Requerido"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        apellido: "",
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log({ values });
        const response = await registerUser(values);

        if (response) {
          console.log(response);
          dispatch(SET_REGISTER(response.data));
          // localStorage.setItem(TOKEN, response.data.token);
          swal("Registro Exitoso!", "Logueate para ingresar");
          history.push("/login");
        } else {
          toast({
            title: "Error al registrar el usuario.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }}
    >
      {(formik) => (
        <Flex
          direction="column"
          mt={10}
          mb={10}
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            p={12}
            bg="#E5E5E5"
            rounded={6}
            width={{ base: "90%", md: "80%", lg: "30%" }}
          >
            <Stack mb={6}>
              <Heading> Formulario de Registro </Heading>
            </Stack>

            <Form w="100%" spacing={6}>
              <TextField bg="whrite" label="Nombre" name="name" type="text" />
              <TextField
                bg="whrite"
                label="Apellido"
                name="apellido"
                type="text"
              />
              <TextField bg="whrite" label="Email" name="email" type="email" />
              <TextField
                bg="whrite"
                label="Password"
                name="password"
                type="password"
              />

              <Flex mt={6} mb={6}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                  fontSize="15px"
                >
                  Registrarme
                </Button>

                <Spacer />

                <Button colorScheme="red" type="reset">
                  Reset
                </Button>
              </Flex>
            </Form>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
};

export default Register;
