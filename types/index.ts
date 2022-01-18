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

export interface IField {
  name: string;
  description: string;
  type: FieldType;
  required: boolean;
  codec: string;
  fields?: IField[];
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
  fields: IField[];
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

export interface IFormValues {
  fee?: number;
  firstValid?: number;
  lastValid?: number;
  genesisHash: string;
  genesisID?: string;
  sender: string;
  transactionType: string;
  group?: string;
  lease?: string;
  note?: string;
  rekeyTo?: string;
  receiver?: string;
  amount?: number;
  closeRemainderTo?: string;
  assetID?: string;
  type: string;
  unitName?: string;
  assetName?: string;
  url?: string;
  metaDataHash?: string;
  managerAddr?: string;
  reserveAddr?: string;
  freezeAddr?: string;
  clawbackAddr?: string;
  onComplete?: string;
  accounts?: string[];
  approvalProgram?: string;
  clearStateProgram?: string;
  appArguments?: string[];
  foreignApps?: number[];
  foreignAssets?: number[];
  localNumInts?: number;
  localNumByteSlices?: number;
  globalNumInts?: number;
  globalNumByteSlices?: number;
  extraProgramPages?: number;
  freezeAccount?: string;
  freezeAsset?: number;
  assetFrozen?: boolean;
  votePublicKey?: string;
  selectionPublicKey?: string;
  voteKeyDilution?: number;
  nonParticipation?: boolean;
  defaultFrozen?: boolean;
  total?: number;
  decimals?: number;
  xferAsset?: number;
  assetSender?: string;
  assetReceiver?: string;
  lastRound?: number;
  firstRound?: number;
  applicationID?: number;
  freezeAddrDisabled?: boolean;
  clawbackAddrDisabled?: boolean;
  targetAddress?: string;
}

export type Token =
  | {
      'x-key'?: string;
      'x-api-key'?: string;
    }
  | string;

export enum Network {
  MainNet = 'mainnet',
  TestNet = 'testnet',
  BetaNet = 'betanet',
  Sandbox = 'sandbox',
}

export interface INetworkState {
  name: Network;
  algodNetwork: INetwork;
  indexerNetwork: INetwork;
}

export interface INetwork {
  port?: number | string;
  server: string;
  fullServer?: string;
  token: Token;
}

export enum WalletType {
  MyAlgo = 'myAlgo',
  AlgoSigner = 'algoSigner',
  NONE = 'none',
}
