import { IField } from '../types';

export const commonFields: IField[] = [
  {
    name: 'Fee',
    description:
      'Paid by the sender to the FeeSink to prevent denial-of-service. The minimum fee on Algorand is currently 1000 microAlgos.',
    type: 'uint64',
    required: true,
    codec: 'fee',
  },
  {
    name: 'First Round',
    description:
      'The first round for when the transaction is valid. If the transaction is sent prior to this round it will be rejected by the network.',
    type: 'uint64',
    required: true,
    codec: 'fv',
  },
  {
    name: 'Last Round',
    description:
      'The ending round for which the transaction is valid. After this round, the transaction will be rejected by the network.',
    type: 'uint64',
    required: true,
    codec: 'lv',
  },
  {
    name: 'Genesis Hash',
    description:
      'The hash of the genesis block of the network for which the transaction is valid. See the genesis hash for MainNet, TestNet, and BetaNet.',
    type: 'byte[32]',
    required: true,
    codec: 'gh',
  },
  {
    name: 'Sender',
    description: 'The address of the account that pays the fee and amount.',
    type: 'Address',
    required: true,
    codec: 'snd',
  },
  {
    name: 'Transaction Type',
    description:
      'Specifies the type of transaction. This value is automatically generated using any of the developer tools.',
    type: 'string',
    required: true,
    codec: 'type',
  },
  {
    name: 'Genesis ID',
    description:
      'The human-readable string that identifies the network for the transaction. The genesis ID is found in the genesis block. See the genesis ID for MainNet, TestNet, and BetaNet.',
    type: 'string',
    required: false,
    codec: 'gen',
  },
  {
    name: 'Group',
    description:
      'The group specifies that the transaction is part of a group and, if so, specifies the hash of the transaction group. Assign a group ID to a transaction through the workflow described in the Atomic Transfers Guide.',
    type: 'byte[32]',
    required: false,
    codec: 'grp',
  },
  {
    name: 'Lease',
    description:
      'A lease enforces mutual exclusion of transactions. If this field is nonzero, then once the transaction is confirmed, it acquires the lease identified by the (Sender, Lease) pair of the transaction until the LastValid round passes. While this transaction possesses the lease, no other transaction specifying this lease can be confirmed. A lease is often used in the context of Algorand Smart Contracts to prevent replay attacks. Read more about Algorand Smart Contracts. Leases can also be used to safeguard against unintended duplicate spends. For example, if I send a transaction to the network and later realize my fee was too low, I could send another transaction with a higher fee, but the same lease value. This would ensure that only one of those transactions ends up getting confirmed during the validity period.',
    type: 'byte[32]',
    required: false,
    codec: 'lx',
  },
  {
    name: 'Note',
    description: 'Any data up to 1000 bytes.',
    type: 'byte[]',
    required: false,
    codec: 'note',
  },
  {
    name: 'Rekey To',
    description:
      'Specifies the authorized address. This address will be used to authorize all future transactions.',
    type: 'Address',
    required: false,
    codec: 'rekey',
  },
];
