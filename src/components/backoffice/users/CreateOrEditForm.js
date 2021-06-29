import React, { useEffect } from "react";
import {
  Flex,
  Select,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createUser, editUser, fetchUser } from "../../../features/userSlice";
import { Field, Form, Formik } from "formik";

import * as Yup from "yup";

export const CreateOrEditForm = ({ id }) => {
  const editSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nombre demasiado corto")
      .max(100, "Nombre demasiado largo")
      .required("Nombre es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 6 caracteres")
      .max(200, "Contraseña demasiado larga")
      .required("La contraseña es requerida"),
    email: Yup.string()
      .email("Email debe ser válido")
      .required("El Email es requerido"),
  });

  const { singleUser, status } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const mapData = (user) => {
    initialValues = { name: user.name, email: user.email, rol: user.rol };
  };

  let initialValues = {
    name: "",
    email: "",
    password: "",
    role_id: "1",
    profilePhoto: "",
  };

  if (id !== undefined) {
    initialValues = {
      ...initialValues,
      name: singleUser?.name,
      email: singleUser?.email,
      role_id: singleUser?.role_id,
    };
  }

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchUser(id));
    }
    mapData(singleUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  return (
    <Flex
      w="100%"
      flexDirection="column"
      minHeight="100vh"
      align="center"
      justify="center"
      padding={10}
    >
      <Heading margin={5}>{id ? "Editar Usuario" : "Crear Usuario"}</Heading>
      <Box
        bg="gray.100"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={[250, 400, 700]}
        maxWidth={700}
        boxShadow={"xl"}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={editSchema}
          onSubmit={async (values, actions) => {
            let data = {
              name: values.name,
              email: values.email,
              role_id: parseInt(values.role_id),
              password: values.password,
            };
            setTimeout(() => {
              if (id !== undefined) {
                data = {
                  ...data,
                  id,
                };
                try {
                  dispatch(editUser(data));
                } catch (error) {}
                actions.setSubmitting(false);
                history.push("/backoffice/users");
              } else {
                dispatch(createUser(data));
                history.push("/backoffice/users");
                actions.setSubmitting(false);
              }
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Stack w={"90%"} margin={[3, 6, 8]} spacing={5}>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel marginTop="1em" htmlFor="name">
                        Nombre
                      </FormLabel>
                      <Input
                        variant="filled"
                        {...field}
                        id="name"
                        placeholder="Nombre"
                        bg="white"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel marginTop="1em" htmlFor="email">
                        Email
                      </FormLabel>
                      <Input
                        variant="filled"
                        {...field}
                        id="email"
                        placeholder="Email"
                        bg="white"
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
                        type="password"
                        variant="filled"
                        {...field}
                        id="password"
                        placeholder="Contraseña"
                        bg="white"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="role_id">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.role_id && form.touched.role_id}
                    >
                      <FormLabel marginTop="1em" htmlFor="role_id">
                        Rol
                      </FormLabel>
                      <Select
                        variant="filled"
                        {...field}
                        id="role_id"
                        bg={"white"}
                      >
                        <option value="0">Administrador</option>
                        <option value="1">Usuario</option>
                      </Select>
                      <FormErrorMessage>{form.errors.role_id}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <FormControl>
                  <Button
                    mt={4}
                    variant={"somosMas"}
                    size="sm"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    {id === undefined ? "Crear" : "Editar"}
                  </Button>
                </FormControl>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
