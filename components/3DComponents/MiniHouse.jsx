import "./Mini-3d-house.scss";
import Spline from "@splinetool/react-spline";
import { useCallback, useRef, memo } from "react";
import { isWebGLAvailable } from "../utils/webglSupport";

const MiniHouse = memo(() => {
  const splineRef = useRef();

  const onLoad = useCallback((spline) => {
    spline.setBackgroundColor("transparent");
    splineRef.current = spline;
  }, []);

  if (!isWebGLAvailable()) return null;

  return (
    <Spline
      scene="https://prod.spline.design/xI6bQZSWJDbXKxvS/scene.splinecode"
      onLoad={onLoad}
    />
  );
});

MiniHouse.displayName = "MiniHouse";

export default MiniHouse;
