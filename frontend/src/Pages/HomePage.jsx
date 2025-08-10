import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import "../Styles/Homepage.css";
import { BsPatchCheckFill } from "react-icons/bs";
import WhyChooseUs from "../Components/WhyChooseUs";
import { IoStar } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "../Components/Footer";
import Transition from "./Transition";
import { GoPlus, GoX } from "react-icons/go";
import GetSecured from "../Components/GetSecured";
import Scrollbar from "smooth-scrollbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(CustomEase);

const testimonials = [
  {
    name: "Name 1",
    title: "IT Director",
    feedback:
      "Exceptional service and expertise. Highly recommend for any cybersecurity needed.",
  },
  {
    name: "Name 2",
    title: "Security Analyst",
    feedback: "Great support team and fast response time.",
  },
  {
    name: "Name 3",
    title: "CTO",
    feedback: "They went above and beyond to secure our systems.",
  },
  {
    name: "Name 4",
    title: "Network Admin",
    feedback: "Very professional, prompt, and reliable.",
  },
  {
    name: "Name 5",
    title: "Cloud Engineer",
    feedback: "A trustworthy partner for our infrastructure security.",
  },
  {
    name: "Name 6",
    title: "Software Developer",
    feedback: "Their insights helped us avoid major risks.",
  },
  {
    name: "Name 7",
    title: "DevOps Lead",
    feedback: "Top-tier service with real-time protection support.",
  },
  {
    name: "Name 8",
    title: "Pen Tester",
    feedback: "Very thorough audits and reporting.",
  },
  {
    name: "Name 9",
    title: "Founder, TechCo",
    feedback: "They feel like an extension of our team.",
  },
];
const stepsData = [
  {
    title: "CONSULTATION",
    description:
      "We begin with a detailed consultation to understand your unique cybersecurity needs, business goals, and existing security posture.",
  },
  {
    title: "ASSESSMENT",
    description:
      "Our experts conduct a comprehensive security assessment, identifying vulnerabilities and assessing your current defenses.",
  },
  {
    title: "IMPLEMENTATION",
    description:
      "We implement tailored cybersecurity solutions, including penetration testing, vulnerability assessments, and compliance measures.",
  },
  {
    title: "MONITORING",
    description:
      "Continuous monitoring of your systems ensures ongoing protection, with real-time alerts and threat detection.",
  },
  {
    title: "CONTINUOUS IMPROVEMENT",
    description:
      "Regular reviews and updates to your security strategy keep you protected against evolving threats.",
  },
];
function HomePage() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleStep = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const scrollEl = scrollRef.current; // Ref to the scroll container
    const container = containerRef.current; // Ref to the container of the scroll trigger

    // Initialize Smooth Scrollbar
    const scrollbar = Scrollbar.init(scrollEl, {
      damping: 0.08,
      alwaysShowTracks: false,
    });

    // Proxy ScrollTrigger to work with Smooth Scrollbar
    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (arguments.length) {
          scrollbar.scrollTop = value;
        }
        return scrollbar.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // Optional: specify fixed markers position with smooth-scrollbar
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    scrollbar.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: scrollEl });

    const scrollWidth = scrollEl.scrollWidth;
    const viewportWidth = scrollEl.clientWidth;
    const horizontalScrollLength = scrollWidth - viewportWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollEl, {
        x: -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 2,
          scroller: scrollEl, // 👈 Make sure this is set!
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
      scrollbar.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // manually kill all triggers
    };
  }, []);

  // scroll fixed effect with window
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const container = containerRef.current;

    const scrollWidth = scrollEl.scrollWidth;
    const viewportWidth = scrollEl.clientWidth;
    const horizontalScrollLength = scrollWidth - viewportWidth;

    const ctx = gsap.context(() => {
      gsap.to(scrollEl, {
        x: -horizontalScrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 2,
        },
      });
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Intro effect
  // useEffect(() => {
  //   let ctxs = gsap.context(() => {
  //     CustomEase.create("hop", "0.6, 0, 0.3, 1");
  //     const t1 = gsap.timeline({ defaults: { ease: "power3" } });
  //     const t2 = gsap.timeline({ delay: 6 });
  //     t1.from(
  //       [".preloader .intro-title", ".split-overlay .intro-title"],
  //       {
  //         x:-50,
  //         opacity: 0,
  //         duration: 1.5,
  //         stagger: 0.5,
  //       },
  //       0.5
  //     )
  //       .to(
  //         [
  //           ".preloader .intro-title .heading2",
  //           ".split-overlay .intro-title .heading2",
  //         ],
  //         {
  //           opacity: 0,
  //           duration: 0.5,
  //           stagger: 0.5,
  //         },
  //         2
  //       )
  //       .from(
  //         [".preloader .outro-title", ".split-overlay .outro-title "],
  //         {
  //           opacity: 0,
  //           y: "-5%",
  //           duration: 0.4,
  //           stagger: 0.5,
  //         },
  //         2.5
  //       )
  //        .from(
  //         [".preloader .outro-title .circle-logo p", ".split-overlay .outro-title .circle-logo p"],
  //         {
  //           opacity: 0,
  //           y: "-5%",
  //           duration: 0.4,
  //           stagger: 0.5,
  //         },
  //         3
  //       )

  //       .to(
  //         [
  //           ".preloader .intro-title .heading1",
  //           ".split-overlay .intro-title .heading1",
  //         ],
  //         {
  //           x: "80px",
  //           duration: 0.1,

  //         },
  //         3.5
  //       )
  //       .to(
  //         [".preloader .outro-title", ".split-overlay .outro-title"],
  //         {
  //           x: "-80px",
  //           duration: 0.1,

  //         },
  //         3.5
  //       )
  //       .to(
  //         [
  //           ".preloader .intro-title .heading1",
  //           ".split-overlay .intro-title .heading1",
  //         ],
  //         {
  //           x: "50px",
  //           y: "-1.8rem",
  //           scale: 0.45,
  //           duration: 0.5,
  //           stagger: 0.5,
  //         },
  //         4.5
  //       )
  //       .to(
  //         [
  //           ".preloader .outro-title .circle-logo",
  //           ".split-overlay .outro-title .circle-logo",
  //         ],
  //         {
  //           x: "-120px",
  //           stagger: 0.5,
  //           width: "150px",
  //           height: "150px",
  //           duration: 0.5,
  //           onComplete: () => {
  //             gsap.set(".preloader", {
  //               clipPath: "polygon(0 0 , 100% 0, 100% 50% ,0 50%)",
  //             });
  //             gsap.set(".split-overlay", {
  //               clipPath: "polygon(0 50% , 100% 50%, 100% 100% ,0 100%)",
  //             });
  //           },
  //         },
  //         4.5
  //       )
  //       .to(
  //       [".preloader .outro-title .circle-logo p", ".split-overlay .outro-title .circle-logo p"],
  //       {
  //            scale:1.4,
  //            duration:1,

  //       },
  //       4.5
  //       )
  //       .to(
  //         ".home-page-container",
  //         {
  //           clipPath: "polygon(0% 49% , 100% 49%, 100% 52% ,0% 52%)",
  //           duration: 1,
  //         },
  //         5
  //       );
  //     t1.to(
  //       [".preloader", ".split-overlay"],
  //       {
  //         y: (i) => (i === 0 ? "-50%" : "50%"),
  //         duration: 1,
  //       },
  //       6
  //     )
  //       .to(
  //         ".home-page-container",
  //         {
  //           clipPath: "polygon(0% 0% , 100% 0%, 100% 100% ,0 100%)",
  //           duration: 1,
  //           opacity: 0,
  //         },
  //         6
  //       )
  //       .to(
  //         ".homepages",
  //         {
  //           display: "block",
  //           duration: 1,
  //         },
  //         6
  //       );
  //       t1.to(".homepage-title-intro",{
  //           display:"none",
  //           duration:0.5,
  //       })

  //       // HomePage animate

  //       t2.from(".hp-first-section h1",{
  //           y: 80,
  //       opacity: 0,
  //       duration: 1.4,
  //       ease: "hop",
  //       },0.5)
  //       .from(".hp-first-section h1 span",{
  //       y: 80,
  //       opacity: 0,
  //       duration: 1.2,
  //       ease: "hop",
  //       },1.2)
  //        .from(".hp-first-section p",{
  //          y: 40,
  //         opacity: 0,
  //         duration: 1,
  //         ease: "power2.out",
  //       },1.8)
  //       .from(".hp-first-section .btn",{
  //          y: 30,
  //         opacity: 0,
  //         stagger: 0.2,
  //         duration: 1,
  //         ease: "power2.out",
  //       },2.2)

  //     });
  //     return () => ctxs.revert();
  //   }, []);

  // useEffect(() => {
  //     let ctxs = gsap.context(() => {
  //       const tla = gsap.timeline();
  //       // HomePage animate
  //       tla
  //         .to(".about-page-fixed", {
  //           opacity: 0,
  //           duration: 0.5,
  //           display: "none",
  //           ease: "ease",
  //         })
  //         .from(
  //           ".hp-first-section h1",
  //           {
  //             y: 60,
  //             opacity: 0,
  //             duration: 1,
  //             ease: "ease",

  //           },
  //           0.4
  //         )
  //         .from(
  //           ".hp-first-section h1 span",
  //           {
  //             y: 60,
  //             opacity: 0,
  //             duration: 1,
  //             ease: "power2.out",
  //           },
  //           0.6
  //         )
  //         .from(
  //           ".hp-first-section p",
  //           {
  //             y: 40,
  //             opacity: 0,
  //             duration: 0.8,
  //             ease: "power2.out",
  //           },
  //           1
  //         )
  //         .from(
  //           ".hp-first-section .btn",
  //           {
  //             y: 30,
  //             opacity: 0,
  //             stagger: 0.2,
  //             duration: 1,
  //             ease: "power2.out",
  //           },
  //           1.5
  //         );
  //     });
  //     return () => ctxs.revert();
  //   }, []);

  //  animate Gsap useEffect
  // useEffect(() => {
  //     const ctxhome = gsap.context(() => {
  //     // second section
  //       // const split = new SplitType(".heading-tag h2", { types: "words, chars" });
  //       gsap.from(".heading-tag h2", {
  //       y: 50,
  //       opacity: 0,
  //       // stagger: 0.05,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".heading-tag h2",
  //         start: "top 80%",
  //       }
  //     });
  //     const cards = document.querySelectorAll(".service-card");

  //     cards.forEach((card, index) => {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: card,
  //         start: "top 80%",
  //         toggleActions: "play none none none",
  //       },
  //     });
  //     gsap.fromTo(card,{
  //           opacity: 0.8,
  //           // y: 100,
  //           scale:0.90
  //      },{
  //        opacity: 1,
  //         // y: 0,
  //         duration: 1,
  //         scale:1,
  //         ease: "power3.out",
  //         delay: index * 0.05,

  //         scrollTrigger: {
  //         trigger: card,
  //           start: "top bottom",
  //           end:"bottom top",
  //           scrub:1,
  //         // end:"+10",
  //         // toggleActions: "play none none reverse",
  //       },
  //      });

  //     // const split = new SplitType(card.querySelector(".heading"), { types: "words, chars" });

  //      tl.from(
  //       card.querySelector(".heading"),
  //       {
  //         opacity: 0,
  //         y: 20,
  //         duration: 0.2,

  //       },0.2
  //     )
  //     .from(card.querySelector(".sub-heading"), {
  //         opacity: 0,
  //         y: 20,
  //         duration: 0.4,
  //       },0.2)
  //       .from(card.querySelector(".type-p"), {
  //         opacity: 0,
  //         y: 20,
  //         duration: 0.4,
  //       },0.2)
  //       .from(card.querySelectorAll(".benefits > div"), {
  //         opacity: 0,
  //         x: -20,
  //         duration: 0.5,
  //         stagger: 0.1,
  //       },0.2)
  //       .from(card.querySelector(".price-duration"), {
  //         opacity: 0,
  //         y: 20,
  //         duration: 0.5,
  //       },0.2);

  //   });

  //       // const splitfour = new SplitType(".hp-fourth-section .heading .sub-heading span", { types: "words, chars" });
  //       // Animate fourth Section
  //       gsap.from(".hp-fourth-section", {
  //         opacity: 0,
  //         y: 50,
  //         duration: 1,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".hp-fourth-section",
  //           toggleActions: "play none none reverse",

  //         },
  //       });
  //       gsap.from(".hp-fourth-section .heading .sub-heading", {
  //             y: 50,
  //             opacity: 0,
  //             duration: 0.5,
  //             ease: "power2.out",
  //             scrollTrigger: {
  //             trigger: ".hp-fourth-section",
  //           start: "start 50%"
  //         },
  //       },0.1);
  //       gsap.from(".hp-fourth-section .boxs", {
  //       rotateY: 80,
  //       opacity: 0,
  //       transformOrigin: "left center",
  //       duration: 1,
  //       stagger: 0.2,
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".hp-fourth-section",

  //        start: "top 95%",
  //       },

  //     },0.1);
  //       gsap.to(".parallax-circle", {
  //       yPercent: 80,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: ".hp-fourth-section",
  //         scrub: 1,
  //       },
  //     },0.1);
  //     gsap.to(".hp-fourth-section .boxs", {
  //       rotateX: 3,
  //       rotateY: 3,
  //       scrollTrigger: {
  //         trigger: ".hp-fourth-section",
  //         start: "top bottom",
  //         end: "bottom top",
  //         scrub: true,
  //       },
  //     });
  //       gsap.from(".hp-fourth-section .boxs .profile", {
  //         opacity: 0,
  //         y: 50,
  //         stagger: 0.5,
  //         duration: 0.5,

  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".hp-fourth-section",
  //           start: "top 95%",
  //         },
  //       },0.2);

  //       // fourth section end

  //       // fiveth section start  // stepth section
  //       // c onst splitfive = new SplitType(".hp-fiveth-section  .heading span", { types: "words, chars" });

  //        gsap.from(".hp-fiveth-section  .heading span", {
  //             y: 50,
  //             opacity: 0,
  //             duration: 0.5,
  //             ease: "power2.out",
  //             scrollTrigger: {
  //             trigger: ".hp-fiveth-section",
  //           start: "start 50%"
  //         },
  //       },0);
  //       gsap.from(".hp-fiveth-section  .heading" , {
  //            y: 50,
  //           opacity: 0,
  //           duration: 0.5,
  //           ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".hp-fiveth-section",
  //          start: "start 50%"
  //         },
  //       },0);
  //       gsap.from(".hp-fiveth-section .steps-all", {
  //         opacity: 0,
  //         y: 50,
  //         stagger: 0.5,
  //         duration: 0.8,
  //         ease: "power2.out",
  //         scrollTrigger: {
  //           trigger: ".hp-fiveth-section",
  //            start: "start 50%",
  //           toggleActions: "play none none reverse",

  //         },
  //       });

  //     });

  //   const stepItems = gsap.utils.toArray(".step-animate");

  //   stepItems.forEach((item, index) => {
  //     gsap.fromTo(
  //       item,
  //       {
  //         opacity: 0,
  //         y: 50,
  //       },
  //       {
  //         scrollTrigger: {
  //           trigger: item,
  //           start: "top 90%",
  //           toggleActions: "play none none none",
  //         },
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.6,
  //         delay: index * 0.1,
  //         ease: "power2.out",
  //         onEnter: () => console.log("Animated step", index + 1),
  //       }
  //     );
  //   });

  //     // our partner asection

  //      const boxes = gsap.utils.toArray(".scroll-animation .partner-box");

  //       gsap.fromTo(
  //         boxes,
  //         {
  //           opacity: 0,
  //           x: 50,
  //         },
  //         {
  //           opacity: 1,
  //           x: 0,
  //           duration: 0.5,
  //           stagger: 0.1,
  //           ease: "power3.out",
  //           scrollTrigger: {
  //             trigger: ".scroll-animation",
  //             start: "top 80%",
  //             toggleActions: "play none none none",
  //           },
  //         }
  //       );

  //     return () => ctxhome.revert();
  //   }, []);

  return (
    <div>
      <div className="content-of-home">
        {/* <div className="homepage-title-intro">
          <div className="preloader">
            <div className="intro-title">
              <h1 className="heading1">Xecure</h1>
              <h1 className="heading2">One</h1>
            </div>
            <div className="outro-title">
              <div className="circle-logo"><p>1</p></div>
            </div>
          </div>
          <div className="split-overlay">
            <div className="intro-title">
              <h1 className="heading1">Xecure</h1>
              <h1 className="heading2">One</h1>
            </div>
            <div className="outro-title">
              <div className="circle-logo"><p>1</p></div>
            </div>
          </div>
          <div className="home-page-container"></div>
        </div> */}

        <div className="homepage-overall-container">
          <div className="hp-first-section">
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
              <h1>
                Secure Your Business, <br></br>
                <span>Protect What Matters Most.</span>
              </h1>
              <p>
                XecureOne offers a comprehensive range of tailored cybersecurity
                solutions designed to protect your digital assets, prevent data
                breaches, and ensure compliance with industry standards.{" "}
              </p>
            </div>
            <div className="btn">
              <div className="explore-btn">Explore Services</div>
              <div className="get-free-btn">Get a Free Consultation</div>
            </div>
          </div>

          {/* <div id="scroll-container"> */}
          <div className="hp-second-section service-section" ref={containerRef}>
            <div className="secondsec-left">
              <div className="outside-box">
                <div className="circle-bg-6"></div>

                <div className="inside-box"></div>
              </div>
            </div>
            <div className="secondsec-right">
              <div className="title-tag">
                <p>Our Service</p>
              </div>

              <div className="heading-tag">
                <h2>
                  Secure Today,<br></br>
                  <span>Safer Tomorrow</span>
                </h2>
              </div>

              <div className="all-service" ref={scrollRef}>
                <div className="services service1">
                  <div className="card service-card">
                    <div className="blur-circle circle1"></div>
                    <div className="blur-circle circle2"></div>
                    <div className="blur-circle circle3"></div>
                    <div className="service-content">
                      <div className="heading">
                        <div className="circle-logo"></div>
                        <h2>Penetration Testing</h2>
                      </div>
                      <p className="sub-heading">
                        Simulated ethical hacking to identify vulerabilities
                        before attackers do.
                      </p>
                      <p className="type-p">
                        <span>Types :</span> Web, Mobile, Network, Wireless
                      </p>
                      <div className="benefits">
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Certified testers (CEH/OSCP)</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Real-world attack simulations</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Detailed remediation report</p>
                        </div>
                      </div>
                      <div className="price-duration">
                        <div className="price">
                          <p>
                            ₹ 50,000 <span>/ Test</span>
                          </p>
                        </div>
                        <div className="duration">
                          <p>
                            {" "}
                            5 - 7<span> Days</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services service2">
                  <div className="card service-card">
                    <div className="blur-circle circle1"></div>
                    <div className="blur-circle circle2"></div>
                    <div className="blur-circle circle3"></div>
                    <div className="service-content">
                      <div className="heading">
                        <div className="circle-logo"></div>
                        <h2>Penetration Testing</h2>
                      </div>
                      <p className="sub-heading">
                        Simulated ethical hacking to identify vulerabilities
                        before attackers do.
                      </p>
                      <p className="type-p">
                        <span>Types :</span> Web, Mobile, Network, Wireless
                      </p>
                      <div className="benefits">
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Certified testers (CEH/OSCP)</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Real-world attack simulations</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Detailed remediation report</p>
                        </div>
                      </div>
                      <div className="price-duration">
                        <div className="price">
                          <p>
                            ₹ 50,000 <span>/ Test</span>
                          </p>
                        </div>
                        <div className="duration">
                          <p>
                            {" "}
                            5 - 7<span> Days</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services service3">
                  <div className="card service-card">
                    <div className="blur-circle circle1"></div>
                    <div className="blur-circle circle2"></div>
                    <div className="blur-circle circle3"></div>
                    <div className="service-content">
                      <div className="heading">
                        <div className="circle-logo"></div>
                        <h2>Penetration Testing</h2>
                      </div>
                      <p className="sub-heading">
                        Simulated ethical hacking to identify vulerabilities
                        before attackers do.
                      </p>
                      <p className="type-p">
                        <span>Types :</span> Web, Mobile, Network, Wireless
                      </p>
                      <div className="benefits">
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Certified testers (CEH/OSCP)</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Real-world attack simulations</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Detailed remediation report</p>
                        </div>
                      </div>
                      <div className="price-duration">
                        <div className="price">
                          <p>
                            ₹ 50,000 <span>/ Test</span>
                          </p>
                        </div>
                        <div className="duration">
                          <p>
                            {" "}
                            5 - 7<span> Days</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services service4">
                  <div className="card service-card">
                    <div className="blur-circle circle1"></div>
                    <div className="blur-circle circle2"></div>
                    <div className="blur-circle circle3"></div>
                    <div className="service-content">
                      <div className="heading">
                        <div className="circle-logo"></div>
                        <h2>Penetration Testing</h2>
                      </div>
                      <p className="sub-heading">
                        Simulated ethical hacking to identify vulerabilities
                        before attackers do.
                      </p>
                      <p className="type-p">
                        <span>Types :</span> Web, Mobile, Network, Wireless
                      </p>
                      <div className="benefits">
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Certified testers (CEH/OSCP)</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Real-world attack simulations</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Detailed remediation report</p>
                        </div>
                      </div>
                      <div className="price-duration">
                        <div className="price">
                          <p>
                            ₹ 50,000 <span>/ Test</span>
                          </p>
                        </div>
                        <div className="duration">
                          <p>
                            {" "}
                            5 - 7<span> Days</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="services service5">
                  <div className="card service-card">
                    <div className="blur-circle circle1"></div>
                    <div className="blur-circle circle2"></div>
                    <div className="blur-circle circle3"></div>
                    <div className="service-content">
                      <div className="heading">
                        <div className="circle-logo"></div>
                        <h2>Penetration Testing</h2>
                      </div>
                      <p className="sub-heading">
                        Simulated ethical hacking to identify vulerabilities
                        before attackers do.
                      </p>
                      <p className="type-p">
                        <span>Types :</span> Web, Mobile, Network, Wireless
                      </p>
                      <div className="benefits">
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Certified testers (CEH/OSCP)</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Real-world attack simulations</p>
                        </div>
                        <div>
                          <BsPatchCheckFill className="check-logo" />
                          <p>Detailed remediation report</p>
                        </div>
                      </div>
                      <div className="price-duration">
                        <div className="price">
                          <p>
                            ₹ 50,000 <span>/ Test</span>
                          </p>
                        </div>
                        <div className="duration">
                          <p>
                            {" "}
                            5 - 7<span> Days</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* </div> */}
          </div>
          {/* </div> */}
          {/* <div className="purple-color-hline"> </div> */}

          <div className="hp-third-section why-choose-section">
            <div className="circle-bg1"></div>
            <WhyChooseUs />
          </div>

          {/* <div className="purple-color-hline"> </div> */}

          <div className="hp-fourth-section client-testimonials">
            <div className="circle-bg-2"></div>
            <div className="heading">
              <div className="title-tag client-tag">
                <p>Client Testimonials</p>
              </div>
              <p className="sub-heading">
                See what our Clients have to say
                <span> about our cybersecurity service.</span>
              </p>
            </div>
            <div className="slider-container">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={200}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  798: { slidesPerView: 1 },
                  1024: { slidesPerView: 2 },
                }}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                pagination={{ clickable: true, el: ".custom-pagination" }}
                autoplay={{ delay: 5000 }}
                loop
                className="client-boxall"
              >
                {testimonials.map((client, index) => (
                  <SwiperSlide key={index}>
                    <div className="boxs box1">
                      <div className="card boxs-card">
                        <div className="blur-circle circle1 parallax-circle"></div>
                        <div className="blur-circle circle2 parallax-circle"></div>
                        <div className="blur-circle circle3 parallax-circle"></div>
                      </div>
                      <div className="profile">
                        <div className="logo"></div>
                        <div className="profile-details">
                          <h3 className="p-heading">{client.name}</h3>
                          <p className="p-sub-heading">{client.title}</p>
                        </div>
                      </div>
                      <div className="para-descrip">
                        <p>“{client.feedback}”</p>
                      </div>
                      <div className="stars">
                        <IoStar className="stat-icon" />
                        <IoStar className="stat-icon" />
                        <IoStar className="stat-icon" />
                        <IoStar className="stat-icon" />
                        <IoStar className="stat-icon" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="custom-pagination"></div>
              </Swiper>
            </div>
          </div>

          {/* <div className="purple-color-hline"></div> */}

          <div className="hp-fiveth-section step-bt-process">
            <div className="circle-bg-3"></div>
            <div className="circle-bg-4"></div>
            <div className="heading">
              <h2>
                Our Proven Process to Secure <span>What Matters Most.</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto itaque sint dolorem fugiat minus voluptate
                consequatur aliquam adipisci amet quisquam!
              </p>
            </div>
            <div className="steps-all">
              {stepsData.map((step, index) => (
                <div className="step-animate" key={index}>
                  <div
                    className={`steps step${index + 1} ${
                      expandedIndex === index ? "expanded" : ""
                    }`}
                    onClick={() => toggleStep(index)}
                  >
                    <div className="step-content">
                      <div className="title-tag step-tag">
                        <p>Step {index + 1}</p>
                      </div>
                      <div className="s-content">
                        <h3 className="c-heading">{step.title}</h3>
                        <p
                          className={`c-sub-heading ${
                            expandedIndex === index ? "visible" : "hidden"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="down-arrow">
                      <GoPlus
                        className={`down-arrow-icon ${
                          expandedIndex === index ? "rotated" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hp-sixth-section our-partner">
            <div className="title-tag blue-tag partner-tag">
              <p>Our Partner.</p>
            </div>
            <div className="partner-box-container">
              <div className="partner-box-all scroll-animation">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="partner-box p-box1"></div>
                    <div className="partner-box p-box2"></div>
                    <div className="partner-box p-box3"></div>
                    <div className="partner-box p-box4"></div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="hp-seventh-section">
            <div className="circle-bg-5"></div>
            <GetSecured />
          </div>

          <div className="hp-last-section footer-section">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transition(HomePage);
