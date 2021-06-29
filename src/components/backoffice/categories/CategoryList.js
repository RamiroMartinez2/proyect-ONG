import { Button } from "@chakra-ui/button";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MappedCategories } from "./MappedCategories";
import { getCategories } from './CategoriesService';
import Loader from '../layout/Loader';

export const CategoryList = () => {

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState()
  const [update, setUpdate] = useState(false)

  useEffect(()=>{
    getCategories()
    .then(res => {
      setCategories(res.data)
      setLoading(false)
    })
  }, [update])

  const handleUpdate = () => {
    setUpdate(update => !update)
  }

  const alignButton = useBreakpointValue({ base: "center", md: "flex-end" })
  const marginB = useBreakpointValue({ base: "1em", md: "0" })
  const marginR = useBreakpointValue({ base: "0", md: "1em" })

  if (loading) return <Loader/>
  return (
    <div>
        <Container maxW="container.xl">
            <Flex flexDir="column" mb={10}>
                <Heading textAlign="center" mt={10} mb={marginB}>Categorías</Heading>
                <Flex alignSelf={alignButton} marginRight={marginR}>
                <Link to="/backoffice/categories/create">
                    <Button variant={'somosMas'}>+ Nueva Categoría</Button>
                </Link>
                </Flex>
                  <MappedCategories categories={categories} handleUpdate={handleUpdate} />
            </Flex>
        </Container>
    </div>
  );
};
