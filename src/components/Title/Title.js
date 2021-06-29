import forBackTitle from '../../assets/forBackTitle.jpg'

import {
    Stack,
    Flex,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
  export default function Title({image, title }) {
    return (
      <Flex
        w={'full'}
        h={'30vh'}
        backgroundImage={image}
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
        backgroundAttachment='fixed'
        fallbackSrc={forBackTitle} 
        className='parallax'
       
        >
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'White'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '4xl', md: '5xl' })}>
              {title}
            </Text>
          </Stack>
        </VStack>
      </Flex>
    );
  }
