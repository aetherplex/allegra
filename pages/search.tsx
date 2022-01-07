import { Flex, Text, Heading } from '@chakra-ui/react';
import React from 'react';

function Search() {
  return (
    <Flex w="100%" flexDir="column">
      <Heading>Search blockchain</Heading>
      <Text mt={4} fontSize="lg">
        Search by ID.
      </Text>
    </Flex>
  );
}

export default Search;
