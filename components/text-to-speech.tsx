import Image from "next/image";
import React, { useState, useEffect } from "react";

import * as z from "zod";


interface Props{
    text : any;
}

const TextToSpeech = ({ text } : Props ) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<z.infer<typeof text>>();

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <button onClick={handlePlay}><Image width="30" height="30" alt="pause" src="/play.png" /></button>
      {/* <button onClick={handlePause}><Image width="30" height="30" alt="pause" src="/pause.png" /></button> */}
      <button onClick={handleStop}><Image width="30" height="30" alt="pause" src="/restart.png" /></button>
    </div>
  );
};

export default TextToSpeech;