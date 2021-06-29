import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../../../app/authService";
import { SET_REGISTER } from "../../../../features/authReducer";
import swal from "sweetalert";

export const MainRegister = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const toast = useToast();

  const validateSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Email invalido")
      .required("El email es requerido"),
    password: Yup.string()
      .min(6, "Inserte más de 6 caracteres")
      .required("La contraseña es requerida"),
  });

  return (
    <Container maxW="container.sm" minH="100vh">
      <Flex
        flexDir="column"
        bg="gray.200"
        padding="2em"
        marginTop="5em"
        borderRadius="5px"
        boxShadow="xl"
      >
        <Heading
          textTransform="uppercase"
          color="brandBlue.400"
          fontWeight="semibold"
        >
          registro
        </Heading>
        <Formik
          initialValues={{ name: "", apellido: "", email: "", password: "" }}
          validationSchema={validateSchema}
          onSubmit={(values, actions) => {
            const register = async () => {
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
            };
            register();
          }}
        >
          {(props) => (
            <Form>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel marginTop="1em" htmlFor="name" color="gray.600">
                      Nombre
                    </FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Nombre"
                      variant="filled"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="apellido">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.apellido && form.touched.apellido}
                  >
                    <FormLabel
                      marginTop="1em"
                      htmlFor="apellido"
                      color="gray.600"
                    >
                      Apellido
                    </FormLabel>
                    <Input
                      {...field}
                      id="apellido"
                      placeholder="Apellido"
                      variant="filled"
                    />
                    <FormErrorMessage>{form.errors.apellido}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel marginTop="1em" htmlFor="email" color="gray.600">
                      Email
                    </FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Email"
                      variant="filled"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel
                      marginTop="1em"
                      htmlFor="password"
                      color="gray.600"
                    >
                      Contraseña
                    </FormLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      variant="filled"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                variant="somosMas"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Registrarme
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Container>
  );
};
