import { Algodv2 } from 'algosdk';
import { useState } from 'react';

export const useAlgod = () => {
  const [client, setClient] = useState<Algodv2>(
    () =>
      new Algodv2(
        {
          'x-key': '709a4b2e-bcbc-40a0-9432-683e6a683842',
        },
        'http://localhost/sandbox/algod',
        4000
      )
  );

  return {
    client,
  };
};
