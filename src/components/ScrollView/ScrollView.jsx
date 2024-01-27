import React, { useEffect } from "react";
import styles from "./ScrollView.module.scss";
import triangleImage from "../../img/polygon.png";
import arrowDownImage from "../../img/arrow-down.png";
import smallTriangleImage from "../../img/triangleSmall.png";
import chevronImage from "../../img/chevron.png";

const ScrollView = ({ active }) => {
  useEffect(() => {
    if (active) {
      const body = document.querySelector("body");
      body.className = styles.body;
    }
  }, [active]);

  return (
    <>
      {active ? (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.text}>
              <div className={styles.title}>Just scroll down</div>
              <div className={styles.subtitle}>
                and feel these transitions...
              </div>
            </div>
            <img className={styles.chevron} src={chevronImage} alt="" />
          </div>
          <div className={styles.backgroundLayerTop}>
            {[...Array(40)].map((_, i) => {
              const positionTop = Math.floor(Math.random() * 100);
              const positionLeft = Math.floor(Math.random() * 100);
              const center = 50;
              const distanceFromCenter =
                Math.abs(center - positionTop) +
                Math.abs(center - positionLeft);

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

              return (
                <img
                  key={`${positionTop + positionLeft}${i}`}
                  src={smallTriangleImage}
                  className={
                    styles.smallTriangle +
                    " " +
                    styles[`small-${animationDirection}`]
                  }
                  alt=""
                  style={{
                    top: `${positionTop}%`,
                    left: `${positionLeft}%`,
                    transform: `rotate(${rotate}deg) scale(${scale})`,
                    animationDuration: `${
                      Number((Math.random() * 2).toFixed(2)) + 1
                    }s`,
                  }}
                />
              );
            })}
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
      ) : null}
    </>
  );
};

export default ScrollView;
