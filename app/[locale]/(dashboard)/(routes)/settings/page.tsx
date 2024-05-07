"use client";  //Becuse we are using useForm hook  (it uses a context)

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";


const LandingPage = () => {
  
  const pathname = usePathname();
  const  router = useRouter();
  const home = useTranslations('home'); 


  const routes = [
    {
        label : "ENGLISH - ENGLISH",
        href : "/en/settings",
        key : 1,
    },
    {
        label : "HINDI - हिंदी",
        href : "/hi/settings",
        key : 2,
    },
    {
        label : "PUNJABI - ਪੰਜਾਬੀ",
        href : "/pa/settings",
        key : 3,
    },
    {
        label : "TAMIL - தமிழ்",
        href : "/ta/settings",
        key : 4,
    },
    {
        label : "TELUGU - తెలుగు",
        href : "/te/settings",
        key : 5,
    },
    {
        label : "CHINESE - 中国人",
        href : "/zh/settings",
        key : 6,
    },
    {
        label : "JAPANESE - 日本語",
        href : "/ja/settings",
        key : 7,
    },
    {
      label : "FRENCH - FRANÇAISE",
      href : "/fr/settings",
      key : 8,
  },
  {
    label : "ITALIAN - ITALIANO",
    href : "/it/settings",
    key : 9,
  },
  {
    label : "SPANISH - ESPAÑOL",
    href : "/es/settings",
    key : 10,
  },
  {
    label : "GERMAN - DEUTSCH",
    href : "/de/settings",
    key : 11,
 },
];

  return (
    <>
      <div className="pb-8 px-10 bg-[#b4ded3]">
        <div className="mb-10 space-y-4">
          <h2 className="px-2 text-2xl md:text-4xl font-bold text-center">
            CHAI-GPT : {home('header_line')}
          </h2>
          <p className="px-2 text-muted-foreground text-sm md:text-lg text-center">
            {home('tagline')}
          </p>
        </div>
          <div className="px-4 md:px-20 lg:px-32">
            <div className="flex flex-row gap-4 mb-4 p-2 bg-[#77B0AA] rounded-lg items-center justify-center shadow-md shadow-zinc-600 hover:shadow-zinc-700">
              <h1 className="text-2xl font-bold text-center ">Manage Your Account : </h1>
              <div className="p-1"><UserButton afterSignOutUrl="/" /></div>
            </div>
            <div className="flex flex-col items-center p-10 gap-3  bg-gradient-to-b from-[#77B0AA] to-[#135D66] rounded-lg shadow-lg shadow-zinc-700 hover:shadow-zinc-800 transition">
                <h1 className="text-2xl font-bold text-center">Choose Your Language</h1>
                {routes.map((route)=>(
                  <button  onClick={router.refresh}>
                    <Link
                    href={route.href}
                    key={route.key}
                    className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:shadow-md hover:shadow-zinc-700 hover:bg-white/30 rounded-lg transition",
                    pathname.includes(route.href) ? "text-white bg-white/20 shadow-md shadow-zinc-900" : "text-white")}
                    >
                        <div className="flex text-lg items-center w-fit flex-1 hover:scale-105 hover:text-md transition">
                            {route.label}
                        </div>
                    </Link>
                    </button>
                  ))}
            </div>
          </div>
      </div>
    </>
  )
}


export default LandingPage;
