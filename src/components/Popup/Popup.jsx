import React, { useEffect } from "react";
import styles from "./Popup.module.scss";

const Popup = ({ children, visible, setVisible, className }) => {
  let html = document.querySelector("html");

  useEffect(() => {
    if (visible) {
      html.classList = "locked";
    } else {
      html.classList = "";
    }
  }, [visible]);

  return (
    <div
      style={{
        display: visible ? "flex" : "none",
      }}
      onClick={() => setVisible(false)}
      className={styles.modal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.form + " " + className}
      >
        <button
          onClick={() => setVisible(false)}
          className={styles.close}
        ></button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
