import { useEffect, useState } from 'react';
import { IField, InputType, inputTypes } from '../types';

export const useField = ({
  name,
  type,
  description,
  required,
  codec,
}: IField) => {
  const [inputType, setInputType] = useState<InputType>();

  useEffect(() => {
    setInputType(inputTypes[type]);
  }, [type]);

  return {
    inputType,
  };
};
