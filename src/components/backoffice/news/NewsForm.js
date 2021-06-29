//HOOKS
import { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import { useAlert } from "../layout/Alert";
//CKEDITOR
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//CHAKRA
import {
  FormControl,
  Flex,
  Heading,
  FormLabel,
  Input,
  Select,
  Box,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaFileImage } from "react-icons/fa";

//services
import { getCategories } from "../categories/CategoriesService";
import newsService from './newsService';

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
//convertir imagen a base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const NewsForm = ({ newToEdit }) => {
  //estado para cargar categorias al formulario
  const [categorias, setCategorias] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (newToEdit) {
      setDescription(newToEdit.content);
      setImage(newToEdit.image);
    }
  }, [newToEdit]);

  //alert: componente reutilizado
  const { setAlert } = useAlert();

  const history = useHistory();

  //info novedad
  const data = {
    title: "",
    content: "",
    category_id: "",
    image: "",
  };
  //data para enviar
  const [news, setNews] = useState(
    newToEdit ? newToEdit : data
  );
    //change imagen
  const handleChangeImage = (imageFile) => {

    setNews({
      ...news,
      image: imageFile[0],
    });

  };
  //change inputs
  const handleChange = (e) => {
    setNews({
      ...news,
      [e.target.name]: e.target.value,
    });
  };

  //envio de formulario
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (description === "" || image === "") {
      setAlert({
        title: "Campo vacío",
        text: "Por favor complete todos los campos.",
        show: true,
        type: "error",
      });
    } else {

      //si existe tengo que editar
      if(newToEdit){
        
        let imageEdit;
        //si no se sube otra imagen me quedo la que ya estaba y la paso a base64
        if(typeof news.image == "string"){

          imageEdit = await urlToBase64(news.image)

        } else {
          //si cargo nueva imagen la conviert a base64
          imageEdit = await toBase64(news.image).then((res) => res);

        }
        //data que voy a enviar
        const data = {
          id: news.id,
          name: news.title,
          content: news.content,
          image: imageEdit,
          category_id: news.category_id,
          updated_at: new Date().toISOString()
        }

        //peticion a la API
        newsService.editNews(data, news.id).then(res => {

          const text = res.data.name

          setAlert({
            title: "Novedad editada",
            text: text,
            show: true,
            type: "success",
            showCancelButton: false,
          });

        })
        .then(() =>  history.push('/backoffice/news'))
        .catch(err => {
          setAlert({
            title: "Error",
            text: "Error al editar novedad",
            show: true,
            type: "error",
            showCancelButton: true,
          });
        })

      } else {
        //si tengo que crear
        let imageEdit;
        //convertir imagen a base64
        if(typeof news.image !== "string"){

          imageEdit = await toBase64(news.image).then((res) => res);

        }

        //data a enviar
        const data = {
          name: news.title,
          content: news.content,
          image: imageEdit,
          category_id: news.category_id,
          created_at: new Date().toISOString()
        }

        //peticion a la API
        newsService.createNews(data).then(res => {
          setAlert({
            title: "Novedad creada",
            text: "Novedad creada",
            show: true,
            type: "success",
            showCancelButton: false,
          });
        })
        .then(() => history.push('/backoffice/news'))
        .catch(err => {
          setAlert({
            title: "",
            text: "Error al crear novedad",
            show: true,
            type: "error",
            showCancelButton: true,
          });
        })
      }
    }

  };
  //cargo categorias desde la API
  useEffect(() => getCategories().then((res) => setCategorias(res.data)), []);
  
  //si llega props con post para editar
  useEffect(() => {
    if (newToEdit) {
      setNews({
        ...news,
        title: newToEdit.name,
        content: newToEdit.content,
        category_id: newToEdit.category_id,
        image: newToEdit.image,
      });
    } else {
      const data = {
        title: "",
        content: "",
        category_id: "",
        image: "",
      };
      setNews(data);
    }
  }, []);

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
        {newToEdit ? "Editar novedad" : "Crear novedad"}
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
        <form onSubmit={handleSubmitForm}>
          <Stack w={"90%"} margin={[3, 6, 8]} spacing={5}>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input
                name="title"
                value={news.title}
                onChange={handleChange}
                bg="white"
                type="text"
                isRequired
              />
            </FormControl>

            <FormControl>
              <FormLabel  mb={3}>Categoría</FormLabel>
              <Select
                name="category_id"
                value={news.category_id}
                onChange={handleChange}
                bg="white"
                placeholder="Seleccione una categoría"
                isRequired
              >
                {categorias.length > 0 ? (
                  categorias.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option>Agregar categoría</option>
                )}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel marginBottom={3}>Descripción</FormLabel>
              <CKEditor
                editor={ClassicEditor}
                data={news.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                  setNews({
                    ...news,
                    content: data,
                  });
                }}
                config={{
                  ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command.
                    uploadUrl:
                      "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Foto</FormLabel>
              <Input
                type="file"
                id="file"
                onChange={(e) => {
                  handleChangeImage(e.target.files)
                  setImage(e.target.files[0])
                  }}
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
                  {newToEdit ? newToEdit.name : image.name}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <Button variant={'somosMas'} type="submit" size="sm" marginTop={5}>
              {newToEdit ? "Editar" : "Crear"}
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default NewsForm;