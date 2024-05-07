
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export  async function POST(
    req : Request     
    ){
        try{
          const {userId} = auth();
          const body = await req.json()

          if (!body.modelUrl) {
            return new NextResponse("Missing 'model url' field.");
          }

          if(!userId){
            return new NextResponse("OpenAI API Key is not configured")
          }

          if (!body.input) {
            return new NextResponse("Missing 'input' field in the request body");
          }
        
          if (!process.env.HUGGING_FACE_TOKEN) {
            return new NextResponse("Missing 'Hugging Face Access Token'");
          }
        
          const modelUrl = body.modelUrl;
          const input = body.input;
        
          const response = await fetch(modelUrl, {
            headers: {
              Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: input }),
          });
          
          if(!response.ok){
            return new NextResponse("Request Failed")
          }
        
          const audioData = await response.arrayBuffer();
        
          return new Response(audioData,{
            headers:{
                "Content-Type":"audio/mpeg"
            }
          })

        // return NextResponse.json(audioData);

        } catch (error) {
          console.log("[TEXTTOSPEECH_ERROR", error);
          return new NextResponse("Internal error", {status : 500});
        }
    }























