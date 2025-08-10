import React, { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

const SmoothScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const options = {
      damping: 0.08,   // Smoothness (0 to 1)
      alwaysShowTracks: false,
    };

    const scrollbar = Scrollbar.init(scrollRef.current, options);

    return () => {
      scrollbar.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} style={{ height: "100vh", overflow: "hidden" }}>
      <div>{children}</div>
    </div>
  );
};

export default SmoothScrollProvider;
