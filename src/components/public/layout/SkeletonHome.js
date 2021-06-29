import React from 'react'
import { SkeletonText, Box, Skeleton, HStack } from "@chakra-ui/react";

const SkeletonHome = () => {
    return (
        <HStack spacing="24px" padding="6">
            <Box padding="6" boxShadow="lg" bg="white" flex={1} borderWidth="1px" borderRadius="lg" >
                <Skeleton height="60px" />
                
                <SkeletonText mt="4" noOfLines={3} spacing="4" />
            </Box>
            <Box padding="6" boxShadow="lg" bg="white" flex={1} borderWidth="1px" borderRadius="lg" >
                <Skeleton height="60px" />
                
                <SkeletonText mt="4" noOfLines={3} spacing="4" />
            </Box>
        </HStack>
    )
}

export default SkeletonHome
