import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../Styles/Whychoose.css";

gsap.registerPlugin(ScrollTrigger);

function WhyChooseUs() {
  const sectionRef = useRef();
  const headingRef = useRef();
  const subHeadingRef = useRef();
  const linesRef = useRef([]);
  return (
    <div>
      <div className="why-choose-us" ref={sectionRef}>
        <div className="card whychoose-card">
          <div className="blur-circle circle1 whychoose-circle1"></div>
          <div className="blur-circle circle2 whychoose-circle2"></div>
          <div className="blur-circle circle3 whychoose-circle3"></div>
        </div>
        <div className="whychoose-content">
          <h1 className="heading" ref={headingRef}>
            Why Choose Us?
            <div className="line-style"></div>
          </h1>
          <h3 className="sub-heading" ref={subHeadingRef}>
            Out Commitment, Your Protection
          </h3>
          <p className="para-content">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.
          </p>
          {/* <div className='para-content'>
            {[
              "1. Our experience in delivering innovative cybersecurity solutions set us apart.",
              "2. We turn challenges into opportunities that drive impactful outcomes.",
              "3. With a focus on trust and excellence, we continue to secure what matters most."
            ].map((text, index) => (
              <p key={index} ref={el => linesRef.current[index] = el}>{text}</p>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
