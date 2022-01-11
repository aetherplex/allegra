import { InputGroup, Text } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const [path, setPath] = useState('');

  const handleClick = () => inputRef.current?.click();

  useEffect(() => {
    // @ts-ignore
    inputRef?.current?.onchange = (event: any) => {
      const file = event?.target?.files[0];
      if (!file) return;
      setPath(file.name);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current?.files?.[0]?.name) {
      setPath(inputRef.current?.files?.[0]?.name);
    }
  }, [inputRef?.current?.files?.length]);

  return (
    <InputGroup onClick={handleClick} alignItems="center">
      <input
        type={'file'}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
      <Text ml={2} fontSize="xs">
        {path || 'No file selected'}
      </Text>
    </InputGroup>
  );
};

export default FileUpload;
