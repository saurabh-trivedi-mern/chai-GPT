// Represents a sound model with its name and URL
export interface SpeechModel {
    name: string; // The name of the sound model
    url: string;  // The URL to the model for generating sound
  }
  
  // An array of predefined sound models
  const SPEECH_MODELS: SpeechModel[] = [
    {
      name: "FEMALE - TextToSpeech",
      url: "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits",
    },
    {
      name: "NOLAN - TextToMusic",
      url:  "https://api-inference.huggingface.co/models/facebook/musicgen-small",
    },
  ];
  
  // Export the array of sound models
  export default SPEECH_MODELS;
  

