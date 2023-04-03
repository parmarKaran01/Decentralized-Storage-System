import React from "react";
import styles from "../styles/Pricing.module.css";
import Link from "next/link";
import { Button, Card, CardActions } from "@mui/material";

function pricing() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.headTitle}>Storage that grows with you</h2>
        <p className={styles.paragraph}>
          web3.storage is designed for scale and simplicity. Utilize our
          elastic, hosted data platform that natively integrates decentralized
          data and authentication protocols. No need to worry about performance
          or reliability.
        </p>
      </div>
      <div className={styles.cardContainer}>
        <Card
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            width: "300px",
          }}
        >
          <CardActions
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <div className={styles.cardTitle}>
              <span>
                <h1>Free</h1>
              </span>
              <span className={styles.prices}>₹0/mo</span>
            </div>

            <ul className={styles.features}>
              <li className={styles.feature}>
                Easily store your data and make it available on IPFS
              </li>
              <li className={styles.feature}>
                All data is replicated onto the Filecoin storage network for
                verifiability that your data is safe
              </li>
              <li className={styles.feature}>
                Use the platform's other services like w3name and w3link to
                build the next generation of apps
              </li>
            </ul>

            <div className={styles.storageAmount}>
              <h1 className={styles.amount}>Under Testing</h1>
            </div>
            <div className={styles.btnContainer}>
              <Link href="/storage">
                <Button
                  style={{
                    background: "rgb(38,166,154)",
                    color: "white",
                  }}
                  size="large"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </CardActions>
        </Card>
        <Card
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            width: "300px",
          }}
        >
          <CardActions
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <div className={styles.cardTitle}>
              <span>
                <h1>Free</h1>
              </span>
              <span className={styles.prices}>₹0/mo</span>
            </div>

            <ul className={styles.features}>
              <li className={styles.feature}>
                Easily store your data and make it available on IPFS
              </li>
              <li className={styles.feature}>
                All data is replicated onto the Filecoin storage network for
                verifiability that your data is safe
              </li>
              <li className={styles.feature}>
                Use the platform's other services like w3name and w3link to
                build the next generation of apps
              </li>
            </ul>

            <div className={styles.storageAmount}>
              <h1 className={styles.amount}>Under Testing</h1>
            </div>
            <div className={styles.btnContainer}>
              <Link href="/storage">
                <Button
                  style={{
                    background: "rgb(38,166,154)",
                    color: "white",
                  }}
                  size="large"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </CardActions>
        </Card>
        <Card
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            width: "300px",
          }}
        >
          <CardActions
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <div className={styles.cardTitle}>
              <span>
                <h1>Free</h1>
              </span>
              <span className={styles.prices}>₹0/mo</span>
            </div>

            <ul className={styles.features}>
              <li className={styles.feature}>
                Easily store your data and make it available on IPFS
              </li>
              <li className={styles.feature}>
                All data is replicated onto the Filecoin storage network for
                verifiability that your data is safe
              </li>
              <li className={styles.feature}>
                Use the platform's other services like w3name and w3link to
                build the next generation of apps
              </li>
            </ul>

            <div className={styles.storageAmount}>
              <h1 className={styles.amount}>Under Testing</h1>
            </div>
            <div className={styles.btnContainer}>
              <Link href="/storage">
                <Button
                  style={{
                    background: "rgb(38,166,154)",
                    color: "white",
                  }}
                  size="large"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </CardActions>
        </Card>
        {/* <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>
              <h1>Free</h1>
            </span>
            <span className={styles.prices}>₹0/mo</span>
          </div>

          <ul className={styles.features}>
            <li className={styles.feature}>
              Easily store your data and make it available on IPFS
            </li>
            <li className={styles.feature}>
              All data is replicated onto the Filecoin storage network for
              verifiability that your data is safe
            </li>
            <li className={styles.feature}>
              Use the platform's other services like w3name and w3link to build
              the next generation of apps
            </li>
          </ul>

          <div className={styles.storageAmount}>
            <h1 className={styles.amount}>Under Testing</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/storage">
              <button className={styles.btn}>Get Started</button>
            </Link>
          </div>
        </div> */}
        {/* second container */}
        {/* <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>
              <h1>Lite</h1>
            </span>
            <span className={styles.prices}>₹500/mo</span>
          </div>

          <ul className={styles.features}>
            <li className={styles.feature}>
              Everything from the Free tier, plus...
            </li>
            <li className={styles.feature}>
              Additional storage for personal usage or projects requiring lower
              data volumes
            </li>
          </ul>

          <div className={styles.storageAmount}>
            <h1 className={styles.amount}>15GiB storage</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/storage">
              <button className={styles.btn}>Get Started</button>
            </Link>
          </div>
        </div> */}

        {/* third container */}
        {/* <div className={styles.card}>
          <div className={styles.cardTitle}>
            <span>
              <h1>Expert</h1>
            </span>
            <span className={styles.prices}>₹1000/mo</span>
          </div>

          <ul className={styles.features}>
            <li className={styles.feature}>
              Everything from the Lite tier, plus...
            </li>
            <li className={styles.feature}>
              Our lowest tier price per GiB stored for use cases that require
              scale
            </li>
            <li className={styles.feature}>
              Early access to additional products that make web3
              production-ready
            </li>
          </ul>

          <div className={styles.storageAmount}>
            <h1 className={styles.amount}>60GiB storage</h1>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/storage">
              <button className={styles.btn}>Get Started</button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default pricing;
