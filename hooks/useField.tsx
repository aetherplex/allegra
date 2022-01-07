import { useEffect, useState } from 'react';
import { Field, InputType, inputTypes } from '../types';

export const useField = ({
  name,
  type,
  description,
  required,
  codec,
}: Field) => {
  const [inputType, setInputType] = useState<InputType>();

  useEffect(() => {
    setInputType(inputTypes[type]);
  }, [type]);

  return {
    inputType,
  };
};
