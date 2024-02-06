import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// function useParallax(value, distance) {
//   return useTransform(value, [0, 1], [-distance, distance]);
// }

const Screen = ({ children, className }) => {
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({ target: ref });
  // const y = useParallax(scrollYProgress, window.innerHeight);

  return (
    <motion.div
      // ref={ref}
      style={{
        width: "100%",
        height: "100vh",
        left: 0,
        scrollSnapAlign: "center",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Screen;
