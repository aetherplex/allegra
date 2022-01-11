import { useState } from 'react';

const useSearch = () => {
  const [type, setType] = useState('text');

  const updateType = (type: string) => {
    switch (type) {
      case 'asset':
      case 'application':
      case 'block':
        setType('number');
        break;
      default:
        setType('string');
    }
  };

  return {
    type,
    updateType,
  };
};

export default useSearch;
