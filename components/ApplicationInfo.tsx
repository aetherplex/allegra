import {
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Base64 } from 'js-base64';
import React from 'react';
import { capitalize } from '../utils/helpers';
import DataField from './DataField';
import SmallField from './SmallField';

function ApplicationInfo({
  createdAtRound,
  deleted,
  id,
  approvalProgram,
  clearStateProgram,
  creator,
  globalState,
  globalStateSchema,
  localStateSchema,
}: any) {
  const { colorMode } = useColorMode();

  const bgColor = colorMode === 'light' ? 'gray.100' : 'gray.700';

  const renderInfo = () => (
    <Grid w="100%" gridTemplateColumns="repeat(3, 1fr)" gap={4} mt={6}>
      <DataField label="App ID" value={id} canCopy />
      <DataField label="Round created" value={createdAtRound} canCopy />
      <DataField label="Deleted" value={capitalize(deleted.toString())} />
      <Stack
        w="100%"
        gridColumnStart={1}
        gridColumnEnd={4}
        p={5}
        bgColor={bgColor}
        spacing={4}
        borderRadius="xl"
      >
        <Heading size="md">Details</Heading>
        <HStack alignItems="center">
          <SmallField label="Creator" value={creator} canCopy />
        </HStack>
        <Divider />
        <HStack w="100%" spacing={12}>
          <Stack w="100%">
            <Text fontWeight="semibold" fontSize="lg">
              Global state schema
            </Text>
            <HStack spacing={8}>
              <SmallField
                label="Number of bytes"
                value={globalStateSchema['num-byte-slice']}
              />
              <SmallField
                label="Number of uints"
                value={globalStateSchema['num-uint']}
              />
            </HStack>
          </Stack>
          <Stack w="100%">
            <Text fontWeight="semibold" fontSize="lg">
              Local state schema
            </Text>
            <HStack spacing={8}>
              <SmallField
                label="Number of bytes"
                value={localStateSchema['num-byte-slice']}
              />
              <SmallField
                label="Number of uints"
                value={localStateSchema['num-uint']}
              />
            </HStack>
          </Stack>
        </HStack>
        <Divider />
        <Stack w="100%" spacing={4}>
          <Heading size="md">Global state</Heading>
          <Grid gridTemplateColumns="repeat(2, 1fr)" gap={4}>
            {globalState.map(
              (state: {
                key: string;
                value: { bytes: string; type: number; uint: number };
              }) => {
                console.log('KEY, VAL: ', state.key, state.value);
                const key = Base64.decode(state.key);

                let value: any =
                  state.value.type === 1 ? state.value.bytes : state.value.uint;

                return (
                  <SmallField
                    label={key}
                    value={value}
                    key={`${key}-${value}`}
                  />
                );
              }
            )}
          </Grid>
        </Stack>
      </Stack>
    </Grid>
  );

  const renderEmpty = () => (
    <Flex
      w="100%"
      flexDir="column"
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
    >
      <Text color="gray.500">No search data.</Text>
    </Flex>
  );

  return (
    <Flex flexDir="column" w="100%" flexGrow={1}>
      <Heading fontSize="xl">Application information</Heading>
      {id ? renderInfo() : renderEmpty()}
    </Flex>
  );
}

export default ApplicationInfo;
