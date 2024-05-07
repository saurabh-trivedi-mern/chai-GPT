"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import SPEECH_MODELS, {SpeechModel} from "@/app/[locale]/(dashboard)/(routes)/textToSpeech/constants";
import { CreateSoundRequest }  from "@/app/[locale]/(dashboard)/(routes)/textToSpeech/page";
import { useTranslations } from "next-intl";

// Define the validation schema for the form fields
const FormSchema = z.object({
  soundModel: z.string({
    required_error: "Please select a Hugging Face sound model to use.",
  }),
  text: z.string({
    required_error: "Please select a text for the model to use.",
  }),
});

// Define the props interface for the GenerateSoundForm component
interface GenerateSoundFormProps {
  handleGetAudio: (data: CreateSoundRequest) => void;
}

// Main component function
export function GenerateSoundForm({ handleGetAudio }: GenerateSoundFormProps) {
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Initialize the react-hook-form with the validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitting(true);
    
    // Prepare the sound request object
    const soundRequest: CreateSoundRequest = {
      modelUrl: data.soundModel,
      text: data.text,
    };
    
    // Call the provided handler function with the sound request
    handleGetAudio(soundRequest);
    
    setFormSubmitting(false);
  }

  const audiobot = useTranslations('audiobot'); 
  const common = useTranslations('common'); 

  return (
    <div className="ml-8 mr-8">
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 placeholder:text-muted-foreground">
          {/* Form field for selecting the sound model */}
          <FormField
            control={form.control}
            name="soundModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">{audiobot("model_heading")}</FormLabel>
                {/* Select component for choosing a sound model */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a TTS or TTM model...." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map through available sound models */}
                    {SPEECH_MODELS.map((model: SpeechModel, index: number) => (
                      <SelectItem key={`${model.name}-${index}`} value={model.url}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                {audiobot("model_description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Form field for entering the text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">{audiobot("prompt_heading")}</FormLabel>
                <FormControl>
                  {/* Textarea component for entering text */}
                  <Textarea
                    className="shadow-md shadow-zinc-600 text-xl text-black bg-[#E3FEF7] focus-visibe:ring-0 focus-visible:ring-[#77B0AA] placeholder:text-muted-foreground px-3 resize-none"
                    disabled={formSubmitting}
                    rows={6}
                    placeholder="Enter the prompt here..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {audiobot("prompt_description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit button */}
          <Button className="container m-auto" type="submit" disabled={formSubmitting}>
             {common("generate_btn")}
          </Button>
        </form>
      </Form>
    </div>
  );
}