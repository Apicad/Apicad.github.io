import "./HeroText.scss";
import Typewriter from "typewriter-effect";
import { useState } from "react";

import { Logo3D } from "../LoadingScreen/Logo3D";
import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const HeroText = () => {
  const [showCat, setShowCat] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const text = "AI tools that do real work.";

  const getLetterAnimation = (index) => {
    if (hoveredIndex === null) return { y: 0 };

    const distance = index - hoveredIndex;

    // Only animate letters after the hovered index (forward wave)
    if (distance < 0 || distance > text.length) return { y: 0 };

    const delay = distance * 0.08;

    return {
      y: [0, -8, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        delay: delay,
      },
    };
  };

  const handleHoverStart = (index) => {
    if (!isAnimating) {
      setHoveredIndex(index);
      setIsAnimating(true);

      // Calculate total animation time
      const totalDuration = (text.length - index) * 0.08 + 0.4;
      setTimeout(() => {
        setIsAnimating(false);
        setHoveredIndex(null);
      }, totalDuration * 1000);
    }
  };

  const handleWaveClick = () => {
    setShowCat(true);

    // Play sound
    const audio = new Audio(
      `${import.meta.env.BASE_URL}spinning-cat/spinning-cat-sound.mp3`
    );
    audio.play().catch((error) => {
      console.log("Audio playback failed:", error);
    });

    // Reset after 3 seconds
    setTimeout(() => {
      setShowCat(false);
    }, 3000);
  };

  return (
    <div className="hero-text-container">
      <div className="hero-content">
        <h1 className="hero-greeting">
          Hi, I&apos;m{" "}
          <span className="name-with-emoji">
            Abdiel{" "}
            {!showCat ? (
              <motion.img
                src={`${import.meta.env.BASE_URL}icons/waving.png`}
                alt="waving hand"
                className="hand-emoji"
                onClick={handleWaveClick}
                animate={{
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ) : (
              <img
                src={`${import.meta.env.BASE_URL}spinning-cat/spinning-cat.gif`}
                alt="spinning cat"
                className="hand-emoji"
                onClick={handleWaveClick}
              />
            )}
          </span>
        </h1>

        <div className="hero-subtitle welcome-text">
          <div className="subtitle-line">
            I build{" "}
            <span
              className="portfolio-website-text"
              style={{
                display: "inline-flex",
                cursor: "default",
              }}
            >
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={getLetterAnimation(i)}
                  onHoverStart={() => handleHoverStart(i)}
                  className="website-word"
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </div>
          <div className="subtitle-line">
            <span>I&apos;m a&nbsp;</span>
            <span className="typewriter">
              <Typewriter
                options={{
                  strings: [
                    "Software & AI Engineer",
                    "Fullstack Developer",
                    "MarTech Intern @ LinkedIn",
                    "Curious Learner",
                  ],
                  autoStart: true,
                  loop: true,
                  cursor: "_",
                  deleteSpeed: 100,
                  delay: 100,
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
