import { FieldType, TransactionType } from '../types';

export const transactionTypes: TransactionType[] = [
  {
    name: 'Payment',
    transactionObjectType: 'PaymentTx',
    type: 'pay',
    fields: [
      {
        name: 'Receiver',
        description: 'The address of the account that receives the amount.',
        type: 'Address',
        required: true,
        codec: 'rcv',
      },
      {
        name: 'Amount',
        description: 'The total amount to be send in microAlgos.',
        type: 'uint64',
        required: true,
        codec: 'amt',
      },
      {
        name: 'CloseRemainderTo',
        description:
          'When set, it indicates that the transaction is requesting that the Sender account should be closed, and all remaining funds, after the fee and amount are paid, be transferred to this address.',
        type: 'Address',
        required: false,
        codec: 'close',
      },
    ],
  },
  {
    name: 'Key Registration',
    transactionObjectType: 'KeyRegistrationTx',
    type: 'keyreg',
    fields: [
      {
        name: 'Vote Public Key',
        description: 'The root participation public key.',
        type: 'ed25519PublicKey',
        required: true,
        codec: 'votekey',
      },
      {
        name: 'Selection Public Key',
        description: 'The VRF public key.',
        type: 'VrfPubkey',
        required: true,
        codec: 'selkey',
      },
      {
        name: 'Vote Key Dilution',
        description: 'This is the dilution for the 2-level participation key.',
        type: 'uint64',
        required: true,
        codec: 'votekd',
      },
      {
        name: 'Non-participation',
        description:
          'All new Algorand accounts are participating by default. This means that they earn rewards. Mark an account nonparticipating by setting this value to true and this account will no longer earn rewards. It is unlikely that you will ever need to do this and exists mainly for economic-related functions on the network.',
        type: 'bool',
        required: false,
        codec: 'nonpart',
      },
    ],
  },
  {
    name: 'Asset Creation',
    transactionObjectType: 'AssetConfigTx',
    type: 'acfg',
    fields: [
      {
        name: 'AssetParams',
        description: 'The parameters for the asset.',
        type: 'AssetParams',
        required: false,
        codec: 'apar',
        fields: [
          {
            name: 'Total',
            description:
              'The total number of base units of the asset to create. This number cannot be changed.',
            type: 'uint64',
            required: true,
            codec: 't',
          },
          {
            name: 'Decimals',
            description:
              'The number of digits to use after the decimal point when displaying the asset. If 0, the asset is not divisible. If 1, the base unit of the asset is in tenths. If 2, the base unit of the asset is in hundredths.',
            type: 'uint32',
            required: true,
            codec: 'dc',
          },
          {
            name: 'DefaultFrozen',
            description: 'True to freeze holdings for this asset by default.',
            type: 'bool',
            required: true,
            codec: 'df',
          },
          {
            name: 'Unit Name',
            description:
              'The name of a unit of this asset. Supplied on creation. Max size is 8 bytes. Example: USDT.',
            type: 'string',
            required: false,
            codec: 'un',
          },
          {
            name: 'Asset Name',
            description:
              'The name of the asset. Supplied on creation. Max size is 32 bytes. Example: Tether',
            type: 'string',
            required: false,
            codec: 'an',
          },
          {
            name: 'URL',
            description:
              'Specifies a URL where more information about the asset can be retrieved. Max size is 96 bytes.',
            type: 'string',
            required: false,
            codec: 'au',
          },
          {
            name: 'MetaDataHash',
            description:
              'This field is intended to be a 32-byte hash of some metadata that is relevant to your asset and/or asset holders. The format of this metadata is up to the application. This field can only be specified upon creation. An example might be the hash of some certificate that acknowledges the digitized asset as the official representation of a particular real-world asset.',
            type: 'byte[]',
            required: false,
            codec: 'am',
          },
          {
            name: 'ManagerAddr',
            description:
              'The address of the account that can manage the configuration of the asset and destroy it.',
            type: 'Address',
            required: false,
            codec: 'm',
          },
          {
            name: 'ReserveAddr',
            description:
              'The address of the account that holds the reserve (non-minted) units of the asset. This address has no specific authority in the protocol itself. It is used in the case where you want to signal to holders of your asset that the non-minted units of the asset reside in an account that is different from the default creator account (the sender).',
            type: 'Address',
            required: false,
            codec: 'r',
          },
          {
            name: 'FreezeAddr',
            description:
              'The address of the account used to freeze holdings of this asset. If empty, freezing is not permitted.',
            type: 'Address',
            required: false,
            codec: 'f',
          },
          {
            name: 'ClawbackAddr',
            description:
              'The address of the account that can clawback holdings of this asset. If empty, clawback is not permitted.',
            type: 'Address',
            required: false,
            codec: 'c',
          },
        ],
      },
    ],
  },
  {
    name: 'Asset Configuration',
    transactionObjectType: 'AssetConfigTx',
    type: 'acfg',
    fields: [
      {
        name: 'Asset ID',
        required: true,
        description:
          'For re-configure or destroy transactions, this is the unique asset ID. On asset creation, the ID is set to zero.',
        type: 'uint64',
        codec: 'caid',
      },
      {
        name: 'AssetParams',
        description: 'The parameters for the asset.',
        type: 'AssetParams',
        required: false,
        codec: 'apar',
        fields: [
          {
            name: 'ManagerAddr',
            description:
              'The address of the account that can manage the configuration of the asset and destroy it.',
            type: 'Address',
            required: false,
            codec: 'm',
          },
          {
            name: 'ReserveAddr',
            description:
              'The address of the account that holds the reserve (non-minted) units of the asset. This address has no specific authority in the protocol itself. It is used in the case where you want to signal to holders of your asset that the non-minted units of the asset reside in an account that is different from the default creator account (the sender).',
            type: 'Address',
            required: false,
            codec: 'r',
          },
          {
            name: 'FreezeAddr',
            description:
              'The address of the account used to freeze holdings of this asset. If empty, freezing is not permitted.',
            type: 'Address',
            required: false,
            codec: 'f',
          },
          {
            name: 'ClawbackAddr',
            description:
              'The address of the account that can clawback holdings of this asset. If empty, clawback is not permitted.',
            type: 'Address',
            required: false,
            codec: 'c',
          },
        ],
      },
    ],
  },
  {
    name: 'Asset Transfer',
    transactionObjectType: 'AssetTransferTx',
    type: 'axfer',
    fields: [
      {
        name: 'Asset ID',
        description: 'The unique ID of the asset to be transferred.',
        type: 'uint64',
        required: true,
        codec: 'xaid',
      },
      {
        name: 'Amount',
        description:
          "The amount of the asset to be transferred. A zero amount transferred to self allocates that asset in the account's Asset map.",
        type: 'uint64',
        required: true,
        codec: 'aamt',
      },
      {
        name: 'Receiver',
        description: 'The recipient of the asset transfer.',
        type: 'Address',
        required: true,
        codec: 'arcv',
      },
      {
        name: 'Close Remainder To',
        description:
          "Specify this field to remove the asset holding from the sender account and reduce the account's minimum balance (i.e. opt-out of the asset).",
        type: 'Address',
        required: false,
        codec: 'aclose',
      },
    ],
  },
  {
    name: 'Asset Accept',
    transactionObjectType: 'AssetTransferTx',
    type: 'axfer',
    fields: [
      {
        name: 'Asset ID',
        description: 'The unique ID of the asset to opt-in to.',
        type: 'uint64',
        required: true,
        codec: 'xaid',
      },
    ],
  },
  {
    name: 'Asset Clawback',
    transactionObjectType: 'AssetTransferTx',
    type: 'axfer',
    fields: [
      {
        name: 'Asset ID',
        description: 'The unique ID of the asset to opt-in to.',
        type: 'uint64',
        required: true,
        codec: 'xaid',
      },
      {
        name: 'Amount',
        description: 'The amount of the asset to be transferred.',
        type: 'uint64',
        required: true,
        codec: 'aamt',
      },
      {
        name: 'Receiver',
        description: 'The recipient of the asset transfer.',
        type: 'Address',
        required: true,
        codec: 'arcv',
      },
      {
        name: 'Close Remainder To',
        description:
          'Specify this field to remove the entire asset holding balance from the AssetSender account. It will not remove the asset holding.',
        type: 'Address',
        required: false,
        codec: 'aclose',
      },
    ],
  },
  {
    name: 'Asset Freeze',
    transactionObjectType: 'AssetFreezeTx',
    type: 'afrz',
    fields: [
      {
        name: 'Freeze Account',
        description:
          'The address of the account whose asset is being frozen or unfrozen.',
        type: 'Address',
        required: true,
        codec: 'fadd',
      },
      {
        name: 'Freeze Asset',
        description: 'The asset ID being frozen or unfrozen.',
        type: 'uint64',
        required: true,
        codec: 'faid',
      },
      {
        name: 'Asset Frozen',
        description: 'True to freeze the asset.',
        type: 'bool',
        required: true,
        codec: 'afrz',
      },
    ],
  },
  {
    name: 'Application Creation',
    transactionObjectType: 'ApplicationCallTx',
    type: 'appl',
    fields: [
      {
        name: 'OnComplete',
        description:
          'Defines what additional actions occur with the transaction. See the OnComplete section of the TEAL spec for details.',
        type: 'uint64',
        required: true,
        codec: 'apan',
      },
      {
        name: 'Accounts',
        description:
          "List of accounts in addition to the sender that may be accessed from the application's approval-program and clear-state-program.",
        type: 'Address[]',
        required: false,
        codec: 'apat',
      },
      {
        name: 'Approval Program',
        description:
          'Logic executed for every application transaction, except when on-completion is set to "clear". It can read and write global state for the application, as well as account-specific local state. Approval programs may reject the transaction.',
        type: 'byte[]',
        required: true,
        codec: 'apap',
      },
      {
        name: 'Clear State Program',
        description:
          'Logic executed for application transactions with on-completion set to "clear". It can read and write global state for the application, as well as account-specific local state. Clear state programs cannot reject the transaction.',
        type: 'byte[]',
        required: true,
        codec: 'apsu',
      },
      {
        name: 'App Arguments',
        description:
          "Transaction specific arguments accessed from the application's approval-program and clear-state-program.",
        type: 'byte[]',
        required: false,
        codec: 'apaa',
      },
      {
        name: 'Foreign Apps',
        description:
          "Lists the applications in addition to the application-id whose global states may be accessed by this application's approval-program and clear-state-program. The access is read-only.",
        type: 'Address[]',
        required: false,
        codec: 'apfa',
      },
      {
        name: 'Foreign Assets',
        description:
          "Lists the assets whose AssetParams may be accessed by this application's approval-program and clear-state-program. The access is read-only.",
        type: 'uint64[]',
        required: false,
        codec: 'apas',
      },
      {
        name: 'Extra Program Pages',
        description:
          "Number of additional pages allocated to the application's approval and clear state programs. Each ExtraProgramPages is 2048 bytes. The sum of ApprovalProgram and ClearStateProgram may not exceed 2048*(1+ExtraProgramPages) bytes.",
        type: 'uint64',
        required: false,
        codec: 'apep',
      },
      {
        name: 'GlobalStateSchema',
        description:
          'Maximum number of integer values that may be stored in the global application key/value store. Immutable.',
        type: 'uint64',
        required: true,
        codec: 'apgs',
        fields: [
          {
            name: 'Global Num Ints',
            description:
              'Maximum number of integer values that may be stored in the global application key/value store. Immutable.',
            type: 'uint64',
            required: true,
            codec: 'nui',
          },
          {
            name: 'Global Num ByteSlices ',
            description:
              'Maximum number of byte slices values that may be stored in the global application key/value store. Immutable.',
            type: 'uint64',
            required: true,
            codec: 'nbs',
          },
        ],
      },
      {
        name: 'LocalStateSchema',
        description:
          'Maximum number of byte slices values that may be stored in the global application key/value store. Immutable.',
        type: 'uint64',
        required: true,
        codec: 'apls',
        fields: [
          {
            name: 'Local Num Ints',
            description:
              'Maximum number of integer values that may be stored in the local  application key/value store. Immutable.',
            type: 'uint64',
            required: true,
            codec: 'nui',
          },
          {
            name: 'Local Num ByteSlices',
            description:
              'Maximum number of byte slices values that may be stored in the local  application key/value store. Immutable.',
            type: 'uint64',
            required: true,
            codec: 'nbs',
          },
        ],
      },
    ],
  },
  {
    name: 'Application Call',
    transactionObjectType: 'ApplicationCallTx',
    type: 'appl',
    fields: [
      {
        name: 'Application ID',
        description:
          'ID of the application being configured or empty if creating.',
        type: 'uint64',
        required: true,
        codec: 'apid',
      },
      {
        name: 'OnComplete',
        description:
          'Defines what additional actions occur with the transaction.',
        type: 'uint64',
        required: true,
        codec: 'apan',
      },
      {
        name: 'Accounts',
        description:
          "List of accounts in addition to the sender that may be accessed from the application's approval-program and clear-state-program.",
        type: 'Address[]',
        required: false,
        codec: 'apats',
      },
      {
        name: 'App Arguments',
        description:
          "Transaction specific arguments accessed from the application's approval-program and clear-state-program.",
        type: 'byte[]',
        required: false,
        codec: 'apan',
      },
      {
        name: 'Foreign Apps',
        description:
          "Lists the applications in addition to the application-id whose global states may be accessed by this application's approval-program and clear-state-program. The access is read-only.",
        type: 'Address[]',
        required: false,
        codec: 'apfa',
      },
      {
        name: 'Foreign Assets',
        description:
          "Lists the assets whose AssetParams may be accessed by this application's approval-program and clear-state-program. The access is read-only.",
        type: 'uint64[]',
        required: false,
        codec: 'apas',
      },
    ],
  },
];
