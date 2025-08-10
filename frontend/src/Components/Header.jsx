import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "../Styles/Header.css";
import { RxCross2 } from "react-icons/rx";
import { IoCaretUp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GoPlus, GoX } from "react-icons/go";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

// gsap.registerPlugin(CustomEase);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(false);

  const toggleStep = () => {
    setExpandedIndex(!expandedIndex);
  };
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  let lastScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -50, opacity: 0, display: "block" },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          mobileMenuRef.current.style.display = "none";
        },
      });
    }
  }, [menuOpen]);
  // const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };
  return (
    <>
      <div
        className={`header-container ${isScrollingDown ? "fixed-header" : ""}`}
      >
        <div className="header-desktop">
          <div className="header-left">
            <div className="title">
              <div className="circle-logo"></div>
              <div className="title-text">
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  <h1>
                    Xecure<span>One</span>
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="list-navbar">
              <nav>
                <div className="navbar navbar-about">
                  <Link to="/about" className="list-name">
                    About
                  </Link>
                </div>
                <div className="navbar navbar-services">
                  <div className="services-wrapper">
                    <Link className="list-name service-name">Services</Link>
                    <div
                      className="hover-services"
                      onMouseLeave={() => setSelected(null)}
                    >
                      <div className="hover-services-text">
                        <div className="hover-left">
                          {selected === null && (
                            <div className="service-title">
                              <h1>Services</h1>
                            </div>
                          )}
                          <div
                            className="sub-menu-option-all"
                            onMouseLeave={() => setSelected(null)}
                          >
                            {selected === 1 && (
                              <div className="three-options">
                                <Link
                                  to="/cyberleglsupport"
                                  className="option-btn"
                                >
                                  <p>Cyberlegal Support</p>
                                </Link>
                                <Link
                                  to="/cybersecuritytraining"
                                  className="option-btn"
                                >
                                  <p>CyberSecurity Training</p>
                                </Link>
                              </div>
                            )}

                            {selected === 2 && (
                              <div className="three-options">
                                <Link
                                  to="/threatintelligence"
                                  className="option-btn"
                                >
                                  <p>Threat Intelligence</p>
                                </Link>
                                <Link
                                  to="/malwareanalysis"
                                  className="option-btn"
                                >
                                  <p>Malware Analysis</p>
                                </Link>
                              </div>
                            )}

                            {selected === 3 && (
                              <div className="three-options">
                                <Link
                                  to="/endpointsecurity"
                                  className="option-btn"
                                >
                                  <p>Endpoint Security</p>
                                </Link>
                                <Link
                                  to="/nextgenfirewall"
                                  className="option-btn"
                                >
                                  <p>Next-Gen Firewall</p>
                                </Link>
                                <Link
                                  to="/emailsecurity"
                                  className="option-btn"
                                >
                                  <p>Email Security Proactive</p>
                                </Link>
                              </div>
                            )}

                            {selected === 4 && (
                              <div className="three-options">
                                <Link
                                  to="/penetrationtesting"
                                  className="option-btn"
                                >
                                  <p>Penetration Testing</p>
                                </Link>
                                <Link to="/securecode" className="option-btn">
                                  <p>Secure Code Review</p>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="hover-list-all hover-right">
                          <div
                            className={`hover-list ${
                              selected === 1 ? "active" : ""
                            }`}
                            onMouseEnter={() => setSelected(1)}
                          >
                            <p className="ser-list-name">
                              Governance, Risk and Compliance
                            </p>
                          </div>

                          <div
                            className={`hover-list ${
                              selected === 2 ? "active" : ""
                            }`}
                            onMouseEnter={() => setSelected(2)}
                          >
                            <p className="ser-list-name">
                              Threat and Incident Management
                            </p>
                          </div>

                          <div
                            className={`hover-list ${
                              selected === 3 ? "active" : ""
                            }`}
                            onMouseEnter={() => setSelected(3)}
                          >
                            <p className="ser-list-name">Managed SOC</p>
                          </div>

                          <div
                            className={`hover-list ${
                              selected === 4 ? "active" : ""
                            }`}
                            onMouseEnter={() => setSelected(4)}
                          >
                            <p className="ser-list-name">
                              Security and Assessment
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="navbar navbar-contact">
                  <Link to="/contact" className="list-name">
                    Contact
                  </Link>
                </div>
              </nav>
              <div className="header-button">
                <p className="btn-p">Get In Touch</p>
              </div>
            </div>
          </div>

          <div
            className={
              menuOpen ? "mobile-toggle mobile-active" : "mobile-toggle"
            }
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <div className="menu-close">
                <RxCross2 className="cross-icon" />
              </div>
            ) : (
              <div className="menu-open">
                <div className="menu-circle"></div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`header-mobile ${menuOpen ? "open " : ""}`}
          style={{ display: "none", opacity: 0 }}
          ref={mobileMenuRef}
        >
          <div className="mobile-header-container">
            <div className="mobile-link link1">
              <Link
                to="/about"
                style={{ textDecoration: "none" }}
                onClick={toggleMenu}
              >
                <p style={{ color: "white" }}>About</p>
              </Link>
            </div>

            <div
              className={`mobile-link link2 ${expandedIndex ? "expanded" : ""}`}
            >
              <div
                className={`service-flex ${expandedIndex ? "active" : ""}`}
                onClick={toggleStep}
              >
                <p>Service</p>
                <GoPlus className="cross-icon" />
              </div>
              <div
                className={`mobile-list-all ${expandedIndex ? "visible" : ""}`}
              >
                <div className="list-flex-all">
                  <div
                    className={`list-flex ${open === 1 ? "active" : ""}`}
                    onClick={() => toggle(1)}
                  >
                    <p>Governance, Risk and Compliance</p>
                    <div className={`down-arrow ${open === 1 ? "rotate" : ""}`}>
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  <div
                    className={`dropdown-content ${open === 1 ? "show" : ""}`}
                  >
                    <Link to="/cyberleglsupport" className="option-mobile-btn"  onClick={toggleMenu}>
                      <p>Cyberlegal Support</p>
                    </Link>
                    <Link to="/cybersecuritytraining" className="option-mobile-btn" onClick={toggleMenu}>
                      <p>CyberSecurity Training</p>
                    </Link>
                  </div>
                  <div
                    className={`list-flex ${open === 2 ? "active" : ""}`}
                    onClick={() => toggle(2)}
                  >
                    <p>Threat and Incident Management</p>
                    <div className={`down-arrow ${open === 2 ? "rotate" : ""}`}>
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  <div
                    className={`dropdown-content ${open === 2 ? "show" : ""}`}
                  >
                    <Link to="/threatintelligence" className="option-mobile-btn" onClick={toggleMenu}>
                      <p>Threat Intelligence</p>
                    </Link>
                    <Link to="/malwareanalysis" className="option-mobile-btn" onClick={toggleMenu}>
                      <p>Malware Analysis</p>
                    </Link>
                  </div>
                  <div
                    className={`list-flex ${open === 3 ? "active" : ""}`}
                    onClick={() => toggle(3)}
                  >
                    <p>Managed SOC</p>
                    <div className={`down-arrow ${open === 3 ? "rotate" : ""}`}>
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  <div
                    className={`dropdown-content ${open === 3 ? "show" : ""}`}
                  >
                    <Link to="/endpointsecurity" className="option-mobile-btn" onClick={toggleMenu}>
                      <p>Endpoint Security</p>
                    </Link>
                    <Link to="/nextgenfirewall" className="option-mobile-btn" onClick={toggleMenu}>
                      <p>Next-Gen Firewall</p>
                    </Link>
                    <Link to="/emailsecurity" className="option-mobile-btn">
                      <p>Email Security Proactive</p>
                    </Link>
                  </div>
                  <div
                    className={`list-flex ${open === 4 ? "active" : ""}`}
                    onClick={() => toggle(4)}
                  >
                    <p>Security and Assessment</p>
                    <div className={`down-arrow ${open === 4 ? "rotate" : ""}`}>
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  <div
                    className={`dropdown-content ${open === 4 ? "show" : ""}`}
                  >
                    <Link to="/penetrationtesting" className="option-mobile-btn"  onClick={toggleMenu}>
                      <p>Penetration Testing</p>
                    </Link>
                    <Link to="/securecode" className="option-mobile-btn" onClick={toggleMenu}>
                      <p>Secure Code Review</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile-link link3">
              <Link
                to="/contact"
                style={{ textDecoration: "none" }}
                onClick={toggleMenu}
              >
                <p style={{ color: "white" }}>Contact</p>
              </Link>
            </div>
            <div className="get-in-touch" onClick={toggleMenu}>
              <p>Get In Touch</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
