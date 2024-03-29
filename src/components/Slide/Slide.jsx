import React from "react";
import styles from "./Slide.module.scss";

const Slide = ({ text, active, isWhite }) => {
  const animations = [
    "slideInLeft",
    "slideInRight",
    "slideInUp",
    "slideInDown",
  ];

  const randomAnimation =
    animations[Math.floor(Math.random() * animations.length)];

  return (
    <div
      className={
        styles.slide +
        " " +
        (active ? styles.active : "") +
        " " +
        (isWhite ? styles.white : "")
      }
    >
      <div
        className={`${styles.content} ${styles.scale} ${
          styles[`${randomAnimation}`]
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Slide;
