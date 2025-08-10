import React from "react";
import "../Styles/Aboutpage.css";
import { useState, useEffect } from "react";
import { GoPlus, GoX } from "react-icons/go";
import Transition from "./Transition";
import { gsap } from "gsap";

import WhyChooseUs from "../Components/WhyChooseUs";
import GetSecured from "../Components/GetSecured";
import Footer from "../Components/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a range of services tailored to your needs. Contact us for details, and we'll guide you through the process.",
  },
  {
    question: "Who can benefit from your services?",
    answer:
      "Our services are designed for individuals and businesses alike, ensuring a safe and secure digital environment.",
  },
  {
    question: "How do I know which service I need?",
    answer:
      "Our experts can help you choose the right service based on your requirements, and we'll guide you through the process.",
  },
  {
    question: "What do I need to get started?",
    answer:
      "Just reach out to us and we'll guide you through the process, ensuring a seamless experience.",
  },
  {
    question: "Do you provide post-assessment support",
    answer:
      "Yes, we offer comprehensive post-assessment support to all our clients, ensuring they receive the best possible support.",
  },
];
// gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleStep = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };
  // HomePage animate
  useEffect(() => {
    let ctxs = gsap.context(() => {
      // CustomEase.create("hop", "0.6, 0, 0.3, 1");
      const tla = gsap.timeline();
      // HomePage animate

      tla.to(".about-page-fixed", {
        opacity: 0,
        duration: 0.5,
        display: "none",
        ease: "ease",
      });
      // .from(".ap-first-section .about-title-tag", {
      //   y: 80,
      //   opacity: 0,
      //   duration: 0.5,
      //   ease: "hop",
      // })
      // .from(
      //   ".ap-first-section h1",
      //   {
      //     y: 80,
      //     opacity: 0,
      //     duration: 0.7,
      //     ease: "hop",
      //   },
      //   0.4
      // )
      // .from(
      //   ".ap-first-section h1 span",
      //   {
      //     y: 80,
      //     opacity: 0,
      //     duration: 0.8,
      //     ease: "hop",
      //   },
      //   1
      // )
      // .from(
      //   ".ap-first-section p",
      //   {
      //     y: 40,
      //     opacity: 0,
      //     duration: 0.8,
      //     ease: "power2.out",
      //   },
      //   1.5
      // )
      // .from(
      //   ".ap-first-section .btn",
      //   {
      //     y: 30,
      //     opacity: 0,
      //     stagger: 0.2,
      //     duration: 1,
      //     ease: "power2.out",
      //   },
      //   2
      // );
    });
    return () => ctxs.revert();
  }, []);

  //  animate scroll tigger Gsap useEffect
  // useEffect(() => {
  //   const ctxhome = gsap.context(() => {
  //     gsap.from(".ap-second-section", {
  //       scale: 1.13,
  //       scrollTrigger: {
  //         trigger: ".ap-second-section",
  //         start: "top bottom",
  //         scrub: 1,
  //       },
  //     });

  //     // second section
  //     // const split = new SplitType(".ap-second-section .heading", {
  //     //   types: "words, chars",
  //     // });
  //     gsap.from(".ap-second-section .heading", {
  //       y: 50,
  //       opacity: 0,
  //       // stagger: 0.05,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-second-section",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(
  //       ".ap-second-section .sub-heading",
  //       {
  //         opacity: 0,
  //         y: 30,
  //         stagger: 0.5,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".ap-second-section",
  //           start: "top 50%",
  //         },
  //       },
  //       0.2
  //     );
  //     gsap.from(
  //       ".ap-second-section .para-content",
  //       {
  //         opacity: 0,
  //         y: 30,
  //         stagger: 0.5,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".ap-second-section",
  //           start: "top 50%",
  //         },
  //       },
  //       0.4
  //     );

  //     // our mission and vision
  //     gsap.from(".ap-third-section .mission-overall", {
  //       opacity: 1,
  //       y: 70,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: ".ap-third-section .mission-overall",
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     // const splitm = new SplitType(".ap-third-section .mission-tag p", {
  //     //   types: "words, chars",
  //     // });
  //     gsap.from(".ap-third-section .mission-tag p", {
  //       y: 50,
  //       opacity: 0,
  //       // stagger: 0.05,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-third-section .mission-overall",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(
  //       ".ap-third-section .mission-overall .custom-box p",
  //       {
  //         opacity: 0,
  //         y: 30,
  //         stagger: 0.5,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".ap-third-section .mission-overall",
  //           start: "top 80%",
  //         },
  //       },
  //       0.2
  //     );

  //     gsap.from(".ap-third-section .vision-overall", {
  //       opacity: 0,
  //       y: 70,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: ".ap-third-section .vision-overall",
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //     // const splitv = new SplitType(".ap-third-section .vision-tag p", {
  //     //   types: "words, chars",
  //     // });
  //     gsap.from(".ap-third-section .vision-tag p", {
  //       y: 50,
  //       opacity: 0,
  //       stagger: 0.05,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-third-section .vision-overall",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(
  //       ".ap-third-section .vision-overall .custom-box p",
  //       {
  //         opacity: 0,
  //         y: 30,
  //         stagger: 0.5,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".ap-third-section .vision-overall",
  //           start: "top 80%",
  //         },
  //       },
  //       0.2
  //     );

  //     // our core values
  //     gsap.from(".ap-fourth-section", {
  //       opacity: 1,
  //       y: 70,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: ".ap-fourth-section",
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     // const splitc = new SplitType(".ap-fourth-section  .core-value-tag p", {
  //     //   types: "words, chars",
  //     // });
  //     gsap.from(".ap-fourth-section  .core-value-tag p", {
  //       y: 50,
  //       opacity: 0,
  //       // stagger: 0.05,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-fourth-section",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(
  //       ".ap-fourth-section .values-list li ",
  //       {
  //         opacity: 0,
  //         y: 40,
  //         stagger: 0.5,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".ap-fourth-section",
  //           start: "top 80%",
  //         },
  //       },
  //       0.1
  //     );

  //     // expert team

  //     // const splite = new SplitType(".ap-fiveth-section .expertteam-tag p", {
  //     //   types: "words, chars",
  //     // });
  //     gsap.from(".ap-fiveth-section .expertteam-tag p", {
  //       y: 50,
  //       opacity: 0,
  //       // stagger: 0.05,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-fiveth-section",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(
  //       ".ap-fiveth-section .expert-box",
  //       {
  //         opacity: 0,
  //         x: -30,
  //         stagger: 0.5,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".ap-fiveth-section",
  //           start: "top 80%",
  //         },
  //       },
  //       0.1
  //     );

  //     // our journey

  //     gsap.from(".ap-seventh-section", {
  //       opacity: 1,
  //       y: 70,
  //       duration: 0.8,
  //       scrollTrigger: {
  //         trigger: ".ap-seventh-section",
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     // const splitj = new SplitType(".ap-seventh-section .journey-tag p", {
  //     //   types: "words, chars",
  //     // });
  //     const splitjp = new SplitType(
  //       ".ap-seventh-section .custom-journey-box span",
  //       { types: "words, chars" }
  //     );
  //     gsap.from(".ap-seventh-section .journey-tag p", {
  //       y: 50,
  //       opacity: 0,
  //       // stagger: 0.05,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-seventh-section",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(".ap-seventh-section .custom-journey-box p", {
  //       opacity: 0,
  //       y: 40,
  //       stagger: 0.5,
  //       duration: 0.5,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-seventh-section",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(splitjp.chars, {
  //       y: 50,
  //       opacity: 0,
  //       stagger: 0.05,
  //       duration: 0.4,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-seventh-section",
  //         start: "top 80%",
  //       },
  //     });

  //     // faq section
  //     // const splitf = new SplitType(".ap-eight-section .faq-left .faq-tag p", {
  //     //   types: "words, chars",
  //     // });
  //      const splitfh = new SplitType(".ap-eight-section .faq-left h1 span", {
  //       types: "words, chars",
  //     });
  //       gsap.from(splitfh.chars, {
  //       y: 50,
  //       opacity: 0,
  //       stagger: 0.05,
  //       duration: 0.8,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-eight-section",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(".ap-eight-section .faq-left .faq-tag p", {
  //       y: 50,
  //       opacity: 0,
  //       // stagger: 0.05,
  //       duration: 1,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-eight-section",
  //         start: "top 80%",
  //       },
  //     });
  //     gsap.from(".ap-eight-section .sub-text", {
  //       opacity: 0,
  //       y: 30,
  //       stagger: 0.5,
  //       duration: 0.8,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".ap-eight-section",
  //         start: "top 80%",
  //       },
  //     });

  //       const faqItems = gsap.utils.toArray(".faqs");

  //       faqItems.forEach((item) => {
  //         gsap.fromTo(
  //           item,
  //           {
  //             opacity: 0,
  //             y: 30,
  //           },
  //           {
  //             scrollTrigger: {
  //               trigger: item,
  //               start: "top 80%",
  //               toggleActions: "play none none none",
  //             },
  //             y: 0,
  //             opacity: 1,
  //             duration: 0.4,
  //             ease: "ease",
  //           }
  //         );
  //       });

  //   });

  //   return () => ctxhome.revert();
  // }, []);

  return (
    <div>
      <div className="content-about">
        <div className="about-page-fixed"></div>
        <div className="aboutpage-overall-container">
          <div className="ap-first-section">
            <div className="pages-circle">
              <div className="pages-circle-container">
                <svg xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="10"
                        result="blur"
                      />
                      <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                  </defs>
                </svg>
                <div className="gradients-containers">
                  <div className="g1"></div>
                  <div className="g2"></div>
                </div>
              </div>
            </div>

            <div>
              <button className="about-title-tag">About XecureOne</button>
              <h1>
                XecureOne <br></br>
                <span>Let`s Secure Deep!</span>
              </h1>
              <p>
                XecureOne is your trusted cybersecurity partner — ideal for
                businesses seeking top-tier protection without an in-house
                security team. We specialize in safeguarding your digital
                landscape with cutting-edge solutions.
              </p>
            </div>
            <div className="btn">
              <div className="let-connect-btn">Let`s Connect</div>
              <div className="our-service-btn">Our Services</div>
            </div>
          </div>

          <div className="ap-second-section whoweare-section">
            <div className="a-circle-bg-1"></div>
            <div className="whoweare">
              <div className="card whoweare-card">
                <div className="blur-circle circle1 whoweare-circle1"></div>
                {/* <div className="blur-circle circle2 whoweare-circle2"></div> */}
                <div className="blur-circle circle3 whoweare-circle3"></div>
              </div>
              <div className="whoweare-content">
                <div className="who-title">
                  <div className="circle-who"></div>
                  <h1 className="heading">XecureOne.</h1>
                </div>
                <h3 className="sub-heading">Who we are?</h3>
                <div className="para-content">
                  <p>
                    Xecure One is a leading cybersecurity company dedicated to
                    protecting businesses of all sizes from evolving cyber
                    threats. Our team of certified experts uses cutting-edge
                    tools, proven methodologies, and a client-centric approach
                    to deliver industry-leading security solutions.
                  </p>
                </div>
              </div>
            </div>
            <div className="whoweare-img"></div>
          </div>

          <div className="ap-third-section">
            <div className="a-circle-bg-2"></div>

            <div className="mission-overall">
              <div className="title-tag blue-tag mission-tag">
                <p>Our Mission</p>
              </div>
              <div className="custom-box">
                <div class="wrap-box"></div>
                <p>
                  "To empower businesses with proactive and tailored
                  cybersecurity solutions that protect their digital assets,
                  ensure regulatory compliance, and build long-term resilience
                  against evolving cyber threats."
                </p>
              </div>
            </div>
            <div className="vision-overall">
              <div className="title-tag blue-tag vision-tag">
                <p>Our Vision</p>
              </div>
              <div className="custom-box">
                <div class="wrap-box"></div>
                <p>
                  "To become a globally trusted leader in cybersecurity
                  services, setting the benchmark for ethical hacking, cyber
                  resilience, and digital trust across industries."
                </p>
              </div>
            </div>
          </div>

          <div className="ap-fourth-section">
            <div className="a-circle-bg-3"></div>
            <div className="a-circle-bg-4"></div>
            <div className="heading">
              <h2>
                Our Core <span>Values.</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto itaque sint dolorem fugiat minus voluptate
                consequatur aliquam adipisci amet quisquam!
              </p>
            </div>
            <div className="core-values-box">
              <div className="core-box core-box1">
                <div className="card core-card">
                  <div className="blur-circle circle1 "></div>
                  <div className="blur-circle circle2 "></div>
                  {/* <div className="blur-circle circle3 whoweare-circle3"></div> */}
                </div>
                <div className="core-box-content">
                  <div className="circle-core-logo"></div>
                  <h3>Trust</h3>
                  <p>
                    Building lasting relationships through transparency and
                    reliability.
                  </p>
                </div>
              </div>
              <div className="core-box core-box2"></div>
              <div className="core-box core-box3">
                <div className="card core-card">
                  {/* <div className="blur-circle circle1 "></div> */}
                  <div className="blur-circle circle2 "></div>
                  <div className="blur-circle circle3 whoweare-circle3"></div>
                </div>
                <div className="core-box-content">
                  <div className="circle-core-logo"></div>
                  <h3>Integrity</h3>
                  <p>
                    Upholding the highest ethical standards in all our services.
                  </p>
                </div>
              </div>
              <div className="core-box core-box4">
                <div className="card core-card">
                  {/* <div className="blur-circle circle1 "></div> */}
                  <div className="blur-circle circle2 "></div>
                  <div className="blur-circle circle3 whoweare-circle3"></div>
                </div>
                <div className="core-box-content">
                  <div className="circle-core-logo"></div>
                  <h3>Innovation</h3>
                  <p>
                    Continuously enhancing our solutions to stay ahead of
                    emerging threats.
                  </p>
                </div>
              </div>
              <div className="core-box core-box5"></div>
              <div className="core-box core-box6">
                <div className="card core-card">
                  <div className="blur-circle circle1 "></div>
                  <div className="blur-circle circle2 "></div>
                  {/* <div className="blur-circle circle3 whoweare-circle3"></div> */}
                </div>
                <div className="core-box-content">
                  <div className="circle-core-logo"></div>
                  <h3>Excellence</h3>
                  <p>
                    Delivering superior service quality in every engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="purple-color-hline"> </div> */}
        </div>
        <div className="ap-fiveth-section expertteam-section">
          <div className="expert-team">
            <div className="title-tag blue-tag expertteam-tag">
              <p>Our Expert Team.</p>
            </div>

            <div className="expert-team-box-all">
              <div className="expert-box">
                <div className="e-circle"></div>
                <div className="e-box e-box1">
                  <p className="e-heading">Certified Ethical Hackers (CEH)</p>
                </div>
              </div>
              <div className="expert-box">
                <div className="e-circle"></div>
                <div className="e-box e-box1">
                  <p className="e-heading">
                    Offensive Security Certified Professionals (OSCP)
                  </p>
                </div>
              </div>
              <div className="expert-box">
                <div className="e-circle"></div>
                <div className="e-box e-box1">
                  <p className="e-heading">
                    Certified Information Systems Security Professionals (CISSP)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="aboutpage-overall-container">
          <div className="ap-sixeth-section why-choose-section">
            <WhyChooseUs />
          </div>

          {/* <div className="purple-color-hline"> </div> */}
          <div className="ap-seventh-section our-journey">
            <div className="a-circle-bg-5"></div>
            <div className="journey-photo"></div>
            <div className="journey-content">
              <h2>Our Journey</h2>
              <p>
                To become a globally trusted leader in cybersecurity services,
                setting the benchmark for ethical hacking,{" "}
                <span>
                  cyber resilience, and digital trust across industries.
                </span>
              </p>
            </div>
          </div>

          {/* <div className="ap-seventh-section our-journey">
            <div className="a-circle-bg-5"></div>

            <div className="our-journey-overall">
              <div className="title-tag blue-tag journey-tag">
                <p>Our Journey</p>
              </div>
              <div className="custom-journey-box">
                <p className="dot">“</p>
                <p>
                  To become a globally trusted leader in cybersecurity services,
                  setting the benchmark for ethical hacking,{" "}
                  <span>
                    cyber resilience, and digital trust across industries.
                  </span>
                </p>
              </div>
            </div>
          </div> */}

          <div className="ap-eight-section faq-section">
            <div className="a-circle-bg-6"></div>
            <div className="faq-left">
              <div className="title-tag faq-tag">
                <p>FAQ</p>
              </div>
              <h1>
                Frequently
                <br />
                <span>Asked Questions.</span>
              </h1>
              <p className="sub-text">
                Have questions? Our FAQ section has you covered with quick
                answer to the most common inquiries.
              </p>
            </div>
            <div className="faq-right">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className={`faqs faq${index + 1} ${
                    expandedIndex === index ? "expanded" : ""
                  }`}
                  onClick={() => toggleStep(index)}
                >
                  <div className="faq-content">
                    <h3 className="f-heading">{item.question}</h3>
                    <p
                      className={`f-sub-heading ${
                        expandedIndex === index ? "visible" : "hidden"
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>

                  <div className="down-arrow">
                    <GoPlus
                      className={`down-arrow-icon ${
                        expandedIndex === index ? "rotated" : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ap-ninth-section get-secured">
            <GetSecured />
          </div>
        </div>
        <div className="ap-last-section footer-section">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Transition(AboutPage);
