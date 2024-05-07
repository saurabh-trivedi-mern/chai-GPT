import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { UserButton, auth } from "@clerk/nextjs";
import styles from "./landing.module.css"
import Starfield from "@/components/stars";

const LandingPage = () => {
  return (
    <div className="bg-[#003C43] w-full h-content ">
      <Starfield
        starCount={1000}
        starColor={[220, 107, 25]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <div className={styles.container}>
        <div>
        <div className="flex flex-col items-center">
          <h1 className={styles.heading}>CHAI<Image className={styles.image} src="/logo-chai.png" alt="logo" height={50} width={150} />PT</h1>
          <h3 className={styles.tagline}>Imagine, Innovate & Ignite With Powers of AI</h3>
        </div> 
        <div className={styles.login_signup}>
          <div className={styles.buttons}>
            <Link href="/en/sign-in">
              <Button className={styles.button1}>
                Login
              </Button>
            </Link>
            <Link href="/en/sign-up">
              <Button className={styles.button2}>
                Signup
              </Button>
            </Link>
          </div>
          <div className={`${styles.accountBtn} flex text-center items-center px-3 py-1 rounded-3xl`}>
            <h1 className="text-xl text-white mr-2">Your Account :</h1> 
            <UserButton afterSignOutUrl="/en" />
          </div>
        </div>
          <div className="flex items-center justify-center pb-10"><Link href="/en/dashboard" className={`${styles.enterBtn} flex pl-3 mb-6 ml-8 rounded-3xl`}><h1 className="text-center text-white hover:text-black transition duration-500 text-3xl p-2">Enter The Web App</h1></Link></div>
       </div>
       <div className={styles.examples}>
         <h1 className=" text-black font-bold py-2 sm:text-xl md:text-3xl md:py-4 mb-6 bg-[#77B0AA] rounded-lg">Some Generated Outputs!</h1>
          <div className={`${styles.examplesDiv} flex gap-8 pl-4 pr-4 mb-12`}>
            <div>
              <Image className="rounded-2xl mb-2" src="/astraunautt.png" alt="example_image" width={400} height={400}/>
              <h1 className="z-10 text-white text-md md:text-xl">An astraunaut showing importance of plants.</h1>
            </div>
            <div>
              <Image className="rounded-2xl mb-2" src="/girl_at_beach.png" alt="example_image" width={400} height={400}/>
              <h1 className="z-10 text-white text-md md:text-xl">A girl with red hairs standing near a beach.</h1>
            </div>
            <div>
              <Image className="rounded-2xl mb-2" src="/boy.png" alt="example_image" width={400} height={400}/>
              <h1 className="z-10 text-white text-md md:text-xl">A handsome boy standing near a wall.</h1>
            </div>
          </div>
          <div className={`${styles.examplesDiv} flex gap-8 pl-4 pr-4 mb-12`}>
            <div>
              <Image className="rounded-2xl mb-2" src="/astraunaut.png" alt="example_image" width={400} height={400}/>
              <h1 className="z-10 text-white text-md md:text-xl">An astraunaut in the space over earth.</h1>
            </div>
            <div>
              <Image className="rounded-2xl mb-2" src="/sunset.png" alt="example_image" width={400} height={400}/>
              <h1 className="z-10 text-white text-md md:text-xl">A beautiful sunset between sky-high buildings.</h1>
            </div>
            <div>
              <Image className="rounded-2xl mb-2" src="/space.png" alt="example_image" width={400} height={400}/>
              <h1 className="z-10 text-white text-md md:text-xl">A girl riding a space car.</h1>
            </div>
          </div>
      </div>
      </div>
    </div>
    
  )
}

export default LandingPage;