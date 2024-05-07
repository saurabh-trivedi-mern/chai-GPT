"use client"

import Image from "next/image";
import {useTranslations} from 'next-intl';

// interface EmptyProps{
//     label : string;
// }
// {label}:EmptyProps
// label="Nothing Here. Ask Me Anything."
export const Empty = () =>{
    const common = useTranslations('common'); 
    return(
        <div className="flex flex-col items-center justify-center mt-8 max-h-fit w-full bg-[#77B0AA] p-14 rounded-md shadow-lg shadow-zinc-600">
            <div className="relative pb-10">
                <Image
                alt="loader"
                width="200"
                height="200"
                src="/logo-chai.png"
                />
            </div>
            <p className="text-lg text-gray-600">
                {common("empty_label")}
            </p>
        </div>
    );
}