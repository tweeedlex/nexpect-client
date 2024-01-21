import React, { useEffect, useState } from "react";
import { releaseDarknessEffect } from "../../functions/effects";
import Slide from "../../components/Slide/Slide";
import ModelsView from "../../components/ModelsView/ModelsView";

const WalkThrough = () => {
  const [slides, setSlides] = useState([
    { text: "We can create", active: true },
    { text: "Any site", active: false },
    { text: "that you can", active: false },
    { text: "imagine", active: false },
    { text: "Let’s put on your site", active: false },
  ]);
  const [modelsViewActive, setModelsViewActive] = useState(false);

  const show3D = () => {
    setModelsViewActive(true);
  };

  useEffect(() => {
    const startSlidesAfterDarknessEffect = () => {
      setTimeout(() => startSlides(slides, 500, show3D), 200);
    };

    releaseDarknessEffect(() => startSlidesAfterDarknessEffect(), 200);
  }, []);

  const startSlides = (slides, interval, next) => {
    let nextSlideIndex = 0;
    const intervalID = setInterval(() => {
      const activeSlideIndex = slides.findIndex((slide) => slide.active);
      if (activeSlideIndex !== slides.length - 1) {
        nextSlideIndex = activeSlideIndex + 1;

        slides[activeSlideIndex].active = false;
        slides[nextSlideIndex].active = true;
        setSlides([...slides]);
      } else {
        slides[nextSlideIndex].active = false;
        setSlides([...slides]);
        clearInterval(intervalID);
        if (next) {
          next();
        }
      }
    }, interval);

    return () => clearInterval(intervalID);
  };

  return (
    <>
      {slides.map((slide, index) => (
        <Slide key={index} text={slide.text} active={slide.active} />
      ))}
      <p
        style={{
          position: "absolute",
          zIndex: 100,
          left: "50%",
          top: "100px",
          transform: "translate(-50%, 0)",
          display: modelsViewActive ? "block" : "none",
          fontSize: "60px",
          fontWeight: 500,
        }}
      >
        A 3D model
      </p>
      <ModelsView active={modelsViewActive} />
    </>
  );
};

export default WalkThrough;
