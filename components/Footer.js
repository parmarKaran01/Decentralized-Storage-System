import styles from "../styles/Footer.module.css"
import Icon from "../Assets/Icons/icons8-web-scraper.svg"
import Link from "next/link"
import Image from "next/image"

function Footer() {
  return (
    <div className={styles.container}>
      <div>
        <hr />
      </div>
      <div className={styles.name}>
      <Image src={Icon}/>
        <Link href="/"><h2 className={styles.mainTitle}>Web3 Storage</h2></Link>
      </div>
      <div className={styles.copyright}>
        Copyright © 2022 Web3 Storage, Inc.
      </div>
      <div className={styles.links}>
        <Link href="/"><p className={styles.link}>Security</p></Link>
        <Link href="/storage"><p className={styles.link}>Storage</p></Link>
        <Link href="pricing"><p className={styles.link}>Pricing</p></Link>
      </div>
    </div>
  )
}

export default Footer