"use client";

import { cn } from "@/lib/utils";
import { ApertureIcon, Bot, Camera, FileJson, Home, Music, Music2Icon, Settings, } from "lucide-react";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useTranslations} from 'next-intl';

const montserrat = Montserrat({weight:"600", subsets:["latin"]});


const Sidebar = () => {
    
    const pathname = usePathname();
    const home = useTranslations('home'); 
    const chatbot = useTranslations('chatbot'); 
    const codebot = useTranslations('codebot'); 
    const imagebot = useTranslations('imagebot'); 
    const animebot = useTranslations('animebot'); 
    const audiobot = useTranslations('audiobot'); 
    const settings = useTranslations('settings'); 

    const routes = [
        {
            label : <p>{home("title")}</p>,
            icon : Home,
            href : "/dashboard",
            color : "text-sky-500",
            key : 1
        },
        {
            label : <p>{chatbot("title")}</p>,
            icon : Bot,
            href : "/conversation",
            color : "text-violet-600",
            key : 2,
        },
        {
            label : <p>{codebot("title")}</p>,
            icon : FileJson,
            href : "/code",
            color : "text-green-800",
            key : 3,
        },
        {
            label : <p>{imagebot("title")}</p>,
            icon : Camera,
            href : "/images",
            color : "text-pink-700",
            key : 4,
        },
        {
            label : <p>{animebot("title")}</p>,
            icon : ApertureIcon,
            href : "/animeImages",
            color : "text-red-500",
            key : 5,
        },
        {
            label : <p>{audiobot("title")}</p>,
            icon : Music2Icon,
            href : "/textToSpeech",
            color : "text-emerald-700",
            key : 6,
        },
        {
            label : <p>{settings("title")}</p>,
            icon : Settings,
            href : "/settings",
            color : "text-black",
            key : 7,
        },
    ];
    
    return ( 
        <>
            <div className="md:space-y-2 sm:space-y-4 py-5 flex flex-col bg-[#135D66] z-10 md:h-fit  text-white pb-20">
                <div className="px-3 py-2 flex-1">
                    <Link href="/dashboard" className="flex items-center pl-3 mb-3">
                        <div className="relative w-16 h-16 mr-2">
                            <Image 
                            fill
                            alt="Logo" 
                            src="/logo-chai.png"
                            />
                        </div>
                        <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                            CHAI-GPT
                        </h1>
                    </Link>
                    <div className="space-y-7 md:space-y-2">
                        {routes.map((route)=>(
                            <Link
                            href={route.href}
                            key={route.key}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:shadow-md hover:shadow-zinc-700 hover:bg-white/30 rounded-lg transition",
                                    pathname.includes(route.href) ? "text-white bg-white/20 shadow-md shadow-zinc-900" : "text-white")}
                            >
                                <div className="flex text-lg items-center flex-1 hover:scale-105 hover:text-md transition">
                                    <route.icon className={cn("h-11 w-11 mr-3 p-1 bg-slate-300 rounded-xl shadow-md shadow-zinc-900 hover:scale-105 filter brightness-125", route.color)} />
                                    {route.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Sidebar;