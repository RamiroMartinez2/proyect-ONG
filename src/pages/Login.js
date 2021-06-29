import React from "react";
//FORMIK AND YUP
import { Formik, Form } from "formik";
import * as Yup from "yup";
//CHAKRA UI
import { Flex, Heading, Stack, Button } from "@chakra-ui/react";
//COMPONENTS
import TextField from "../components/TextField";

import { loginUser } from "../app/authService";
import { useHistory, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { apiService } from "../app/apiService";

//REDUX
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "../features/authReducer";

const Login = () => {
  const dispatch = useDispatch();
  const TOKEN = "token";

  let history = useHistory();
  const toast = useToast();

  const validate = Yup.object({
    email: Yup.string().email("El email es invalido").required("Requerido"),
    password: Yup.string()
      .min(6, "Inserte mas de 6 carácteres")
      .required("Requerido"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values, actions) => {
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
          localStorage.setItem(TOKEN, response.data.token);
          localStorage.setItem("data", JSON.stringify(response.data?.user));
          apiService(response.data?.token);
          history.push("/");
        } else {
          console.log("No se registran datos");
          toast({
            title: "Corroborar datos ingresados",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }

        actions.setSubmitting(false);

        actions.resetForm();
      }}
    >
      {({ handleSubmit, handleChange, isSubmitting }) => (
        <Flex
          direction="column"
          mt={10}
          mb={10}
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            p={12}
            rounded={6}
            width={{ base: "90%", md: "50%", lg: "30%" }}
            boxShadow="lg"
            bg="gray.200"
          >
            <Stack mb={6}>
              <Heading color="brandBlue.400">Login</Heading>
            </Stack>

            <Form onSubmit={handleSubmit} spacing={6} w="100%">
              {/* TextField: componentes para validar campos */}
              <TextField
                bg="whrite"
                onChange={handleChange}
                label="Email"
                name="email"
                type="email"
              />

              <TextField
                bg="whrite"
                onChange={handleChange}
                label="Contraseña"
                name="password"
                type="password"
              />

              <Button
                type="submit"
                isLoading={isSubmitting}
                variant="somosMas"
                mt={6}
              >
                Ingresar
              </Button>
            </Form>
          </Stack>

          <Stack mt={4} mb={12} fontSize="20px" color="brandBlue.300">
            <Link mt={4} to="/register" color="brandBlue.500">
              ¿No tienes cuenta? ¡Registrate aqui!
            </Link>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
};

export default Login;
