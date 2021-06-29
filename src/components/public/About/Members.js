import React, {useEffect, useState} from 'react';
import {membersApi} from "./aboutService"
import {Container, Flex, Heading, SkeletonCircle, SkeletonText, Box} from '@chakra-ui/react'
import Memmber from './Memmber';


export default function Members() {

    const [members, setMember] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        membersApi()
        .then(res => {
          setMember(res.data)
          setLoading(true)
        })
      }, [])
      
    return (
        loading === true ? (
            <div>
                <Container maxW="container.xl">
                    <Flex flexDir="column" marginTop='1em'>
                        <Heading textAlign="center">Miembros</Heading>
                        <Flex alignSelf='flex-end' marginRight='1em'>
                    
                        </Flex>
                        <Memmber members={members}/>
                    </Flex>
                </Container>
            </div>
        ) : (
            <>
                <Box padding="6" boxShadow="lg" bg="white" >
                    <SkeletonCircle size="10" />
                    <SkeletonText mt="4" noOfLines={3} spacing="4" />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonCircle size="10" />
                    <SkeletonText mt="4" noOfLines={3} spacing="4" />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white">
                    <SkeletonCircle size="10" />
                    <SkeletonText mt="4" noOfLines={3} spacing="4" />
                </Box>
            </>
        )
        
    )
}
