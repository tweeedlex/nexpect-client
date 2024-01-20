import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

import SceneInit from "../lib/SceneInit";

const ModelsView = () => {
  useEffect(() => {
    const glftLoader = new GLTFLoader();

    const burgerScene = new SceneInit("three-canvas-burger");
    burgerScene.initialize();
    burgerScene.animate();

    let burgerModel;
    glftLoader.load("/assets/models/burger/scene.gltf", (gltfScene) => {
      burgerModel = gltfScene;
      gltfScene.scene.rotation.y = -1;
      gltfScene.scene.position.y = 0;
      gltfScene.scene.position.x = -10;
      gltfScene.scene.scale.set(5, 5, 5);
      burgerScene.scene.add(gltfScene.scene);
    });

    const animateBurger = () => {
      if (burgerModel) {
        burgerModel.scene.rotation.x -= 0.0002;
        burgerModel.scene.rotation.y += 0.001;
        burgerModel.scene.rotation.z -= 0.0002;
        burgerModel.scene.position.x += 0.01;
        burgerModel.scene.position.z -= 0.02;
      }
      requestAnimationFrame(animateBurger);
    };

    animateBurger();
  }, []);

  return (
    <div>
      <p>A 3D model</p>
      <div style={{ display: "flex" }}>
        <canvas style={{ width: "50%" }} id="three-canvas-burger" />
      </div>
    </div>
  );
};

export default ModelsView;
