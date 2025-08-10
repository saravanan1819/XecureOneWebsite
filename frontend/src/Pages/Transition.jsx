import { motion } from "framer-motion";
import React from "react";

const Transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      <motion.div
        className="slide-in"
        initial={{ scaleX: 0}}
        // animate={{ scaleX: 0 }}
        exit={{ scaleX: 1}}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* <motion.div
        className="slide-out"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      /> */}
    </>
  );
};

export default Transition;
