import React from "react";
import { ErrorMessage, useField } from "formik";
import { Input, FormLabel, FormControl } from "@chakra-ui/react";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={5} isInvalid={meta.touched && meta.error}>
      <FormLabel htmlFor={field.name}> {label} </FormLabel>

      <Input {...field} {...props} variant="outline" mb={1} />

      <ErrorMessage name={field.name} />
    </FormControl>
  );
};

export default TextField;
