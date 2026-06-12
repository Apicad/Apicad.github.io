import { isWebGLAvailable } from "./webglSupport";

// Preload critical assets for better performance
export const preloadSplineScenes = () => {
  // No point downloading 3D scenes the browser can't render
  if (!isWebGLAvailable()) return;

  const scenes = [
    "https://prod.spline.design/xI6bQZSWJDbXKxvS/scene.splinecode", // MiniHouse
    "https://prod.spline.design/5CQfMSoMpTvytXvJ/scene.splinecode", // ComponentBox
  ];

  scenes.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "fetch";
    link.href = url;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
};

// Preload images
export const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};
