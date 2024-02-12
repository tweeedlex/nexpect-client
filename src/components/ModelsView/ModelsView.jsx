import React, { useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import styles from "./ModelsView.module.scss";

import SceneInit from "../../lib/SceneInit";

const ModelsView = ({ active, next }) => {
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

    let burgerModel;
    gltfLoader.load("/assets/models/donut/scene.gltf", (gltfScene) => {
      burgerModel = gltfScene;
      gltfScene.scene.rotation.y = -1;
      gltfScene.scene.position.y = 0;
      gltfScene.scene.position.x = -10;
      gltfScene.scene.scale.set(5, 5, 5);
      burgerScene.scene.add(gltfScene.scene);
    });

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

  return (
    <>
      {active ? (
        <div
          style={{ display: active ? "block" : "none" }}
          className={styles.page}
        >
          {/* <button className={styles.button} onClick={() => next()}>
            Continue
          </button> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModelsView;
