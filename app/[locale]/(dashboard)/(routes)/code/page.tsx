"use client";  //Becuse we are using useForm hook  (it uses a context)

import Heading from "@/components/heading";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FileJson } from "lucide-react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

import { formSchema } from "./constants";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useTranslations } from "next-intl";


const CodePage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    
    const codebot = useTranslations('codebot'); 
    const common = useTranslations('common'); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : { prompt : ""}
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try{
           const userMessage : ChatCompletionMessageParam = {
            role : "user",
            content : values.prompt,
           };
           const newMessages = [...messages, userMessage];

           const response = await axios.post("/api/code", {
            messages : newMessages,
           });

           setMessages((current) => [...current, userMessage, response.data]);

           form.reset();

        } catch(error : any){
            //TODO : Pro Subscription
            console.log(error);
        } finally{
            router.refresh();
        }
};

    return ( 
        <div className="pb-1 md:px-10 px-1 bg-[#b4ded3]">
            <Heading 
            title={codebot("title")}
            description={codebot("description")}
            icon={FileJson}
            iconcolor="text-green-700"
            bgColor="bg-[#77B0AA]"
            />
            <div className="px-4 lg:px-8 mb-12">
                <div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 shadow-md bg-[#77B0AA] shadow-zinc-700"
                        >
                        <FormField
                        name="prompt"
                        render={({field})=>(
                           <FormItem className="col-span-12 lg:col-span-10 focus-visible:ring-0 rounded-md shadow-md border-0 outline-none shadow-zinc-500">
                              <FormControl className="m-0 p-0">
                                  <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-[#E3FEF7] px-3 bg-[#E3FEF7]"
                                        disabled={isLoading} 
                                        placeholder="How to center a div using HTML and CSS."
                                        autoComplete="off"
                                        {...field}
                                         />
                              </FormControl>
                           </FormItem>
                        )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full bg-[#135D66]" disabled={isLoading}>
                           {common("generate_btn")}
                        </Button>
                      </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-[#77B0AA] shadow-lg shadow-zinc-600">
                            <Loader url="code_bot_url" />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty />
                        </div>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message : any) => (
                            <div 
                            key={Math.random()}
                            className={cn("p-6 w-full flex items-start gap-x-8 rounded-lg bg-slate-400", 
                            message.role === "user" ? "bg-gray-100 border border-black/10" : "bg-green-100")}
                            >
                                {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                                <ReactMarkdown 
                                components={{
                                    pre: ({node, ...props}) =>(
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props} />
                                        </div>
                                    ),
                                    code : ({node, ...props}) =>(
                                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                                    )
                                }}
                                className="text-sm overflow-hidden leading-7"
                                >
                                    {message.content} 
                                </ReactMarkdown>
                                {/* {message.role === "user" ? <h1 className="text-lg font-bold"> {message.content} </h1> : <h1 className="text-lg"> {message.content} </h1>} */}
                                {/* <TextToSpeech text={message.content}/> */}
                            </div>
                        ))}
                    </div>
                    {
                        messages.length >0 && (<div className="w-full h-12 bg-gray-300 text-center p-4 font-bold rounded-lg">
                        Go On & Generate More Images!
                    </div>)
                    }
                    
                </div>
            </div>
        </div>
     );
}
 
export default CodePage;


