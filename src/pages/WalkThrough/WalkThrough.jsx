import React, { useEffect, useState } from "react";
import { darknessEffect, releaseDarknessEffect } from "../../functions/effects";
import Slide from "../../components/Slide/Slide";
import ModelsView from "../../components/ModelsView/ModelsView";
import ScrollView from "../../components/ScrollView/ScrollView";

const WalkThrough = () => {
  const [firstSlides, setFirstSlides] = useState([
    { text: "We can create", active: true },
    { text: "any site", active: false },
    { text: "that you can", active: false },
    { text: "imagine", active: false },
  ]);

  const [interactivitySlides, setInteractivitySlides] = useState([
    { text: "Your site", active: false },
    {
      text: "will leave",
      active: false,
    },
    { text: "a lasting impression", active: false },
    { text: "on your customers", active: false },
  ]);

  const [modelsViewActive, setModelsViewActive] = useState(false);
  const [scrollViewActive, setScrollViewActive] = useState(false);

  const show3D = () => {
    setModelsViewActive(true);
  };

  useEffect(() => {
    const startSlidesAfterDarknessEffect = () => {
      setTimeout(
        () => startSlides(firstSlides, setFirstSlides, 600, 0, show3D),
        200
      );
    };

    releaseDarknessEffect(() => startSlidesAfterDarknessEffect(), 0);
  }, []);

  const startSlides = (slides, setSlides, interval, delay, next) => {
    let intervalID;
    slides[0].active = true;
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
    startSlides(interactivitySlides, setInteractivitySlides, 600, 300, () =>
      setScrollViewActive(true)
    );
  };

  return (
    <div style={{ position: "relative" }}>
      {firstSlides.map((slide, index) => (
        <Slide
          key={index}
          text={slide.text}
          active={slide.active}
          isWhite={index % 2 === 1}
        />
      ))}
      <ModelsView active={modelsViewActive} next={continueAfter3D} />
      {interactivitySlides.map((slide, index) => (
        <Slide
          key={index}
          text={slide.text}
          active={slide.active}
          isWhite={index % 2 === 1}
        />
      ))}
      <ScrollView active={scrollViewActive} />
    </div>
  );
};

export default WalkThrough;
