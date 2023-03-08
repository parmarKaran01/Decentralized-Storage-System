import React, { useEffect } from "react";
import styles from "../styles/Storage.module.css";
import { useCallback, useState } from "react";
import { useDropzone, FileRejection, FileError } from "react-dropzone";
import { FirebaseStorage } from "../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { authState } from "../components/authenticationSlice";
import { useRouter } from "next/router";
import axios from "axios";

function storage() {
  const [value, setValue] = useState([]);
  const userAuthenticated = useSelector(authState);
  const [cid, setCid] = useState("");
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [calculatedSize, setCalculatedSize] = useState(0);

  const JWT = `Bearer `;
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      // setValue((prevState) => [...prevState, file]);
      setValue(file);
    });
    console.log("accepted Files", acceptedFiles);
    console.log("rejected Files", rejectedFiles);
  }, []);

  useEffect(() => {
    // console.log(value)
    handleCall();
    // CalculateTotalSize()
  }, []);

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

  // const data = value.map((file) => {
  //   return (
  //     <li key={file.path} className={styles.fileName}>
  //       {file.name} - {file.size} bytes
  //     </li>
  //   );
  // });

  // const uploadData = () => {
  //   if (value == null) {
  //     alert("please select a file");
  //     return;
  //   }

  //   const valueRef = ref(FirebaseStorage, `images/${value[0].name}`);
  //   uploadBytesResumable(valueRef, value[0]).then(() => {
  //     alert("Files uploaded");
  //   });

  //   setValue([]);
  // };

  //ipfs upload code

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

    formData.append("file", value);

    const metadata = JSON.stringify({
      name: value?.name,
      id: userAuthenticated.metaMaskAddress,
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
      console.log(res.data);
      setCid(res.data.IpfsHash);
    } catch (error) {
      console.log(error);
    }
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
          <button
            onClick={() => handleSubmission()}
            className={styles.uploadButton}
          >
            Upload
          </button>
          {/* <button onClick={() => handleCall()} className={styles.uploadButton}>
            View
          </button> */}
          <div className={styles.files}>
            {value?.name}
            <span>{cid}</span>
          </div>
        </div>

        {/* <div>
          {displayData.length > 0
            ? displayData.map((file) => {
                return (
                  <div>
                    <a
                      href={`https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}`}
                      target="_blank"
                    >
                      {file?.metadata.name}
                    </a>
                  </div>
                );
              })
            : null}
        </div> */}

        <div>
          <table className="table">
            <tr className="tr">
              <th className="td">File Name</th>
              <th className="td">Ipfs Hash</th>
              <th className="td">Created On</th>
            </tr>

            {displayData.length > 0
              ? displayData.map((file) => {
                  return (
                    <tr className="tr">
                      <td className="td">
                        <a
                          href={`https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}`}
                          target="_blank"
                        >
                          {file?.metadata.name}
                        </a>
                      </td>
                      <td className="td">
                        {file?.ipfs_pin_hash}
                      </td>
                      <td className="td">
                        {file?.date_pinned}
                      </td>
                    </tr>
                  );
                })
              : null}
          </table>
        </div>
      </section>
    </div>
  );
}

export default storage;
