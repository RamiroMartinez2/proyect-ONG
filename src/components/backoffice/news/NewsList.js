//HOOKS
import { useEffect, useState } from 'react';

//REACT ROUTER
import {Link} from 'react-router-dom';

//SERVICIOS
import newsService from './newsService';

//CHAKRA
import {Container, Flex, Heading, Button} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";

//COMPONENTS
import Novelty from './New';
import Loader from '../layout/Loader';

const NewsList = () => {

  const [loading, setLoading] = useState(true)
  const [news, setNews] = useState([]);
  const [updateList, setUpdateList] = useState(false)

  useEffect(() => {
    newsService.getNews().then(res => {
      setNews(res)
      setLoading(false)
      setUpdateList(false)
    })
      
  }, [updateList])

  const alignButton = useBreakpointValue({ base: "center", md: "flex-end" })
  const marginB = useBreakpointValue({ base: "1em", md: "0" })
  const marginR = useBreakpointValue({ base: "0", md: "1em" })

  if (loading) return <Loader/>
  return (
    <div>
        <Container maxW="container.xl">
            <Flex flexDir="column" mb={10}>
                <Heading textAlign="center" mt={10} mb={marginB}>Novedades</Heading>
                <Flex alignSelf={alignButton} marginRight={marginR}>
                <Link to="/backoffice/news/create">
                    <Button variant={'somosMas'}>+ Crear novedad</Button>
                </Link>
                </Flex>
                <Novelty setUpdateList={setUpdateList} noveltys={news} />
            </Flex>
        </Container>
    </div>
  );
};

export default NewsList;
