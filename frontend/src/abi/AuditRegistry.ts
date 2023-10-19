export const REGISTRY_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
    ],
    name: "Added",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
    ],
    name: "Removed",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "target", type: "address" },
      { internalType: "string", name: "reportLink", type: "string" },
      { internalType: "string", name: "company", type: "string" },
      { internalType: "address[]", name: "related", type: "address[]" },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "codeHashMatches",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "getArtifacts",
    outputs: [
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "bytes32", name: "codeHash", type: "bytes32" },
          { internalType: "uint256", name: "chainid", type: "uint256" },
          { internalType: "string", name: "link", type: "string" },
          { internalType: "string", name: "company", type: "string" },
          {
            internalType: "address[]",
            name: "related",
            type: "address[]",
          },
        ],
        internalType: "struct Artifact[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "getCodeHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "registry",
    outputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "bytes32", name: "codeHash", type: "bytes32" },
      { internalType: "uint256", name: "chainid", type: "uint256" },
      { internalType: "string", name: "link", type: "string" },
      { internalType: "string", name: "company", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "target", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
