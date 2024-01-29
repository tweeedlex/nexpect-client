import React, { useEffect, useState, useRef } from "react";
import styles from "./ScrollView.module.scss";
import triangleImage from "../../img/polygon.png";
import smallTriangleImage from "../../img/triangleSmall.png";
import chevronImage from "../../img/chevron.png";
import arrowImage from "../../img/arrow-down.png";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const Screen = ({ offset, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, offset * window.innerHeight);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        position: "absolute",
        top: offset * 100 + "vh",
        width: "calc(100%)",
        height: "100vh",
        left: 0,
        scrollSnapAlign: "center",
      }}
    >
      {children}
    </motion.div>
  );
};

const ScrollView = ({ active }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (active) {
      const body = document.querySelector("body");
      body.className = styles.body;
    }
  }, [active]);

  const [triangles, setTriangles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--mouse-x", x);
      document.documentElement.style.setProperty("--mouse-y", y);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const trianglesData = [...Array(40)].map((_, i) => {
      const positionTop = Math.floor(Math.random() * 100);
      const positionLeft = Math.floor(Math.random() * 100);
      const center = 50;
      const distanceFromCenter =
        Math.abs(center - positionTop) + Math.abs(center - positionLeft);

      const scale = 1 - distanceFromCenter / 100 + 0.1;
      const rotate = Math.floor(Math.random() * 360);

      const minDistance = Math.min(
        positionTop,
        positionLeft,
        100 - positionTop,
        100 - positionLeft
      );

      let animationDirection;
      switch (minDistance) {
        case positionTop:
          animationDirection = "top";
          break;
        case positionLeft:
          animationDirection = "left";
          break;
        case 100 - positionTop:
          animationDirection = "bottom";
          break;
        case 100 - positionLeft:
          animationDirection = "right";
          break;
        default:
          animationDirection = "top";
          break;
      }

      return {
        key: `${positionTop + positionLeft}${i}`,
        src: smallTriangleImage,
        className:
          styles.smallTriangle + " " + styles[`small-${animationDirection}`],
        style: {
          top: `${positionTop}%`,
          left: `${positionLeft}%`,
          transform: `rotate(${rotate}deg) scale(${scale})`,
          animationDuration: `${Number((Math.random() * 2).toFixed(2)) + 1}s`,
        },
      };
    });

    setTriangles(trianglesData);
  }, []);

  return (
    <>
      {active ? (
        <div style={{ height: "300vh", scrollSnapType: "y mandatory" }}>
          <Screen offset={0}>
            <div className={styles.wrapper}>
              <div className={styles.light}></div>
              <div className={styles.content}>
                <span></span>
                <span></span>
                <span></span>
                <div className={styles.text}>
                  <div className={styles.title}>Just scroll down</div>
                  <div className={styles.subtitle}>
                    and feel these transitions...
                  </div>
                </div>
                <img className={styles.chevron} src={chevronImage} alt="" />
                <div className={styles.arrowBox}>
                  <img
                    className={styles.arrow}
                    src={arrowImage}
                    alt=""
                    height={240}
                  />
                  <img
                    className={styles.chevronSmall}
                    src={chevronImage}
                    alt=""
                    width={40}
                  />
                </div>
              </div>
              <div className={styles.backgroundLayerTop}>
                {triangles.map((triangle) => (
                  <img
                    key={triangle.key}
                    src={triangle.src}
                    className={triangle.className}
                    alt=""
                    style={{
                      ...triangle.style,
                      transform: `${triangle.style.transform} translate(calc(-2rem * var(--mouse-x)), calc(-2rem * var(--mouse-y)))`,
                    }}
                  />
                ))}
              </div>
              <div className={styles.background}>
                {[...Array(19)].map(() => (
                  <img src={triangleImage} className={styles.triangle} alt="" />
                ))}
              </div>
              <div className={styles.light}>
                <div className={styles.bottom}></div>
              </div>
            </div>
          </Screen>
          <Screen offset={1} />
          <Screen offset={2} />
          <motion.div className={styles.progress} style={{ scaleX }} />
        </div>
      ) : null}
    </>
  );
};

export default ScrollView;
