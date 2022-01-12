import { useColorMode } from '@chakra-ui/react';
import React from 'react';

export const useBoxShadow = () => {
  const { colorMode } = useColorMode();

  const lightBoxShadowSmInset =
    'inset 3px 3px 5px #D9DADE, inset -3px -3px 5px #FFFFFF';
  const darkBoxShadowSmInset =
    'inset 3px 3px 4px #0D1016, inset -3px -3px 4px #273042';
  const lightBoxShadowXsInset =
    'inset 2px 2px 3px #D9DADE, inset -2px -2px 3px #FFFFFF';
  const darkBoxShadowXsInset =
    'inset 2px 2px 3px #0D1016, inset -2px -2px 3px #273042';
  const boxShadowSmInset =
    colorMode === 'light' ? lightBoxShadowSmInset : darkBoxShadowSmInset;
  const boxShadowXsInset =
    colorMode === 'light' ? lightBoxShadowXsInset : darkBoxShadowXsInset;

  const lightBoxShadowSm = ' 3px 3px 5px #D9DADE,  -3px -3px 5px #FFFFFF';
  const darkBoxShadowSm = ' 3px 3px 4px #0D1016,  -3px -3px 4px #273042';
  const lightBoxShadowXs = ' 2px 2px 3px #D9DADE,  -2px -2px 3px #FFFFFF';
  const darkBoxShadowXs = ' 2px 2px 3px #0D1016,  -2px -2px 3px #273042';
  const boxShadowSm =
    colorMode === 'light' ? lightBoxShadowSm : darkBoxShadowSm;
  const boxShadowXs =
    colorMode === 'light' ? lightBoxShadowXs : darkBoxShadowXs;
  return {
    boxShadowSm,
    boxShadowXs,
    boxShadowSmInset,
    boxShadowXsInset,
  };
};
