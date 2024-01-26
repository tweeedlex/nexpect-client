import React, { useEffect } from "react";
import styles from "./ScrollView.module.scss";
import triangleImage from "../../img/polygon.png";
import arrowDownImage from "../../img/arrow-down.png";
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
