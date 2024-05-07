// import { error } from "console";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { any } from "zod";

interface LoaderProps{
    url : string;
}


const Loader = ({url} : LoaderProps) => {
    const[data, setData] = useState("");

    const sanskrit_url = "https://shloka.onrender.com/api/v1/chanakya/shloka/random";
    const chat_bot_url = "https://v2.jokeapi.dev/joke/Any";
    const code_bot_url = "https://v2.jokeapi.dev/joke/Programming?type=twopart";

    if(url === "sanskrit_url"){
        useEffect(()=> {
            fetch(sanskrit_url)
            .then((response) => response.json())
            .then((quotes) => setData(quotes.Sloka.replace(/\s+/g, ' ')))
            .catch((error => console.error(error)))
        },
        [setData]);
    }    
    else if(url === "chat_bot_url"){
        useEffect(()=> {
            fetch(chat_bot_url)
            .then((response) => response.json())
            .then((response) => setData(response.setup + "  " + response.delivery))
            .catch((error => console.error(error)))
        },
        [setData]);
    }
    else if(url === "code_bot_url"){
        useEffect(()=> {
            fetch(code_bot_url)
            .then((response) => response.json())
            .then((response) => setData(response.setup + "  " + response.delivery))
            .catch((error => console.error(error)))
        },
        [setData]);
    }


    return ( 
        <div className="flex flex-col gap-y-6 items-center justify-center max-h-fit max-w-full bg-[#77B0AA] p-8 pb-8 rounded-md ">
                <div className="relative pb-3">
                    <Image
                    alt="loader"
                    width="220"
                    height="220"
                    src="/loader-4.gif"
                    />
                </div>
                <div>
                    <p className="text-md text-gray-800 md:w-96 max-w-80 max-h-40 text-center">
                        {data ? <strong className="animate-pulse ease-out transition-colors">{JSON.stringify(data)}</strong> : <strong>Loading....</strong>}
                    </p>
                </div>
        </div>
     );
}
 
export default Loader;