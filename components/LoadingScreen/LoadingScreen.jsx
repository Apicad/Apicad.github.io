import "./LoadingScreen.scss";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Logo3D } from "./Logo3D";
import { isWebGLAvailable } from "../utils/webglSupport";

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3000);

    return () => clearTimeout(minTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (minTimeElapsed && progress >= 100) {
      setTimeout(() => onLoadComplete(), 300);
    }
  }, [minTimeElapsed, progress, onLoadComplete]);

  return (
    <div className="loading-screen-overlay">
      <div className="loading-content">
        {isWebGLAvailable() && (
          <div className="logo-3d-container">
            <Canvas camera={{ position: [10, 0, 8], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Logo3D />
            </Canvas>
          </div>
        )}
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">{Math.floor(progress)}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
