import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import HALO from "vanta/dist/vanta.halo.min";
import Link from "next/link";
import * as THREE from "three";
import { Button } from "@mui/material";

export default function Home() {
  // const [vantaEffect, setVantaEffect] = useState(0);
  // const myRef = useRef();
  // useEffect(() => {
  //   // console.log("BIRDS", myRef.curent);
  //   if (!vantaEffect) {
  //     setVantaEffect(
  //       HALO({
  //         THREE,
  //         el: myRef.current,
  //         // backgroundColor : "#fffff",
  //         // color: "#26a69a",
  //         // points: 15
  //         mouseControls: true,
  // touchControls: true,
  // gyroControls: false,
  // minHeight: 200.00,
  // minWidth: 200.00,
  // amplitudeFactor: 3.00,
  // size: 3.00
  //       })
  //     );
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Decentralized Storage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h2 className={styles.mainTitle}>This is the new Storage app</h2> */}
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h3 className={styles.content}>
            The easiest way to store data on the decentralized web.
          </h3>
          <Link href="/signup">
            {/* <button className={styles.btn}>Start Storing Now</button> */}
            <Button style={{
              background: "rgb(38,166,154)",
              color: "white",
              width:"15rem"
            }}
            size="large">Start Storing Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
