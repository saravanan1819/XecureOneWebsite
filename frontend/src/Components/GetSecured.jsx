import React from "react";
import "../Styles/GetSecured.css";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import DatePicker from "react-datepicker";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const purposeOptions = [
  { value: "general", label: "General Meeting" },
  { value: "technical", label: "Technical Support" },
  { value: "feedback", label: "Feedback" },
  { value: "explore", label: "Explore Service" },
  { value: "other", label: "Other" },
];
function GetSecured() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => setIsPopUpOpen(true);
  const closePopUp = () => setIsPopUpOpen(false);

  useEffect(() => {
    if (isPopUpOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopUpOpen]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [otherPurpose, setOtherPurpose] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalPurpose = purpose === "other" ? otherPurpose : purpose;

    if (!finalPurpose || !dateTime) {
      alert("Please complete all required fields");
      return;
    }
    const formattedDate = dateTime.toISOString().split("T")[0];
    const formattedTime = dateTime.toTimeString().split(" ")[0].slice(0, 5); // HH:mm

    const payload = {
      name,
      email,
      purpose: finalPurpose,
      date: formattedDate,
      time: formattedTime,
      message,
    };
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Appointment submitted successfully!");
        setName("");
        setEmail("");
        setPurpose("");
        setOtherPurpose("");
        setDateTime(null);
        setMessage("");
      } else {
        alert(" Submission failed: " + (data.error || "Try again later"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(" Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };


  // useEffect(()=>{
  //     const ctx = gsap.context(() => {
  //     const split = new SplitType(".get-secured-now .get-secured-content .heading", { types: "words, chars" });

  //     gsap.from(".get-secured-now", {
  //       opacity: 1,
  //       y: 90,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: ".get-secured-now",
  //         start: "top 80%",
  //         toggleActions: "play none none reverse",
  //       }
  //     });
  //     gsap.from(split.chars, {
  //        y: 50,
  //         opacity: 0,
  //         stagger: 0.05,
  //         duration: 0.4,
  //         ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".get-secured-now",
  //        start: "top 95%",
  //       },
  //     });
  //     gsap.from(".get-secured-now .get-secured-content .sub-heading", {
  //       opacity: 0,
  //       y: 100,
  //       duration: 1.2,
  //       delay:0.3,

  //       ease: "power3.out",
  //        scrollTrigger: {
  //         trigger: ".get-secured-now",
  //        start: "top 95%",
  //       },
  //     });
  //       gsap.from(".get-secured-now .get-secured-content .bookconsult-button", {
  //       opacity: 0,
  //       y: 100,
  //       duration: 1.2,
  //       delay:0.3,
  //       ease: "power3.out",
  //        scrollTrigger: {
  //         trigger: ".get-secured-now",
  //        start: "top 95%",
  //       },
  //     });
  //       gsap.from(".get-secured-now", {

  //         scale: 1.13,
  //         scrollTrigger: {
  //           trigger: ".get-secured-now",
  //           start: "top bottom",
  //           scrub: 1,
  //         },
  //       });
  //     });
  //     return () => ctx.revert();
  // },[])


  return (
    <div>
      <div className="get-secured-now-section">
        <div className="get-secured-now">
          <div className="card get-secured-card">
            <div className="blur-circle circle1 getsecured-circle1"></div>
            <div className="blur-circle circle2 getsecured-circle2"></div>
            <div className="blur-circle circle3 getsecured-circle3"></div>
          </div>
          <div className="get-secured-content">
            <div className="title-tag blue-tag getsecured-tag">
              <p>Get Secured Now</p>
            </div>
            <h1 className="heading">
              Every company deserves a <span>chance to grow safely.</span>
            </h1>
            <p className="sub-heading">
              Partner with us to protect your business from digital threats. We
              connect you with certified cybersecurity experts — fast, reliable,
              and trusted
            </p>
            <button className="bookconsult-button" onClick={openPopUp}>
              Book a Consultaion
            </button>
          </div>
        </div>
      </div>
      {/* Pop Up*/}
      {isPopUpOpen && (
        <div className="popup-overlay" onClick={closePopUp}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="circle-close">
              <RxCross2 className="circle-crs-icon" onClick={closePopUp} />
            </div>
         
            <h2 className="p-heading">Book Your Consultation</h2>
            <p className="p-sub-heading">
              Please fill out the form and our team will get in touch with you.
            </p>

            <div className="popup-flex">
              <div className="popup-left">
                <DotLottieReact
                  src="https://lottie.host/cda63d25-fcca-45a7-9403-21932297c196/rFNzE14CIQ.lottie"
                  loop
                  autoplay
                  className="gif-animate"
                />
              </div>
              <div className="popup-right">
                <form className="consultation-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name :</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your name "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email :</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Enter your email"

                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group half" style={{width:"40%",}}>
                      <label>Purpose</label>
                      <select
                        className="form-input-purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select purpose
                        </option>
                        {purposeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {purpose === "other" && (
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Please specify"
                          value={otherPurpose}
                          onChange={(e) => setOtherPurpose(e.target.value)}
                          required
                        />
                      )}
                    </div>
                    <div className="form-group half" style={{width:"60%",}}>
                      <label>Date & Time</label>
                      <DatePicker
                        selected={dateTime}
                        onChange={setDateTime}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message :</label>
                    <textarea
                      className="form-input textarea"
                      value={message}
                      placeholder="Enter your message here..."
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetSecured;
