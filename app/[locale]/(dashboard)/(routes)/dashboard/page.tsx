"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ApertureIcon, ArrowRight, Bot, Camera, FileJson, Settings, Music2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {useTranslations} from 'next-intl';
import { Suspense } from "react";


const DashBoardPage = () => {

    const  router = useRouter();
    const home = useTranslations('home'); 
    const chatbot = useTranslations('chatbot'); 
    const codebot = useTranslations('codebot'); 
    const imagebot = useTranslations('imagebot'); 
    const animebot = useTranslations('animebot'); 
    const audiobot = useTranslations('audiobot'); 
    const settings = useTranslations('settings');

    const tools = [
        {
            label : <p>{chatbot("title")}</p>,
            icon: Bot,
            href : "/conversation",
            color : "text-violet-500",
            bgColor : "bg-[#b4ded3]",
            video : "/chatbotvideo.mp4",
            key : 1,
        },
        {
            label : <p>{codebot("title")}</p>,
            icon : FileJson,
            href : "/code",
            color : "text-green-700",
            bgColor : "bg-[#b4ded3]",
            video : "/chatbotvideo.mp4",
            key : 2,
        },
        {
            label : <p>{imagebot("title")}</p>,
            icon : Camera,
            href : "/images",
            color : "text-pink-500",
            bgColor : "bg-[#b4ded3]",
            video : "/chatbotvideo.mp4",
            key : 3,
        },
        {
            label : <p>{animebot("title")}</p>,
            icon : ApertureIcon,
            href : "/animeImages",
            color : "text-red-500",
            bgColor : "bg-[#b4ded3]",
            video : "/chatbotvideo.mp4",
            key : 4,
        },
        {
            label : <p>{audiobot("title")}</p>,
            icon : Music2Icon,
            href : "/textToSpeech",
            color : "text-emerald-700",
            bgColor : "bg-[#b4ded3]",
            video : "/chatbotvideo.mp4",
            key : 5,
        },
        {
            label : <p>{settings("title")}</p>,
            icon : Settings,
            href : "/settings",
            color : "text-black",
            bgColor : "bg-[#b4ded3]",
            video : "/chatbotvideo.mp4",
            key : 5,
        },
    ]

    return ( <>
            <div className="homescreen pb-8 bg-[#b4ded3]">
             <div className="mb-8 space-y-4">
                <h2 className="px-2 text-2xl md:text-4xl font-bold text-center">
                    CHAI-GPT : {home('header_line')}
                </h2>
                <p className="px-2 text-muted-foreground text-sm md:text-lg text-center">
                {home('tagline')}
                </p>
             </div>
             <div className="px-4 md:px-20 lg:px-32 space-y-7">
             <Suspense fallback={"Loading...."}>
                {tools.map((tool)=>(
                        <Card onClick={()=> router.push(tool.href)} 
                        key={tool.key}
                        className="p-4 bg-[#77B0AA] border-black/5 flex items-center justify-between shadow-md shadow-zinc-400 hover:shadow-lg hover:shadow-zinc-500 transition cursor-pointer">
                            <div className="flex flex-row gap-x-6 md:gap-x-40 lg:gap-x-80">
                                <div className="flex flex-col gap-y-4">
                                    <div>
                                    <video width={600} height={700} muted autoPlay loop>
                                         <source src={tool.video} type="video/mp4" />
                                    </video>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-xl", tool.bgColor)}>
                                        <tool.icon className={cn("w-8 h-8", tool.color)} />
                                    </div>
                                    <div className="font-semibold flex flex-row gap-x-4">
                                        <div>
                                          {tool.label}
                                        </div>
                                        <div className="flex items-center">
                                          <ArrowRight className="w-5 h-5" />
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                    ))}
            </Suspense>
                </div>
            </div>
            </>
     );
}
 
export default DashBoardPage;



