// Detect whether the browser can actually create a WebGL context.
// Result is cached since GPU availability doesn't change within a page load.
let cachedResult = null;

export const isWebGLAvailable = () => {
  if (cachedResult !== null) return cachedResult;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    cachedResult = !!gl;
    if (gl) {
      const loseContext = gl.getExtension("WEBGL_lose_context");
      if (loseContext) loseContext.loseContext();
    }
  } catch {
    cachedResult = false;
  }

  if (!cachedResult) {
    console.warn("WebGL is not available - 3D components will be skipped.");
  }

  return cachedResult;
};
