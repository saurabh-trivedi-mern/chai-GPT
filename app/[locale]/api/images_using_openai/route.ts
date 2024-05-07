"use client"

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export  async function POST(
    req : Request     
    ){
        try{
          const {userId} = auth();
          const body = await req.json()
          const {prompt, amount, resolution} = body;

          const images_amount = Number(amount);
          
          if(!userId){
            return new NextResponse("OpenAI API Key is not configured")
          }

          if(!prompt){
            return new NextResponse("Prompt is required", {status : 400});
          }

          if(!amount){
            return new NextResponse("Amount is required", {status : 400});
          }

          if(!resolution){
            return new NextResponse("Resolution is required", {status : 400});
          }

        const image = await openai.images.generate({
          model : "dall-e-2",
          prompt,
          n : images_amount,
          size : resolution,
        });

        
        console.log(image.data);
        return NextResponse.json(image.data ? image.data : image.data);


        } catch (error) {
          console.log("IMAGE_ERROR", error);
          return new NextResponse("Internal error", {status : 500});
        }
    }

