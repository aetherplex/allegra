export enum InputType {
  Text = 'text',
  Number = 'number',
  Select = 'select',
  Boolean = 'boolean',
}

export type FieldType =
  | 'uint64'
  | 'uint32'
  | 'string'
  | 'bool'
  | 'Address'
  | 'Address[]'
  | 'byte[]'
  | 'uint64[]'
  | 'AssetParams'
  | 'ed25519PublicKey'
  | 'VrfPubkey'
  | 'byte[32]';

export interface Field {
  name: string;
  description: string;
  type: FieldType;
  required: boolean;
  codec: string;
  fields?: Field[];
}

export interface TransactionType {
  name: string;
  transactionObjectType:
    | 'PaymentTx'
    | 'KeyRegistrationTx'
    | 'AssetConfigTx'
    | 'ApplicationCallTx'
    | 'AssetTransferTx'
    | 'AssetUpdateTx'
    | 'AssetDeleteTx'
    | 'AssetFreezeTx';
  type: 'pay' | 'keyreg' | 'axfer' | 'acfg' | 'appl' | 'afrz' | 'acfg';
  fields: Field[];
}

export const inputTypes = {
  uint64: InputType.Number,
  uint32: InputType.Number,
  string: InputType.Text,
  Address: InputType.Text,
  bool: InputType.Boolean,
  'byte[]': InputType.Text,
  'byte[32]': InputType.Text,
  'Address[]': InputType.Text,
  'uint64[]': InputType.Number,
  AssetParams: InputType.Text,
  ed25519PublicKey: InputType.Text,
  VrfPubkey: InputType.Text,
};
