import React from 'react'
import { SkeletonText, Box, Skeleton, Container } from "@chakra-ui/react";
import SkeletonHome from './SkeletonHome';

const SkeletonDetail = () => {
    return (
        <Container maxW="900px" mt="14">
            <Box mb={20}>
                <Skeleton height="160px" />
                <Box maxW="900px" m="2rem auto">
                    <Skeleton height="25px" />
                    
                    <Box maxW="900px" m="auto">
                        <SkeletonText mt="3" noOfLines={3} spacing="2" />
                    </Box>
                </Box>
            </Box>
            <SkeletonHome />
        </Container>
    )
}

export default SkeletonDetail
