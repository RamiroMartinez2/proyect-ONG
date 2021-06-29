import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Container, Flex, Heading, Button} from '@chakra-ui/react'
import { useBreakpointValue } from "@chakra-ui/media-query";
import MappedMembers from './MappedMembers'
import { getMembers } from '../../../functions/membersService'
import Loader from '../layout/Loader'

const ListOfMembers = () => {

    const [loading, setLoading] = useState(true)
    const [members, setMembers] = useState()
    const [update, setUpdate] = useState(false)

    useEffect(()=>{
        getMembers()
        .then(res => {
          setMembers(res.data.data)
          setLoading(false)
         setUpdate(false)
        })
         .catch(() => setLoading(false))
      }, [update])

    const alignButton = useBreakpointValue({ base: "center", md: "flex-end" })
    const marginB = useBreakpointValue({ base: "1em", md: "0" })
    const marginR = useBreakpointValue({ base: "0", md: "1em" })

    if (loading) return <Loader/>
    return(
        <div>
            <Container maxW="container.xl">
                <Flex flexDir="column" mb={10}>
                    <Heading textAlign="center" mt={10} mb={marginB}>Miembros</Heading>
                    <Flex alignSelf={alignButton} marginRight={marginR}>
                    <Link to="/backoffice/members/create">
                        <Button variant={'somosMas'}>+ Crear Miembro</Button>
                    </Link>
                    </Flex>
                    {members ? 
                    <MappedMembers members={members} parentCallBack={setUpdate}></MappedMembers>
                    : <Heading as="h4" size="md" textAlign="center">No se encontraron miembros</Heading>
                    }
                </Flex>
            </Container>
        </div>
    )
}

export default ListOfMembers