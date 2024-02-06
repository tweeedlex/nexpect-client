const createStars = (starsRef, starsCount, width, height) => {
  for (let i = 0; i < starsCount; i++) {
    starsRef.current.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1 + 0.5,
      speed: Math.random() * 0.05 + 0.01,
      vx: 0,
      vy: 0,
    });
  }
};

const drawStar = (ctx, star) => {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
};

const drawLightAroundCursor = (ctx, cursorPosition) => {
  ctx.filter = "blur(5px)";
  ctx.beginPath();
  ctx.arc(
    cursorPosition.current.x + 5,
    cursorPosition.current.y + 5,
    20,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fill();
  ctx.closePath();
  ctx.filter = "none";
};

// Function to draw stars and light around the cursor
const draw = (
  ctx,
  width,
  height,
  starsCount,
  starsRef,
  cursorPosition,
  starsMoving,
  animationsRef
) => {
  width = window.innerWidth;
  height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < starsCount; i++) {
    const star = starsRef.current[i];

    const distance = Math.sqrt(
      Math.pow(star.x - (cursorPosition.current.x + 5), 2) +
        Math.pow(star.y - (cursorPosition.current.y + 5), 2)
    );

    if (distance < 20 + star.radius) {
      const angle = Math.atan2(
        star.y - (cursorPosition.current.y + 5),
        star.x - (cursorPosition.current.x + 5)
      );
      const force = 0.2;
      star.vx = Math.cos(angle) * force;
      star.vy = Math.sin(angle) * force;
    }

    star.x += star.speed + star.vx;
    star.y += star.vy;
    star.vx *= 0.9996;
    star.vy *= 0.9996;

    if (star.x < 0) {
      star.x = width;
    } else if (star.x > width) {
      star.x = 0;
    }

    if (star.y < 0) {
      star.y = height;
    } else if (star.y > height) {
      star.y = 0;
    }

    drawStar(ctx, star);
  }

  drawLightAroundCursor(ctx, cursorPosition);

  if (starsMoving) {
    const canvasAnimationId = requestAnimationFrame(() =>
      draw(
        ctx,
        width,
        height,
        starsCount,
        starsRef,
        cursorPosition,
        starsMoving,
        animationsRef
      )
    );
    animationsRef.current.push(canvasAnimationId);
  }
};

const drawCanvas = (
  canvas,
  starsRef,
  animationsRef,
  cursorPosition,
  starsMoving
) => {
  if (!canvas.current) return;
  const ctx = canvas.current.getContext("2d");
  const width = window.innerWidth;
  const height = window.innerHeight;
  const starsCount = 300;

  if (!starsRef.current.length) {
    createStars(starsRef, starsCount, width, height);
  }

  canvas.current.width = width;
  canvas.current.height = height;

  console.log(canvas.current.width, canvas.current.height, width, height);

  draw(
    ctx,
    width,
    height,
    starsCount,
    starsRef,
    cursorPosition,
    starsMoving,
    animationsRef
  );
};

export default drawCanvas;
