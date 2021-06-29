import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Container, Flex, Heading, Button} from '@chakra-ui/react'
import { useBreakpointValue } from "@chakra-ui/media-query";
import MappedActivities from './MappedActivities'
import  {getActivities} from './ActivitiesService'
import Loader from '../layout/Loader';

const ListOfActivities = () => {

    const [loading, setLoading] = useState(true)
    const [activities, setActivities] = useState()
    const [update, setUpdate] = useState(false)

      useEffect(()=>{
        getActivities()
        .then(res => {
          setActivities(res.data)
          setLoading(false)
          setUpdate(false)
        })
    }, [update])

    const alignButton = useBreakpointValue({ base: "center", md: "flex-end" })
    const marginB = useBreakpointValue({ base: "1em", md: "0" })
    const marginR = useBreakpointValue({ base: "0", md: "1em" })

    if (loading) return <Loader/>
    return(
        <div>
            <Container maxW="container.xl">
                <Flex flexDir="column" mb={10}>
                    <Heading textAlign="center" mt={10} mb={marginB}>Actividades</Heading>
                    <Flex alignSelf={alignButton} marginRight={marginR}>
                    <Link to="/backoffice/activities/create">
                        <Button variant={'somosMas'}>+ Crear Actividad</Button>
                    </Link>
                    </Flex>
                    <MappedActivities activities={activities} parentCallBack={setUpdate} ></MappedActivities>
                </Flex>
            </Container>
        </div>
    )
}

export default ListOfActivities