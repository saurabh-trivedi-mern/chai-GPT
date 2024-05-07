"use client"
import React from 'react'
import styles from './creator.module.css'
// import ThemeToggle from '../../components/themeToggle/ThemeToggle'
import Image from "next/image"

const About = () => {
  return (
    <div className={styles.container}>
      {/* <ThemeToggle />  */}

      <div className={styles.wrapper}>
        <div className={styles.floating}></div>
        <div className={styles.imgBox}>
           <Image className={styles.profile} src={"/profile3.png"} fill />
        </div>
        <div className={styles.textBox}>
          <h1>I'm Saurabh Trivedi.</h1>
          <h2>A Full Stack Web Developer</h2>
          <br />
          <h3>
            I am a Computer Science Student at Galgotias University. 
            <br />
            <br />
            I specialize in building responsive web applications using modern technologies such as React, NextJS, Tailwind, Javascript, TypeScript, Node.js, and MongoDB.
            <br />
            <br />
            I am passionate about web development and enjoy creating web apps to deliver high-quality software solutions.
            <br />
            <br />
            I have a strong command over both front-end and back-end technologies, allowing me to build complete and scalable applications.
          </h3>
          <br />
          <div className={styles.socials}>  
            <Image className={styles.social} src="/facebook.png" alt='facebook' width={24} height={24}/>
            <Image className={styles.social} src="/instagram.png" alt='instagram' width={24} height={24}/>
            <Image className={styles.social} src="/youtube.png" alt='youtube' width={24} height={24}/>
            <Image className={styles.social} src="/tiktok.png" alt='tiktok' width={24} height={24}/>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default About
