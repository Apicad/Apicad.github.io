import "./ComponentBox.scss";
import Spline from "@splinetool/react-spline";
import { useCallback, useRef, memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { isWebGLAvailable } from "../utils/webglSupport";

const ComponentBox = memo(() => {
  const splineRef = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const [isInContact, setIsInContact] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check if component is in contact section
    const contactSection = document.querySelector(".contact-3d");
    setIsInContact(!!contactSection);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onLoad = useCallback(
    (spline) => {
      spline.setBackgroundColor("transparent");

      // Optimize for mobile - reduce quality and framerate
      if (isMobile) {
        try {
          // Reduce rendering quality on mobile
          const canvas = spline._scene?.children?.[0]?.userData?.canvas;
          if (canvas) {
            canvas.style.imageRendering = "optimizeSpeed";
          }
        } catch (e) {
          console.log("Could not optimize rendering");
        }
      }

      splineRef.current = spline;
    },
    [isMobile]
  );

  // Disable motion animation when in contact section on mobile
  const shouldAnimate = !isMobile || !isInContact;

  if (!isWebGLAvailable()) return null;

  return (
    <motion.div
      className="component-box-container"
      initial={shouldAnimate ? { opacity: 0, x: 50 } : { opacity: 1 }}
      whileInView={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 1 }}
      viewport={{ amount: 0.4, once: true }}
      transition={{ duration: isMobile ? 0.3 : 0.5, ease: "easeOut" }}
    >
      <div className="spline-wrapper">
        <Spline
          scene="https://prod.spline.design/5CQfMSoMpTvytXvJ/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
    </motion.div>
  );
});

ComponentBox.displayName = "ComponentBox";

export default ComponentBox;
