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
            "lucataco/realistic-vision-v5:8aeee50b868f06a1893e3b95a8bb639a8342e846836f3e0211d6a13c158505b1",
            {
              input: {
                seed: 1335,
                steps: 20,
                width: 512,
                height: 728,
                prompt: prompt,
                guidance: 5,
                num_outputs: 1,
                scheduler: "EulerA",
                negative_prompt: "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck"
              }
            }
          );
          console.log(output);


        return NextResponse.json(output);

        } catch (error) {
          console.log("[IMAGE_ERROR", error);
          return new NextResponse("Internal error", {status : 500});
        }
    }


