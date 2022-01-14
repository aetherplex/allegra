import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../store/networkSlice/selectors';

function Footer() {
  return (
    <Flex
      w="100%"
      py={6}
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Text fontSize="xs" color="gray.600">
        &copy; Allegra, 2022
      </Text>
    </Flex>
  );
}

export default Footer;
