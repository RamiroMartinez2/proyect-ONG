import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Link } from 'react-router-dom'

const Backoffice = () => {

    const userData = JSON.parse(localStorage.getItem('data'))

    const textSize = useBreakpointValue({ base: "md", md: "lg" })
    const marginT = useBreakpointValue({ base: 8, md: 12 })
    const headingW = useBreakpointValue({ base: '60%', md: '80%' })

    return (
        <Flex width='100%' minH={'calc(100vh - 64px)'} justifyContent='center' alignItems='center'>
            <Flex flexDir="column" mb={10} alignItems='center' maxW="container.xl">
                <Heading textAlign="center" mt={10} maxW={headingW} >{`Bienvenido, ${userData.name}`}</Heading>
                <Text fontWeight="semibold" fontSize={textSize} marginTop="1em" maxW={'70%'}>
                    En el menú encontrarás todas las secciones que tienes acceso a modificar como usuario administrador.
                </Text>
                <Link to='/'>
                    <Button variant='dangerOutline' mt={ marginT}>Volver a Web Pública</Button>
                </Link>
            </Flex>
        </Flex>
    )
}
export default Backoffice;