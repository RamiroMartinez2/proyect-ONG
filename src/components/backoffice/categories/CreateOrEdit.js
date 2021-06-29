import React, { useEffect, useState } from "react";
import { Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { CreateOrEditForm } from "./CreateOrEditForm";
import Loader from '../layout/Loader'
import { createCategory, editCategory } from './CategoriesService'
import { useAlert } from "../layout/Alert";

export const CreateOrEdit = ({ isCreate, id, categoryToEdit }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const category = {
    name: name,
    description: description,
  };

  const history = useHistory();
  const { setAlert } = useAlert();

  const handleError = () => {
    Swal.fire({
      title: "Error",
      text: "Hubo un error",
      icon: "error",
      confirmButtonColor: 'brandRed.200',
      confirmButtonText: "Ok",
    });
  };

  const handleSuccess = () => {
    Swal.fire({
      title: "Success",
      text: "Tarea completada",
      icon: "success",
      confirmButtonColor: '#5796D9',
      confirmButtonText: "Ok",
    });
  };

  useEffect(() => {
    setLoading(true)
    if (!isCreate) {
      setName(categoryToEdit.name);
      setDescription(categoryToEdit.description);
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [isCreate, categoryToEdit])

  const handlePost = () => {
    if (name === "" || description === "") {
      setAlert({
        title: "Campo vacío",
        text: "Por favor complete todos los campos.",
        show: true,
        type: "error",
      });
    } else {
      createCategory(category)
      .then(() => {
        handleSuccess();
        history.push("/backoffice/categories");
      })
      .catch(() => handleError())
    }
  }

  const handlePut = (id) => {
    if (name === "" || description === "") {
      setAlert({
        title: "Campo vacío",
        text: "Por favor complete todos los campos.",
        show: true,
        type: "error",
      });
    } else {
      editCategory(id, category)
      .then(() => {
        handleSuccess();
        history.push("/backoffice/categories");
      })
      .catch(() => handleError())
    }
  }

  if (loading) return <Loader/>
  return (
      <Flex
        w="100%"
        flexDirection="column"
        minHeight="calc(100vh - 64px)"
        align="center"
        justify="center"
        >
        <Heading margin={5}>{!isCreate ? 'Editar categoría' : 'Crear categoría'}</Heading>
          <CreateOrEditForm
            name={name}
            description={description}
            setName={setName}
            setDescription={setDescription}
          />
          <Button
            mt={5}
            variant={'somosMas'}
            size="sm"
            type="submit"
            onClick={() => {
              isCreate ? handlePost() : handlePut(categoryToEdit.id);
            }}
          >
            {!isCreate ? 'Editar' : 'Crear'}
          </Button>
        </Flex>
  );
};
