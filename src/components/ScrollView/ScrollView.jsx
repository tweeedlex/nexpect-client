import React, { useEffect, useState } from "react";
import styles from "./ScrollView.module.scss";
import triangleImage from "../../img/polygon.png";
import smallTriangleImage from "../../img/triangleSmall.png";
import chevronImage from "../../img/chevron.png";
import arrowImage from "../../img/arrow-down.png";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Screen from "../Screen/Screen";
import abstractRightImage from "../../img/abstract-right.png";
import abstractLeftImage from "../../img/abstract-left.png";
import abstractLeftBlueImage from "../../img/abstract-blue-left.png";
import abstractRightBlueImage from "../../img/abstract-blue-right.png";
import mailImage from "../../img/mail.png";
import { Link } from "react-router-dom";

const ScrollView = ({ active }) => {
  const [triangles, setTriangles] = useState([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // animations when appear on the screen

  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.show);
      } else {
        entry.target.classList.remove(styles.show);
      }
    });
  });

  // change background color on scroll

  const scrollHandler = () => {
    if (scrollYProgress.get() < 0.25) {
      document.body.style.backgroundColor = "#000218";
    } else if (scrollYProgress.get() < 0.75) {
      document.body.style.backgroundColor = "#c647d1";
    } else {
      document.body.style.backgroundColor = "#1C1A75";
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");
    const app = document.querySelector(".App");
    window.addEventListener("scroll", scrollHandler);

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((e) => intersectionObserver.observe(e));

    if (active) {
      window.scrollTo(0, 0);
      body.className = styles.body;
      app.style.padding = 0;
    }

    return () => {
      body.className = "";
      app.style.padding = "0 20px";
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [active]);

  useEffect(() => {
    if (active) {
      scrollHandler();
    }
  }, [scrollYProgress]);

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
        <div
          style={{
            height: "500vh",
            scrollSnapType: "y mandatory",
            position: "relative",
            transition: "background-color 0.3s ease",
          }}
        >
          <Screen offset={0}>
            <div className={styles.wrapper}>
              <div className={styles.content}>
                <span></span>
                <div className={styles.text}>
                  <div className={styles.title}>Just scroll down</div>
                  <div className={styles.subtitle}>
                    and feel these transitions...
                  </div>
                </div>
                <img className={styles.chevron} src={chevronImage} alt="" />
                <img
                  className={styles.chevronSmall}
                  src={chevronImage}
                  alt=""
                  width={40}
                />
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
                {[...Array(19)].map((_, i) => (
                  <img
                    src={triangleImage}
                    key={i}
                    className={styles.triangle}
                    alt=""
                  />
                ))}
              </div>
              <div className={styles.light}>
                <div className={styles.bottom}></div>
              </div>
            </div>
          </Screen>
          <Screen className={styles.screen2} offset={1}>
            <div className={styles.content + " " + styles.contentScreen2}>
              <div className={styles.text}>
                <div className={styles.title}>We can create</div>
                <div className={styles.subtitle}>site like this for you</div>
              </div>
            </div>
            <img
              src={abstractLeftImage}
              className={`${styles.abstractLeftImage} ${styles.hidden} hidden`}
              alt=""
            />
            <img
              src={abstractRightImage}
              className={`${styles.abstractRightImage} ${styles.hidden} hidden`}
              alt=""
            />
          </Screen>
          <Screen offset={2} className={styles.screen3}>
            <div className={styles.content + " " + styles.contentScreen3}>
              <div className={styles.text}>
                <div className={styles.title}>Unique, interesting</div>
                <div className={styles.subtitle}>just let’s discuss!</div>
              </div>
              <Link to="/contact-us">
                <button>
                  <img src={mailImage} alt="" />
                  Contact us
                </button>
              </Link>
            </div>
            <img
              src={abstractLeftBlueImage}
              className={`${styles.abstractLeftImage} ${styles.abstractLeftBlueImage} ${styles.hidden} hidden`}
              alt=""
            />
            <img
              src={abstractRightBlueImage}
              className={`${styles.abstractRightImage} ${styles.abstractRightBlueImage} ${styles.hidden} hidden`}
              alt=""
            />
          </Screen>
          <motion.div className={styles.progress} style={{ scaleX }} />
        </div>
      ) : null}
    </>
  );
};

export default ScrollView;
