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
import { loginUser } from "../../../../app/authService";
import { apiService } from "../../../../app/apiService";
import { SET_LOGIN } from "../../../../features/authReducer";

export const MainLogin = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const toast = useToast();

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("El email es invalido")
      .required("El email es requerido"),
    password: Yup.string()
      .min(6, "Inserte mas de 6 carácteres")
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
          iniciar sesión
        </Heading>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validateSchema}
          onSubmit={(values, actions) => {
            const login = async () => {
              const response = await loginUser(values);
              if (response.data?.token) {
                console.log(response.data.user.name);
                console.log(response.data.token);
                dispatch(
                  SET_LOGIN({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    role_id: response.data.user.role_id,
                    loggedIn: true,
                  })
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                  "data",
                  JSON.stringify(response.data?.user)
                );
                apiService(response.data?.token);
                history.push("/");
              } else {
                toast({
                  title: "Corroborar datos ingresados",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
            };
            login();
          }}
        >
          {(props) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel marginTop="1em" htmlFor="email">
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
                    <FormLabel marginTop="1em" htmlFor="password">
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
                Iniciar Sesión
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Container>
  );
};
