const fileUploader_abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_cid",
          type: "string",
        },
      ],
      name: "addfile",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "files",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getfiles",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  
  const fileUploaderContract = (web3) => {
    return new web3.eth.Contract(
      fileUploader_abi,
      "0xDDDb983401DE8Bdbb1C9ddFce6cac3EF1da4E52B"
    );
  };
  
  export default fileUploaderContract;