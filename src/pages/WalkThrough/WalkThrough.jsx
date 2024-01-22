import React, { useEffect, useState } from "react";
import { releaseDarknessEffect } from "../../functions/effects";
import Slide from "../../components/Slide/Slide";
import ModelsView from "../../components/ModelsView/ModelsView";
import InteractivityView from "../../components/InteractivityView/InteractivityView";

const WalkThrough = () => {
  const [firstSlides, setFirstSlides] = useState([
    { text: "We can create", active: true },
    { text: "Any site", active: false },
    { text: "that you can", active: false },
    { text: "imagine", active: false },
    { text: "Let’s put on your site", active: false },
  ]);

  const [interactivitySlides, setInteractivitySlides] = useState([
    { text: "Many interactivity", active: true },
    { text: "and", active: false },
    { text: "LOTS", active: false },
    { text: "of animations", active: false },
  ]);

  const [modelsViewActive, setModelsViewActive] = useState(false);
  const [interactivityViewActive, setInteractivityViewActive] = useState(false);

  const show3D = () => {
    setModelsViewActive(true);
  };

  useEffect(() => {
    const startSlidesAfterDarknessEffect = () => {
      setTimeout(
        () => startSlides(firstSlides, setFirstSlides, 400, 0, show3D),
        200
      );
    };

    releaseDarknessEffect(() => startSlidesAfterDarknessEffect(), 200);
  }, []);

  const startSlides = (slides, setSlides, interval, delay, next) => {
    let intervalID;
    setTimeout(() => {
      let nextSlideIndex = 0;
      intervalID = setInterval(() => {
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
    }, delay);

    return () => clearInterval(intervalID);
  };

  const continueAfter3D = () => {
    setModelsViewActive(false);
    startSlides(interactivitySlides, setInteractivitySlides, 300, 300, () =>
      setInteractivityViewActive(true)
    );
  };

  return (
    <>
      {firstSlides.map((slide, index) => (
        <Slide key={index} text={slide.text} active={slide.active} />
      ))}
      <ModelsView active={modelsViewActive} next={continueAfter3D} />
      {interactivitySlides.map((slide, index) => (
        <Slide key={index} text={slide.text} active={slide.active} />
      ))}
      <InteractivityView active={interactivityViewActive} />
    </>
  );
};

export default WalkThrough;
