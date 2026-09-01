import { useEffect, useRef, useState } from "react";

// Plays a clip of the AI Voice Tutor's actual voice — synthesized once with
// the same Google Cloud TTS Chirp3-HD voice the app uses, then shipped as a
// static MP3 so no API key ever reaches the browser.
const TutorVoiceButton = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}tutor-voice-demo.mp3`
    );
    audio.preload = "none";
    audio.onended = () => setPlaying(false);
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.onended = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Stop the tutor voice demo" : "Play the tutor voice demo"}
      style={{
        padding: "0.35rem 0.9rem",
        borderRadius: "999px",
        border: "1px solid currentColor",
        background: "transparent",
        color: "inherit",
        font: "inherit",
        fontSize: "0.85em",
        cursor: "pointer",
      }}
    >
      {playing ? "■ Stop the tutor" : "▶ Hear the tutor"}
    </button>
  );
};

export default TutorVoiceButton;
