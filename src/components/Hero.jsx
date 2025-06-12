import React, { useEffect, useRef } from "react";
import { ReactComponent as DrawImage } from "../images/DrawImage.svg";

const Hero = () => {
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const svg = svgContainerRef.current.querySelector("svg");
    if (!svg) return;
    const paths = svg.querySelectorAll("path, line, polyline, polygon, circle, ellipse");
    paths.forEach((path, i) => {
      let length;
      try {
        length = path.getTotalLength();
      } catch {
        return;
      }
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = "stroke-dashoffset 2s ease";
      setTimeout(() => {
        path.style.strokeDashoffset = 0;
      }, 300 + i * 400);
    });
  }, []);

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h1>Üdvözöllek az oldalon!</h1>
      <div ref={svgContainerRef}>
        <DrawImage style={{ width: "100%", height: "auto" }} />
      </div>
    </div>
  );
};

export default Hero;