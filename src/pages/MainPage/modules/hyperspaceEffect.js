const hyperspaceEffect = (canvas, starsRef, animationsRef) => {
  if (!canvas.current) return;
  const ctx = canvas.current.getContext("2d");
  const width = window.innerWidth;
  const height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < starsRef.current.length; i++) {
    const star = starsRef.current[i];

    const XDistanceToCenter = Math.abs(star.x - width / 2);
    const YDistanceToCenter = Math.abs(star.y - height / 2);

    let xModifier = 1;
    let yModifier = 1;

    if (star.x < width / 2) {
      xModifier = -1;
    }

    if (star.y < height / 2) {
      yModifier = -1;
    }

    // Update star position
    star.x += (XDistanceToCenter / 100) * xModifier;
    star.y += (YDistanceToCenter / 100) * yModifier;

    // Ensure stars stay within the canvas
    if (star.x < 0 || star.x > width || star.y < 0 || star.y > height) {
      // Reset star properties when it goes outside the canvas
      star.x = Math.random() * width;
      star.y = Math.random() * height;
      star.alpha = 0;
    }

    // Gradually increase transparency
    star.alpha += 0.01;

    // Calculate line endpoints for a gradually appearing effect
    const lineEndX =
      star.x + (5 + (XDistanceToCenter / 5) * xModifier) * (1 - star.alpha);
    const lineEndY =
      star.y + (5 + (YDistanceToCenter / 5) * yModifier) * (1 - star.alpha);

    // Draw smooth lines with gradually appearing effect
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(lineEndX, lineEndY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 1;
  }
  const canvasAnimationId = requestAnimationFrame(() =>
    hyperspaceEffect(canvas, starsRef, animationsRef)
  );
  animationsRef.current.push(canvasAnimationId);
};

export default hyperspaceEffect;
