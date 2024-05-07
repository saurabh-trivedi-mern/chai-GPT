import React from 'react'
import styles from "./stars.module.css"
import Image from 'next/image'

const Stars = () => {
  return (
    <div>
      <Image className={`${styles.starImage} ${styles.starImage1}`} src={"/star.png"} height={15} width={10} />
      <Image className={`${styles.starImage} ${styles.starImage2}`} src={"/star.png"} height={10} width={15} />
      <Image className={`${styles.starImage} ${styles.starImage3}`} src={"/star.png"} height={10} width={10} />
      <Image className={`${styles.starImage} ${styles.starImage4}`} src={"/star.png"} height={15} width={10} />
      <Image className={`${styles.starImage} ${styles.starImage5}`} src={"/star.png"} height={10} width={20} />
    </div>
  )
}

export default Stars
