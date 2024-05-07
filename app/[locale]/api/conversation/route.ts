
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import OpenAI from 'openai';
import { ChatCompletionAssistantMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage : ChatCompletionAssistantMessageParam ={
  role: "assistant",
  content : "You are an expert text generator. You must explain the answer in mutiple and ellaborated paragraphs."
}

export  async function POST(
    req : Request     
    ){
        try{
          const {userId} = auth();
          const body = await req.json()
          const {messages} = body;

          if(!userId){
            return new NextResponse("OpenAI API Key is not configured")
          }

          if(!messages){
            return new NextResponse("Messages are required", {status : 400});
          }

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages : [instructionMessage, ...messages],
          temperature: 1,
          max_tokens: 250,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        
        console.log(response.choices[0].message);
        console.log("Answer Generated!")

        return NextResponse.json(response.choices[0].message);

        } catch (error) {
          console.log("[CONVERSATION_ERROR", error);
          return new NextResponse("Internal error", {status : 500});
        }
    }

