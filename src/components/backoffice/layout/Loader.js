import React from "react";
import LoaderSpinner from "react-loader-spinner";
import {Flex} from '@chakra-ui/react';

const Loader = () => {
  //Documentation: https://www.npmjs.com/package/react-loader-spinner
  return (
    <Flex w={'100%'} h={'calc(100vh - 64px)'} position={"absolute"} top={'64px'} zIndex={100} backgroundColor={'gray.100'} justifyContent={'center'} alignItems={'center'}>
      <LoaderSpinner visible={true} type="Puff" color="#88BBF2" height={80} width={80} />
    </Flex>
  )
};

export default Loader;
