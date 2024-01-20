import React, { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.scss";
import drawCanvas from "./drawCanvas";
import hyperspaceEffect from "./hyperspaceEffect";

const MainPage = () => {
  const canvas = useRef(null);
  const starsRef = useRef([]);
  const animationsRef = useRef([]);

  const [starsMoving, setStarsMoving] = useState(true);
  const [wasButtonClicked, setWasButtonClicked] = useState(false);
  const cursorPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    drawCanvas(canvas, starsRef, animationsRef, cursorPosition, starsMoving);
    window.addEventListener("resize", () =>
      drawCanvas(canvas, starsRef, animationsRef, cursorPosition, starsMoving)
    );

    return () => {
      window.removeEventListener("resize", () =>
        drawCanvas(canvas, starsRef, animationsRef, cursorPosition, starsMoving)
      );
      animationsRef.current.forEach((animationRef) => {
        cancelAnimationFrame(animationRef.current);
      });
    };
  }, []);

  const darknessEffect = (next, timeout) => {
    const effectBlock = document.querySelector(".effect-block");
    effectBlock.classList.add(styles.darkness);

    setTimeout(() => {
      effectBlock.classList.remove(styles.darkness);
      if (next) {
        next();
      }
    }, timeout);
  };

  const startWalkThrough = () => {
    if (!wasButtonClicked) {
      setStarsMoving(!starsMoving);
      setWasButtonClicked(true);
      hyperspaceEffect(canvas, starsRef, animationsRef);

      setTimeout(() => {
        darknessEffect(null, 3000);
      }, 3000);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorPosition.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
          <button className={styles.button} onClick={startWalkThrough}>
            <div></div>
            <span>Start a short walk-through</span>
          </button>
        </div>
        <span></span>
      </div>
    </>
  );
};

export default MainPage;
