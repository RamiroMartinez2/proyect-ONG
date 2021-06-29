import { Input } from "@chakra-ui/input";
import { Box, Stack, FormControl, FormLabel } from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";

export const CreateOrEditForm = ({
  name,
  setName,
  description,
  setDescription,
}) => {
  return (
    <Box
        bg="gray.100"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={[250, 400, 700]}
        maxWidth={700}
        boxShadow={"xl"}
      >
      <Stack w={"90%"} margin={[3, 6, 8]} spacing={5}>
      <FormControl>
          <FormLabel>Título</FormLabel>
          <Input
            _focus={{ bg: "white" }}
            _hover={{ bg: "gray.100" }}
            bg="white"
            variant="filled"
            value={name}
            placeholder="Título"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel marginBottom={3}>Descripción</FormLabel>
        </FormControl>
        <CKEditor
          editor={ClassicEditor}
          data={description}
          id="description"
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            setDescription(data);
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
      </Stack>
    </Box>
  );
};
