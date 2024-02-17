import React, { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.scss";
import drawCanvas from "./modules/drawCanvas";
import hyperspaceEffect from "./modules/hyperspaceEffect";
import { Link, useNavigate } from "react-router-dom";
import { darknessEffect, releaseDarknessEffect } from "../../functions/effects";

const MainPage = () => {
  const canvas = useRef(null);
  const starsRef = useRef([]);
  const animationsRef = useRef([]);

  const [starsMoving, setStarsMoving] = useState(true);
  const [wasButtonClicked, setWasButtonClicked] = useState(false);
  const cursorPosition = useRef({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const draw = () =>
      drawCanvas(canvas, starsRef, animationsRef, cursorPosition, starsMoving);

    draw();
    window.addEventListener("resize", draw);

    const body = document.querySelector("body");
    body.style.backgroundColor = "none";

    const handleMouseMove = (e) => {
      cursorPosition.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", draw);
      animationsRef.current.forEach((animationRef) => {
        cancelAnimationFrame(animationRef.current);
      });
    };
  }, []);

  const resetAnimations = () => {
    animationsRef.current.forEach((animationRef) => {
      cancelAnimationFrame(animationRef.current);
    });
    animationsRef.current = [];
  };

  const startWalkThrough = () => {
    if (!wasButtonClicked) {
      setStarsMoving(!starsMoving);
      setWasButtonClicked(true);
      hyperspaceEffect(canvas, starsRef, animationsRef);

      setTimeout(() => {
        resetAnimations();
        darknessEffect(() => navigate("/walk-through"), 1000);
      }, 2000);
    }
  };

  const transition = useRef(null);

  const showContactUs = () => {
    transition.current.classList.add(styles.show);
    setTimeout(() => {
      navigate("/contact-us");
    }, 300);
  };

  return (
    <>
      <div className="darkness-effect-block"></div>
      <div
        className={
          styles.planet + " " + (wasButtonClicked ? styles.hidden : "")
        }
      ></div>
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
        <button onClick={showContactUs}>
          <span className={styles.contactUs}>Contact us</span>
        </button>
      </div>
      <div className={styles.transition} ref={transition}></div>
    </>
  );
};

export default MainPage;
