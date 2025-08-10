import React from 'react'
import { useEffect } from 'react';
import "../Styles/Footer.css";
import { RiInstagramFill } from "react-icons/ri";
import { ImLinkedin2 } from "react-icons/im";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scale } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);
function Footer() {
  return (
    <> 
        <div className='footers'>
            <div className='footer-container-custom' >
             <div className='circle-bg-footer'></div>

            <div className="top-footer">
                  <div className="footer-profile">
                        <div className="circle"></div>
                        <h1>Xecure<span>One</span></h1>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minus culpa quasi accusantium ad cupiditate itaque eos ipsam aliquid error?
                        </p>
                        <div className="social-media">
                            <div className="insta social-logo">
                                <RiInstagramFill className='insta-icon'/>
                            </div>
                            <div className="facebook social-logo">
                              <FaFacebookF />
                            </div>
                            <div className="linkedin social-logo">
                                  <ImLinkedin2 />
                            </div>
                            <div className="twitter social-logo">
                              <BsTwitterX />
                            </div>
                        </div>
                    </div> 
                    <div className="footer-right">
                          <div className="two-flex">
                              <div className="footer-services">
                                  <h2>Services</h2>
                                  <div className="list-flex">
                                      <Link to="/vspt" style={{textDecoration:"none"}} className="f-service-link"  >Vulnerability Assessment Penetration Testing</Link>
                                      <Link to="/EndpointSecurity" style={{textDecoration:"none"}} className="f-service-link"  >Endpoint Security</Link>
                                      <Link to="/NextGenerationFirewall" style={{textDecoration:"none"}} className="f-service-link" >Next Generation Firewall</Link>
                                      <Link to="/EmailSecurity" style={{textDecoration:"none"}} className="f-service-link" >Email Security</Link>
                                      <Link to="/MalwareAnalysis" style={{textDecoration:"none"}} className="f-service-link"> Malware Analysis </Link>
                                    </div>
                                    
                            </div>
                            <div className="footer-menu">
                                <h2>Menu</h2>
                                  <div className="list-flex">
                                      <Link to="/" style={{textDecoration:"none"}} className="f-menu-link" >Home</Link>
                                      <Link to="/about" style={{textDecoration:"none"}} className="f-menu-link">About</Link>
                                      <Link to="/contact" style={{textDecoration:"none"}} className="f-menu-link" >Contact</Link>
                                      {/* <Link to="/vspt" style={{textDecoration:"none"}} className="f--link" >Services</Link> */}
                                    </div>
                            </div>
                        </div>
                        <div className="get-in-touch">
                            <p>Have anything on mind to discuss? We are these to help you!</p>
                              <div className="get-intouch-button">
                                <p>Get In Touch</p>
                              </div>
                        </div>
                    </div>
              </div>
              <div className="footer-line"></div>
               <div className="bottom-text">
                    <h2>XecureOne</h2>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
               </div>
            </div>
        </div>
    </>
    
  )
}

export default Footer