import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Icon from "../Assets/Icons/icons8-web-scraper.svg";
import { useSelector } from "react-redux";
import { authState } from "./authenticationSlice";
import { Button } from "@mui/material";

function Navbar() {
  const { isAuthenticated } = useSelector(authState);
  return (
    <div className={styles.master_container}>
      <div className={styles.left_container}>
        <Image src={Icon} />
        <Link href="/">
          <h2 className={styles.mainTitle}>Web3 Storage</h2>
        </Link>
      </div>
      <div className={styles.right_container}>
        <div className={styles.inner_right_container}>
          <ul className={styles.links}>
            <Link href="/storage">
              <li className={styles.link}>Storage</li>
            </Link>
            <Link href="/pricing">
              <li className={styles.link}>Pricing</li>
            </Link>
            {/* <Link href="/docs">
              <li className={styles.link}>Docs</li>
            </Link> */}
          </ul>
          {isAuthenticated === false ? (
            <Link href="/signup">
              <Button
                style={{
                  background: "rgb(38,166,154)",
                  color: "white",
            
                }}
                size="large"
              >
                Connect Wallet
              </Button>
            </Link>
          ) : null}
          {/* <Link href="/signup"><button className={styles.btn}>Sign Up</button></Link> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
