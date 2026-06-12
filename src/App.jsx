import "./App.scss";
import Navbar from "../components/navbar/Navbar";
import AboutMe from "../components/aboutMe/AboutMe";
import Skills from "../components/skills/Skills";
import Projects from "../components/projectCard/Projects";
import { Work } from "../components/workExperiences/Work";

import Contact from "../components/contact/Contact";

import { Element } from "react-scroll";

import HeroText from "../components/HeroText/HeroText";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { preloadSplineScenes } from "../components/utils/preloadAssets";
import FpsMeter from "../components/utils/FpsMeter";

// Lazy load 3D components for better performance
const MiniHouse = lazy(() => import("../components/3DComponents/MiniHouse"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [hasShownIndicator, setHasShownIndicator] = useState(false);

  // Preload Spline scenes on mount
  useEffect(() => {
    preloadSplineScenes();
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    // Show indicator immediately after loading, only once
    if (!hasShownIndicator) {
      setShowScrollIndicator(true);
      setHasShownIndicator(true);
    }
  }, [hasShownIndicator]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && showScrollIndicator) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollIndicator]);

  return (
    <div>
      <FpsMeter />
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s" }}>
        <Navbar />
        <Element name="section1">
          <section id="introduction">
            <HeroText />
            <Suspense fallback={<div />}>
              <MiniHouse />
            </Suspense>
            {showScrollIndicator && (
              <div className="scroll-indicator">
                <div className="scroll-arrow">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>Scroll Down For More</p>
              </div>
            )}
          </section>
        </Element>

        <Element name="section2">
          <section id="About">
            <AboutMe />
          </section>
        </Element>

        <Element name="skills">
          <section id="Skills">
            <Skills />
          </section>
        </Element>

        <Element name="section3">
          <section id="Work">
            <Work />
          </section>
        </Element>

        <Element name="section4">
          <section id="Projects">
            <Projects />
          </section>
        </Element>

        <Element name="section5">
          <section id="Contact">
            <Contact />
          </section>
        </Element>
      </div>
    </div>
  );
}

export default App;
