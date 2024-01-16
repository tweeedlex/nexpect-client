const resetCanvas = (canvas, animationsRef) => {
  const ctx = canvas.current.getContext("2d");
  const width = window.innerWidth;
  const height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  animationsRef.current.forEach((animation) => {
    cancelAnimationFrame(animation);
  });
};

export default resetCanvas;
