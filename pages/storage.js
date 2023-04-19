import React, { useEffect } from "react";
import styles from "../styles/Storage.module.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { authState } from "../components/authenticationSlice";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "@mui/material";
import fileUploaderContract from "../FileUploader.sol/FileUploader.json";
import moment from "moment/moment";
const ethers = require("ethers");

const isBrowser = () => typeof window !== "undefined";
function storage() {
  if (isBrowser()) {
    const { ethereum } = window;
  }

  const [account, setAccount] = useState("");
  const [contractData, setContractData] = useState([]);
  const [contract, setContract] = useState(null);
  const [selectedFile, setSelectedFile] = useState([]);
  const userAuthenticated = useSelector(authState);
  const [cid, setCid] = useState("");
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [calculatedSize, setCalculatedSize] = useState(0);
  const [cidList, setCidList] = useState(null);
  const [fuContract, setFuContract] = useState();
  const reduxAuthState = useSelector(authState);
  const address = reduxAuthState.metaMaskAddress;

  const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMzNiNWE0MS1hZjJiLTQ2Y2YtYTEzNy03NjJkOGQ1MGZkMTAiLCJlbWFpbCI6Im1laHRhYWtzaGFyMTIzNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzMwMWQwMDI3NTg0ZGU0ZDJlN2QiLCJzY29wZWRLZXlTZWNyZXQiOiI4ZWM5ZDViNzU3ZmQ1ODM4YmY2NzQ1MzMxZTNjYmNkZTM0MmM5ODYwOGEzNmJjYzI4M2E2NzM2ZWVhMTI4ZTA3IiwiaWF0IjoxNjc2NjMwNjQ2fQ.Yw-KIKg-ZFPB9kcdD90Qtp2FR_GGgzjn4DacrbOqbsc`;
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      // setValue((prevState) => [...prevState, file]);
      setSelectedFile(file);
    });
    console.log("accepted Files", acceptedFiles);
    console.log("rejected Files", rejectedFiles);
  }, []);

  useEffect(() => {
    // console.log(value)
    handleCall();
    // CalculateTotalSize()
  }, []);

  // useEffect(() => {
  //   if (fuContract) {
  //     getCIDList();
  //   }
  // }, [fuContract]);

  // const getCIDList = async () => {
  //   console.log(fuContract);
  //   const data = await fuContract.methods.getfiles().call();
  //   console.log(data);
  //   setCidList(data);
  // };

  const CalculateTotalSize = () => {
    let sum = 0;
    displayData?.map((file) => {
      sum += parseInt(file?.size);
    });
    setCalculatedSize(sum);
    console.log(sum);
  };

  useEffect(() => {
    if (!userAuthenticated.isAuthenticated) {
      router.push("/signup");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const config = {
    headers: {
      Authorization: JWT,
    },
  };
  const handleCall = async () => {
    try {
      const temp = await axios.get(
        `https://api.pinata.cloud/data/pinList?includeCount=false?status=pinned?hashContains=${cid}`,
        config
      );
      console.log(temp);
      setDisplayData(temp.data.rows);
      let sum = 0;
      temp.data.rows.map((file) => {
        sum += parseInt(file?.size);
      });
      setCalculatedSize(sum);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: "File name",
      id: address,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      console.log(res.data, res.data.IpfsHash);
      const txResponse = await contract.addfile(res.data.IpfsHash);
      const txReceipt = await txResponse.wait();
      console.log(txReceipt);
      setCid(res.data.IpfsHash);
      // getCIDList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRetrieve = async () => {
    // console.log(contract);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    if (provider.getCode("0x0dA8Bf33288B2b657Db534a17eff48BCEF8B5081")) {
      const list = await contract.getfiles();
      setContractData(list);
      // console.log(contractData);
    }
  };

  console.log("contract data", contractData);

  const connectContract = async () => {
    const contractAddress = "0x0dA8Bf33288B2b657Db534a17eff48BCEF8B5081";
    const contractABI = [
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tempContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setContract(tempContract);

    console.log(tempContract.address, tempContract);
  };
  console.log("display data", displayData);

  if (!userAuthenticated.isAuthenticated) {
    return <div>Please authenticate</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <section className={styles.pageContainer}>
        <div className={styles.accountContainer}>
          <div className={styles.accountContent}>
            <h4>Your Plan: Paid</h4>
            <h2>Storage: Used storage {calculatedSize} bytes</h2>
          </div>
        </div>
        <div className={styles.fileContainer}>
          <div className={styles.dropZone} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          {contract ? (
            <Button
              onClick={() => handleSubmission()}
              // className={styles.uploadButton}
              style={{
                background: "rgb(38,166,154)",
                color: "white",
                marginTop: "1rem",
              }}
              size="large"
            >
              Upload
            </Button>
          ) : null}

          {/* <button onClick={() => handleCall()} className={styles.uploadButton}>
            View
          </button> */}
          <div className={styles.files}>
            {selectedFile?.name}
            <span>{cid}</span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          {contract ? (
            <Button
              onClick={() => handleRetrieve()}
              style={{
                background: "rgb(38,166,154)",
                color: "white",
              }}
              size="large"
            >
              Get List
            </Button>
          ) : null}

          {!contract ? (
            <Button
              onClick={() => connectContract()}
              style={{
                background: "rgb(38,166,154)",
                color: "white",
              }}
              size="large"
            >
              Connect Contract
            </Button>
          ) : null}
        </div>

        {contract ? (
          <div>
            <table className="table">
              <tr className="tr">
                <th className="td">File Name</th>
                <th className="td">Ipfs Hash</th>
                <th className="td">Created On</th>
              </tr>

              {contractData
                ? contractData.map((file) => {
                    return (
                      <tr className="tr">
                        <td className="td">
                          <a
                            href={`https://gateway.pinata.cloud/ipfs/${file}`}
                            target="_blank"
                          >
                            {/* {console.log(file)} */}
                            {file}
                          </a>
                        </td>
                        <td className="td">{file?.ipfs_pin_hash}</td>
                        <td className="td">
                          {moment(file?.date_pinned).format("DD/MM/YYYY")}
                          {/* karan fix the date */}
                        </td>
                      </tr>
                    );
                  })
                : null}
            </table>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default storage;
