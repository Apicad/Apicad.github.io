import { useEffect, useRef, useState } from "react";

// Compact port of the AI Voice Tutor's speech engine: one utterance per
// sentence, with the tutor's pause profile (300ms between sentences, 600ms
// after questions and paragraph ends) so it sounds like a teacher, not a
// screen reader. Browser speechSynthesis only — no keys, no network.

const DEMO_TEXT =
  "Hi there. I am the tutor voice from Abdiel's AI voice tutor. " +
  "In a real session I teach a topic out loud, pause so you can think, and " +
  "quiz you with questions that adapt to your weak spots. Ready to learn something? " +
  "Click this card to see how I am built.";

const MAX_SEGMENT_CHARS = 180;

function segmentText(text) {
  const segments = [];
  const sentences = text.replace(/\s+/g, " ").trim().split(/(?<=[.!?…])\s+/).filter(Boolean);
  sentences.forEach((sentence, idx) => {
    let rest = sentence;
    while (rest.length > MAX_SEGMENT_CHARS) {
      let cut = rest.lastIndexOf(", ", MAX_SEGMENT_CHARS);
      if (cut < 40) cut = rest.lastIndexOf(" ", MAX_SEGMENT_CHARS);
      if (cut < 40) cut = MAX_SEGMENT_CHARS;
      segments.push({ text: rest.slice(0, cut + 1).trim(), pause: 120 });
      rest = rest.slice(cut + 1).trim();
    }
    const question = /\?\s*$/.test(rest);
    const last = idx === sentences.length - 1;
    segments.push({ text: rest, pause: question || last ? 600 : 300 });
  });
  return segments;
}

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  const prefer = ["Google US English", "Samantha", "Karen", "Daniel"];
  for (const name of prefer) {
    const v = voices.find((voice) => voice.name === name);
    if (v) return v;
  }
  return voices.find((v) => v.lang && v.lang.startsWith("en")) || null;
}

const TutorVoiceButton = () => {
  const [speaking, setSpeaking] = useState(false);
  const stateRef = useRef({ cancelled: false, timer: null, utterance: null });
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const stop = () => {
    const s = stateRef.current;
    s.cancelled = true;
    if (s.timer) clearTimeout(s.timer);
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  useEffect(() => stop, []); // stop on unmount

  if (!supported) return null;

  const speakFrom = (segments, i) => {
    const s = stateRef.current;
    if (s.cancelled || i >= segments.length) {
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(segments[i].text);
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.rate = 0.95;
    s.utterance = u; // hold a ref: Chrome GCs live utterances otherwise
    u.onend = () => {
      if (s.cancelled) return;
      s.timer = setTimeout(() => speakFrom(segments, i + 1), segments[i].pause);
    };
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  const toggle = (e) => {
    e.preventDefault(); // the card is a link; the button must not navigate
    e.stopPropagation();
    if (speaking) {
      stop();
      return;
    }
    stateRef.current = { cancelled: false, timer: null, utterance: null };
    setSpeaking(true);
    window.speechSynthesis.cancel();
    speakFrom(segmentText(DEMO_TEXT), 0);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={speaking ? "Stop the tutor voice demo" : "Play the tutor voice demo"}
      style={{
        marginTop: "0.6rem",
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
      {speaking ? "■ Stop the tutor" : "▶ Hear the tutor"}
    </button>
  );
};

export default TutorVoiceButton;
