import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { authenticateUser, authState } from "../components/authenticationSlice";
// import "../styles/Home.module.css";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

function signup() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()
  

  const dispatch = useDispatch()
  const authDetails = useSelector(authState)
  console.log(authDetails)

  const connectWalletHandler = async () => {
    setError("");
    //check if eth wallet exists

    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        console.log("handler log");
        //request wallet connection
        await window.ethereum.request({ method: "eth_requestAccounts" });
        //create a web3 instance
        const web3 = new Web3(window.ethereum);
        //set web3 instance in react statee
        setWeb3(web3);
        //get list of all accounts
        const accounts = await web3.eth.getAccounts();
        //set account 1 to react state
        setAddress(accounts[0]);
        setIsConnected(true);
        dispatch(authenticateUser(accounts[0]))
        router.push("/storage")

        //create local contract copy
      } catch (e) {
        setError(e.message);
      }
    } else {
      console.alert("PLEASE INSTALL ETH WALLET");
    }
  };

  console.log(address);
  return (
    <div className={styles.signUpWrapper}>
      {!authDetails.isAuthenticated ? (
        <Button  onClick={connectWalletHandler}  style={{
          background: "rgb(38,166,154)",
          color: "white",
    
        }}
        size="large">  
          CONNECT WALLET
        </Button>
      ) : (
        <>
          <h1>Wallet successfully connected! </h1>

          <h3> Welcome your public key for encryption is: {authDetails.metaMaskAddress}</h3>
        </>
      )}
    </div>
  );
}

export default signup;
