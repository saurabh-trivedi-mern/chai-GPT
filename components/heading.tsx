import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
// import Image from "next/image";

interface HeadingProps{
    title : string;
    description : string;
    icon : LucideIcon;
    iconcolor ?: string;
    bgColor ?: string;
}


const Heading = ({title, description, icon : Icon, iconcolor, bgColor } : HeadingProps) => {
    return ( 
        <>
         <div className="px-4 lg:px-8 flex justify-center items-center gap-x-3 mb-8">
             <div className={cn("p-2 w-fit rounded-md", bgColor)}>
               <Icon className={cn("w-10 h-10", iconcolor)} />
               {/* <Image src="/logo.png" width={45} height={45} alt="logo" /> */}
             </div>
             <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
         </div>
         </div>  
        </>
     );
}
 
export default Heading;