import React, { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import styles from "./ModelsView.module.scss";
import * as THREE from "three";
import SceneInit from "../../lib/SceneInit";
import { useScroll, useSpring } from "framer-motion";

const ModelsView = ({ active, next }) => {
  const [donut, setDonut] = useState(null);

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
      gltfScene.scene.position.x = -0.7;
      gltfScene.scene.rotation.x = Math.PI / 3;
      gltfScene.scene.rotation.z = -(Math.PI / 12);
      gltfScene.scene.scale.set(10, 10, 10);
      burgerScene.scene.add(gltfScene.scene);
      setDonut(gltfScene.scene);
    });

    const light = new THREE.PointLight(0xffffff, 3, 1000);
    light.position.set(0, 0, 1);
    burgerScene.scene.add(light);

    const body = document.querySelector("body");
    body.style.color = "rgba(255, 255, 255, 0.4)";

    const animateBurger = () => {
      // if (burgerModel) {
      //   burgerModel.scene.rotation.x -= 0.0002;
      //   burgerModel.scene.rotation.y += 0.001;
      //   burgerModel.scene.rotation.z -= 0.0002;
      //   burgerModel.scene.position.x += 0.01;
      //   burgerModel.scene.position.z -= 0.02;
      // }
      requestAnimationFrame(animateBurger);
    };

    animateBurger();
  }, [active]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  scaleX.set(0);

  const updatePosition = () => {
    if (scaleX.get() < 0.5) {
      donut.position.x = -0.7 + scaleX.get() * 2;
      const progress = scaleX.get() * 2;
      donut.rotation.z = -(Math.PI / 12) * progress;
    } else {
      donut.position.x = 0.3 - (scaleX.get() - 0.5) * 0.72;
      donut.position.y = -(scaleX.get() - 0.5);
      const progress = (scaleX.get() - 0.5) * 2;
      donut.rotation.z = -(Math.PI / 12) * (1 - progress);
    }

    console.log(donut.position.x, " ", scaleX.get());
    requestAnimationFrame(updatePosition);
  };

  useEffect(() => {
    console.log(active, donut);
    if (donut) {
      updatePosition();
    }
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
