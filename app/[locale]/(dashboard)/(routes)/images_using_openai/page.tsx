"use client";  //Becuse we are using useForm hook  (it uses a context)

import Heading from "@/components/heading";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Camera, Download } from "lucide-react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { amountOptions, formSchema, resolutionOptions} from "./constants";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Empty } from "@/components/empty";
import { useTranslations } from "next-intl";


const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const imagebot = useTranslations('imagebot'); 
    const common = useTranslations('common'); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : { 
            prompt : "",
            amount : "1",
            resolution : "1024x1024"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try{
           setImages([]);

           const response = await axios.post("/api/image", values);

           const urls  = response.data.map((image : {url : string}) => image.url);

           setImages(urls);

           form.reset();

        } catch(error : any){
            //TODO : Pro Subscription
            console.log(error);
        } finally{
            router.refresh();
        }
};


    return ( 
        <div className="pb-3 bg-gradient-to-b from-slate-50 to-gray-400">
            <Heading 
            title={imagebot("title")}
            description={imagebot("description")}
            icon={Camera}
            iconcolor="text-pink-700"
            bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 shadow-sm shadow-zinc-400"
                        >
                        <FormField
                        name="prompt"
                        render={({field})=>(
                           <FormItem className="rounded-md col-span-12 lg:col-span-6 shadow-md shadow-zinc-400">
                              <FormControl className="m-0 p-0">
                                  <Input className="border-0 outline-none text-black focus-visibe:ring-0 focus-visible:ring-transparent placeholder:text-muted-foreground px-3"
                                        disabled={isLoading}
                                        placeholder="A beautiful sunset alongside the sea"
                                        autoComplete="off"
                                        {...field}
                                         />
                              </FormControl>
                           </FormItem>
                        )}
                        />
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({field}) => (
                            <FormItem className="col-span-12 lg:col-span-2 shadow-md shadow-zinc-400">
                                <Select
                                 disabled={isLoading}
                                 onValueChange={field.onChange}
                                 value={field.value}
                                 defaultValue={field.value}
                                 >
                                  <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {amountOptions.map((option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="resolution"
                          render={({field}) => (
                            <FormItem className="col-span-12 lg:col-span-2 shadow-md shadow-zinc-400">
                                <Select
                                 disabled={isLoading}
                                 onValueChange={field.onChange}
                                 value={field.value}
                                 defaultValue={field.value}
                                 >
                                  <FormControl>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {resolutionOptions.map((option) => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                            </FormItem>
                          )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                             {common("generate_btn")}
                        </Button>
                      </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-slate-200 shadow-lg shadow-zinc-600">
                            <Loader url="code_bot_url"/>
                        </div>
                    )}

                    {images.length === 0 && !isLoading && (
                        <div>
                            <Empty />
                        </div>
                    )}

                    {images.length > 0 && !isLoading && (
                        <div className=" text-center bg-slate-400 p-3 rounded-lg">
                            <h1 className="text-center font-bold">Images Generated By Openai API!</h1>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {images.map((src : any)=>(
                            <Card 
                              key={src}
                              className="rounded-lg overflow-hidden"
                              >
                                <div className="relative aspect-square">
                                <Suspense fallback={<p>Loading...</p>}>
                                    <Image 
                                    alt="Image"
                                    fill
                                    src={src}/>
                                </Suspense>
                                </div>
                                <CardFooter className="p-2">
                                    <Button 
                                    onClick={() => window.open(src)}
                                    variant="secondary" 
                                    className="w-full"
                                    >
                                    <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))} 
                    </div>
                    {
                        images.length>0 && (<div className="w-full h-12 bg-slate-300 text-center p-4 font-bold rounded-lg">
                        Go Up & Generate More Images!
                    </div>)
                    } 
                </div>
            </div>
        </div>
     );
}
 
export default ImagePage;
































































































