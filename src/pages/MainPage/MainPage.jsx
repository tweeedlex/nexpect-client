import React, { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  const canvas = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef(null);
  const [starsMoving, setStarsMoving] = useState(true);
  const [wasButtonClicked, setWasButtonClicked] = useState(false);
  const cursorPosition = useRef({ x: 0, y: 0 });

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

        // Check for collision
        const distance = Math.sqrt(
          Math.pow(star.x - (cursorPosition.current.x + 5), 2) +
            Math.pow(star.y - (cursorPosition.current.y + 5), 2)
        );

        if (distance < 20 + star.radius) {
          // Collision detected, adjust star's speed for bouncing effect
          const angle = Math.atan2(
            star.y - (cursorPosition.current.y + 5),
            star.x - (cursorPosition.current.x + 5)
          );
          star.speed *= -1; // Reverse the star's speed

          // Move the star away from the collision point using linear interpolation
          const lerpFactor = 0.2; // Adjust this value for the desired smoothness
          star.x += Math.cos(angle) * 10 * lerpFactor;
          star.y += Math.sin(angle) * 10 * lerpFactor;
        }

        // Update star position
        star.x += star.speed;

        // Ensure stars stay within the canvas
        if (star.x < 0 || star.x > width) {
          // Reverse star's direction when it hits the canvas boundary
          star.speed *= -1;
        }

        // Draw stars
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
      // Draw a circle of light around the cursor
      ctx.filter = "blur(5px)";
      console.log(cursorPosition);
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
  }, []);

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

  const darknessEffect = () => {
    // make full page slightly dark for 3 seconds and then release
    const effectBlock = document.querySelector(".effect-block");
    effectBlock.classList.add(styles.darkness);

    setTimeout(() => {
      return window.location.reload();
      effectBlock.classList.remove(styles.darkness);
    }, 3000);
  };

  const handleButtonClick = () => {
    if (!wasButtonClicked) {
      setStarsMoving(!starsMoving);
      setWasButtonClicked(true);
      hyperspaceEffect();

      setTimeout(() => {
        darknessEffect();
      }, 3000);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update the cursor position
      cursorPosition.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => console.log(cursorPosition), [cursorPosition]);

  return (
    <>
      <canvas ref={canvas} className={styles.canvas}></canvas>
      <div
        className={styles.page + " " + (wasButtonClicked ? styles.hidden : "")}
      >
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
          <div></div>
          <span>Start a short walk-through</span>
        </button>
      </div>
    </>
  );
};

export default MainPage;
