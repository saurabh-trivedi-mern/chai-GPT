import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


export  async function POST(
    req : Request     
    ){
        try{
          const {userId} = auth();
          const body = await req.json()
          const { prompt } = body;

          if(!userId){
            return new NextResponse("Replicate API Key is not configured")
          }

          if(!prompt){
            return new NextResponse("Prompt is required", {status : 400});
          }
          const output = await replicate.run(
            "cjwbw/anything-v3-better-vae:09a5805203f4c12da649ec1923bb7729517ca25fcac790e640eaa9ed66573b65",
            {
              input: {
                width: 512,
                height: 640,
                prompt: prompt,
                scheduler: "DPMSolverMultistep",
                num_outputs: 1,
                guidance_scale: 12,
                negative_prompt: "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name",
                num_inference_steps: 50
              }
            }
          );
          console.log(output);


        return NextResponse.json(output);

        } catch (error) {
          console.log("[ANIME_IMAGE_ERROR", error);
          return new NextResponse("Internal error", {status : 500});
        }
    }

