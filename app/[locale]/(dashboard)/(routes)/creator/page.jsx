"use client"
import React from 'react'
import styles from './creator.module.css'
// import ThemeToggle from '../../components/themeToggle/ThemeToggle'
import Image from "next/image"
import Link from 'next/link'

const About = () => {
  return (
    <div className={styles.container}>
      {/* <ThemeToggle />  */}

      <div className={styles.wrapper}>
        <div className={styles.floating}></div>
        <div className={styles.imgBox}>
           <Image className={styles.profile} src={"/profile3.png"} fill  alt="image" />
        </div>
        <div className={styles.textBox}>
          <h1>I&apos;m Saurabh Trivedi.</h1>
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
            <Link href="https://www.linkedin.com/in/saurabh-trivedi-mern/" target='_blank'><Image className={styles.social} src="/linkedin.png" alt='linkedin' width={24} height={24}/></Link>
            <Link href="https://github.com/saurabh-trivedi-mern?tab=repositories" target='_blank'><Image className={styles.social} src="/github.png" alt='github' width={26} height={26}/></Link>
            <Link href="https://leetcode.com/u/saurabh-trivedi/" target='_blank'><Image className={styles.social} src="/leetcode.png" alt='leetcode' width={36} height={24}/></Link> 
            <Link href="https://www.instagram.com/saurabh.jkt/" target='_blank'><Image className={styles.social} src="/instagram.png" alt='instagram' width={24} height={24}/></Link>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
}

export default About
