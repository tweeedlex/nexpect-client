import React, { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import styles from "./ModelsView.module.scss";
import * as THREE from "three";
import SceneInit from "../../lib/SceneInit";
import { useScroll, useSpring } from "framer-motion";

const ModelsView = ({ active, next }) => {
  const [donut, setDonut] = useState(null);
  let animationId;

  useEffect(() => {
    if (!active) {
      const canvas = document.getElementById("three-canvas-burger");
      if (canvas) {
        canvas.remove();
      }
      return;
    }
    const gltfLoader = new GLTFLoader();

    const burgerScene = new SceneInit("three-canvas-burger");
    burgerScene.initialize();
    burgerScene.animate();

    gltfLoader.load("/assets/models/donut/scene.gltf", (gltfScene) => {
      const startX = window.innerWidth < 767 ? -0.4 : -0.7;
      gltfScene.scene.position.x = startX;
      gltfScene.scene.rotation.x = Math.PI / 3;
      gltfScene.scene.rotation.z = -(Math.PI / 12);
      gltfScene.scene.scale.set(10, 10, 10);
      burgerScene.scene.add(gltfScene.scene);
      setDonut(gltfScene.scene);
    });

    const rightLight = new THREE.PointLight(0xffffff, 3, 1000);
    rightLight.position.set(2, 0, 1);
    burgerScene.scene.add(rightLight);

    const leftLight = new THREE.PointLight(0xffffff, 3, 1000);
    leftLight.position.set(-2, 0, 1);
    burgerScene.scene.add(leftLight);

    const body = document.querySelector("body");
    body.style.color = "rgba(255, 255, 255, 0.4)";

    return () => {
      const canvas = document.getElementById("three-canvas-burger");
      if (canvas) {
        canvas.remove();
      }
    };
  }, [active]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01,
  });
  scaleX.set(0);

  const updatePosition = () => {
    const startingPosition = window.innerWidth < 767 ? -0.4 : -0.7;
    const adjustment = window.innerWidth < 767 ? 0.3 : 0;

    if (scaleX.get() < 0.5) {
      const progress = scaleX.get() * (2 - adjustment * 1.9);
      donut.position.x = startingPosition + progress;
      donut.rotation.z = -(Math.PI / 12) * progress;
    } else {
      donut.position.x =
        startingPosition + 1 - (scaleX.get() - 0.5) * 0.72 - adjustment;
      donut.position.y = -(scaleX.get() * 1.2 - 0.5);
      const progress = (scaleX.get() - 0.5) * 2;
      donut.rotation.z = -(Math.PI / 12) * (1 - progress);

      if (scaleX.get() >= 0.7) {
        const scaleProgress = (scaleX.get() - 0.7) * (10 / 3);
        const scale = 10 + scaleProgress * 2;
        donut.scale.set(scale, scale, scale);

        const rotationProgress = scaleProgress;
        donut.rotation.x = Math.PI / 3 - (Math.PI / 12) * rotationProgress;
      }
    }

    return requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    if (donut) {
      animationId = updatePosition();
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [scaleX, active, donut]);

  return (
    <>
      {active ? (
        <div
          style={{ display: active ? "block" : "none" }}
          className={styles.page}
        >
          <canvas
            style={{ background: "none !importnant" }}
            id="three-canvas-burger"
            className={styles.canvas}
          ></canvas>
          <div className={styles.screen + " " + styles.screen1}>
            <p>Let your business stand out with a website</p>
          </div>
          <div className={styles.screen + " " + styles.screen2}>
            <p>Show your products and services on a website like in a movie </p>
          </div>
          <div className={styles.screen + " " + styles.screen3}>
            <div>
              <p>Movie you can interact with</p>
              <button className={styles.button} onClick={() => next()}>
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModelsView;
