import React, { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const canvas = useRef(null);
  const starsRef = useRef([]);
  const [starsMoving, setStarsMoving] = useState(true);
  const animationRef = useRef(null);

  const drawCanvas = () => {
    const ctx = canvas.current.getContext("2d");
    const width = window.innerWidth;
    const height = window.innerHeight;
    const starsCount = 800;

    if (!starsRef.current.length) {
      for (let i = 0; i < starsCount; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < starsCount; i++) {
        const star = starsRef.current[i];

        if (starsMoving) {
          star.x += star.speed;

          // if (star.x > width) {
          //   star.x = 0;
          // }
        } else {
          star.speed = 0;
        }

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }

      if (starsMoving) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    canvas.current.width = width;
    canvas.current.height = height;

    draw();
  };

  useEffect(() => {
    drawCanvas();
    window.addEventListener("resize", drawCanvas);

    return () => {
      window.removeEventListener("resize", drawCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [starsMoving]);

  const hyperspaceEffect = () => {
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
      ctx.globalAlpha = 1; // Reset globalAlpha to avoid affecting other drawings
    }

    requestAnimationFrame(hyperspaceEffect);
  };

  const handleButtonClick = () => {
    setStarsMoving(!starsMoving);

    hyperspaceEffect();
  };

  return (
    <div className={styles.page}>
      <canvas ref={canvas} className={styles.canvas}></canvas>
      <p className={styles.logo}>NEXPECT</p>
      <div className={styles.text}>
        <h1>Landings you have never seen before</h1>
        <p className={styles.subtitle}>
          WE WILL CREATE SITE OF YOUR <span>DREAM</span>
        </p>
        <p className={styles.lastParagraph}>
          Clients will lose their minds in space
        </p>
      </div>
      <button className={styles.button} onClick={handleButtonClick}>
        {/* text in css :after */}
      </button>
    </div>
  );
};

export default MainPage;
