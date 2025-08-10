import React from "react";
import "../styles/ServicePageNew.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import GetSecured from "../Components/GetSecured";
import Footer from "../Components/Footer";
import Transition from "./Transition";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const tabs = [
  { label: "Antivirus & Anti-malware Protection", key: "antivirus" },
  { label: "Data Loss Prevention(DLP)", key: "dlp" },
  { label: "Firewall and Network Control", key: "firewall" },
  { label: "Endpoint Detection and Response (EDR)", key: "edr" },
];

const contents = {
  antivirus: {
    title: "Advanced Antivirus & Anti-malware Protection",
    subtitle:
      "Protect your business from the ever-evolving landscape of cyber threats with our comprehensive Antivirus and Anti-malware solutions. Designed to detect and eliminate viruses, ransomware, spyware, and other malicious software, our protection ensures your devices and sensitive data remain secure.",
    highlight: "What Makes Our Antivirus & Antimalware ",
    highlightColor: "Protection Unbeatable",
    features: [
      {
        head: "Signature-Based Detection",
        desc: "Utilizes a vast database of known malware 'signatures' to quickly and accurately identify and block established threats before they can harm your system.",
      },
      {
        head: "Heuristic Analysis",
        desc: "Employs advanced heuristic algorithms and behavior monitoring to detect suspicious malware behaviors, including zero-day threats that traditional methods might miss.",
      },
      {
        head: "Host Intrusion Prevention",
        desc: "Continuously scans files and system processes as they run, instantly blocking malicious actions and preventing unauthorized changes to your system.",
      },
      {
        head: "Cloud-Threat Intelligence",
        desc: "Leverages cloud analytics to rapidly identify and respond to emerging threats, ensuring your protection is always up-to-date with the latest malware intelligence.",
      },
      {
        head: "Sandboxing Technology",
        desc: "Runs suspicious files in a secure, isolated virtual environment ('sandbox') to observe their behavior safely, only allowing them onto your system if proven harmless.",
      },
      {
        head: "Centralized Management",
        desc: "Delivers seamless, automatic updates and provides a unified dashboard for IT teams to manage, monitor, and optimize protection across devices.",
      },
    ],
  },
  dlp: {
    title: "Data Loss Prevention (DLP)",
    subtitle:
      "Safeguard sensitive company information with our robust DLP solutions, designed to monitor, detect, and block data exfiltration, leaks, and misuse. Protect intellectual property and meet regulatory compliance demands.",
    highlight: "How Our DLP Keeps Data ",
    highlightColor: "Secure",
    features: [
      {
        head: "Content Inspection",
        desc: "Scans data for sensitive content using advanced pattern matching and context-based analysis.",
      },
      {
        head: "Policy Enforcement",
        desc: "Automates actions such as encryption and blocking to comply with organizational security policies.",
      },
      {
        head: "Workflow Integration",
        desc: "Seamlessly integrates with email, cloud, and endpoint workflows to prevent loss at all stages.",
      },
      {
        head: "User Education",
        desc: "Informs users of risky actions in real time to reduce accidental data leaks.",
      },
      {
        head: "Reporting & Compliance",
        desc: "Comprehensive reports for audits and regulatory requirements.",
      },
      {
        head: "Incident Response",
        desc: "Immediate alerts and response actions on suspicious data activities.",
      },
    ],
  },
  firewall: {
    title: "Firewall and Network Control",
    subtitle:
      "Defend your organization’s infrastructure with powerful network firewalls, access controls, and intrusion prevention—keeping threats out and business running smoothly.",
    highlight: "Why Our Network Security ",
    highlightColor: "Excels",
    features: [
      {
        head: "Deep Packet Inspection",
        desc: "Examines entire network packets for threats, blocking intrusion attempts.",
      },
      {
        head: "Zero Trust Policy",
        desc: "Limits access based on user, device, and behavior for maximum safety.",
      },
      {
        head: "Traffic Segmentation",
        desc: "Isolates sensitive assets from the rest, minimizing lateral movement.",
      },
      {
        head: "Automated Threat Response",
        desc: "Instantly detects and reacts to unusual network activity.",
      },
      {
        head: "App & URL Filtering",
        desc: "Blocks risky websites and unauthorized application use.",
      },
      {
        head: "Comprehensive Logging",
        desc: "Maintains detailed logs for troubleshooting and compliance.",
      },
    ],
  },
  edr: {
    title: "Endpoint Detection and Response (EDR)",
    subtitle:
      "Continuous monitoring, analytics, and adaptive defenses guard every endpoint from emerging threats, with the power to remediate incidents fast.",
    highlight: "What Makes Our EDR ",
    highlightColor: "Elite",
    features: [
      {
        head: "Real-Time Monitoring",
        desc: "Constantly analyzes endpoint activities for malicious patterns.",
      },
      {
        head: "Automated Remediation",
        desc: "Quarantines and removes threats instantly upon detection.",
      },
      {
        head: "Threat Hunting",
        desc: "Enables deep investigation into advanced persistent threats.",
      },
      {
        head: "Behavioral Analytics",
        desc: "Detects anomalies indicating sophisticated attacks.",
      },
      {
        head: "Centralized Dashboard",
        desc: "Unified view of all endpoints and security status.",
      },
      {
        head: "Forensics",
        desc: "Provides detailed incident timelines to support response and investigation.",
      },
    ],
  },
};

const benefits = [
  {
    title: "Threat Prevention",
    description: `Block malware, ransomware, and advanced cyber threats before they reach your devices.
Protect your business from both known and emerging attacks.
Stay ahead of cybercriminals with proactive defense mechanisms.`,
  },
  {
    title: "Data Protection",
    description: `Safeguard sensitive business data across all endpoints, both onsite and remote.
Prevent unauthorized access and data leaks with strong encryption.
Maintain customer trust by keeping confidential information secure.`,
  },
  {
    title: "Centralized Management",
    description: `Monitor and manage all endpoint devices from a single, intuitive dashboard.
Easily deploy updates and enforce security policies across your organization.
Reduce IT workload with automated alerts and streamlined controls.`,
  },
  {
    title: "Regulatory Compliance",
    description: `Meet industry standards and legal requirements with comprehensive security controls.
Generate detailed reports to simplify audits and compliance checks.
Reduce the risk of costly fines and reputational damage.`,
  },
  {
    title: "Reduced Downtime",
    description: `Quickly detect and respond to threats, minimizing business disruption.
Automated incident response helps isolate and remediate compromised devices.
Keep your operations running smoothly and efficiently.`,
  },
  {
    title: "Scalable Security",
    description: `Easily expand protection as your business grows and adds new devices.
Adapt to changing security needs without major infrastructure changes.
Ensure every endpoint is covered, no matter where your team works.`,
  },
];
const needs = [
  {
    title: "Remote Work Security",
    description:
      "Are your employees working remotely accessing company data from various locations? Our endpoint security solutions ensure that remote access is secure and in adherence to your organization's regulations, safeguarding against threats in remote environments.",
  },
  {
    title: "Mobile Device Protection",
    description:
      "Are employees using tablets or smartphones for work tasks effectively and efficiently in today's environment? We shield these mobile devices against unauthorized malware access, ensuring that your business data remains secure even on personal devices.",
  },
  {
    title: "BYOD Policy Enforcement",
    description:
      "Does your organization enable employees to utilize personal devices for work? Our expert team aids in enforcing security protocols on these devices, like encryption and remote wipe capabilities, to safeguard sensitive confidential data effectively.",
  },
  {
    title: "Cyber Threat Defense",
    description:
      "Are you worried about malware, phishing attacks, or ransomware targeting your organization? We fight back against the threat hard. With robust antivirus software and insightful detection tools, we spot, analyze, and tackle threats swiftly and efficiently.",
  },
  {
    title: "Compliance and Data Privacy",
    description:
      "Is your organization conditional to data protection laws and industry regulations? Our expertise assists you to adhere to these critical requirements by deploying robust encryption, comprehensive security policies, and strict access controls to effectively shield confidential information.",
  },
  {
    title: "Patch Management",
    description:
      "Are your devices updated with the latest security patches? Our meticulous patch management procedures ensure risks are fixed promptly to reduce cyber-attacks. By prioritizing timely updates, we safeguard your data and enhance overall system resilience against emerging threats.",
  },
  {
    title: "Threat Detection and Response",
    description:
      "Do you have real-time visibility into endpoint activities to identify and respond to security incidents effectively? Our continuous monitoring and incident response capabilities are the perfect answer to the impact of data breaches, ensuring proactive threat management and comprehensive protection.",
  },
  {
    title: "Device Encryption",
    description:
      "Are you concerned about the loss or theft of devices containing sensitive information? Our advanced endpoint security solutions effectively protect critical data on all devices, ensuring that even if lost or stolen, the data remains cryptographically inaccessible to unauthorized users.",
  },
];
const steps = [
  {
    title: "Inventory and Discovery",
    description:
      "Begin by conducting an inventory of all endpoints (devices) connected to your network, including computers, laptops, mobile devices, servers, and IoT devices. Discover and catalog important information about each endpoint, such as hardware specifications, operating systems, installed software, and network configurations.",
  },
  {
    title: "Security Configuration and Compliance",
    description:
      "Implement standardized security configurations across all endpoints to ensure compliance with organizational policies and industry regulations. Configure firewalls, antivirus software, encryption settings, and intrusion detection/prevention systems (IDS/IPS) to protect against cyber threats and unauthorized access.",
  },
  {
    title: "Patch Management and Software Updates",
    description:
      "Establish a robust patch management process to regularly update endpoint software, operating systems, and applications. Deploy patches and updates promptly to address security vulnerabilities and enhance endpoint security posture.",
  },
  {
    title: "Endpoint Monitoring and Incident Response",
    description:
      "Continuously monitor endpoints for security events, suspicious activities, and potential threats. Set up real-time alerts and automated incident response mechanisms to quickly contain, investigate, and remediate security incidents, minimizing their impact on your organization.",
  },
  {
    title: "Reporting and Continuous Improvement",
    description:
      "Generate detailed reports on endpoint security status, compliance, and incidents. Use these insights to assess the effectiveness of your endpoint management strategy, identify areas for improvement, and implement ongoing enhancements to strengthen your security posture.",
  },
];

const reasons = [
  {
    title: "Expertise and Experience",
    description:
      "Our team is composed of seasoned cybersecurity professionals with years of experience in endpoint protection.",
  },
  {
    title: "Comprehensive Protection",
    description:
      "We provide end-to-end security coverage for all your devices—desktops, laptops, mobile phones, and servers.",
  },
  {
    title: "Tailored to Your Needs",
    description:
      "We customize our services to fit your infrastructure, compliance needs, and workflow.",
  },
  {
    title: "24/7 Support and Monitoring",
    description:
      "Our dedicated support team is available around the clock to monitor your systems and respond to incidents.",
  },
  {
    title: "Proactive Threat Management",
    description:
      "We proactively hunt for vulnerabilities and suspicious activities to keep you ahead of cybercriminals.",
  },
  {
    title: "Easy Integration and Management",
    description:
      "Manage all your endpoints from a single, intuitive dashboard, reducing complexity and IT workload.",
  },
];

// gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

function MalwareAnalysis() {
  const [selected, setSelected] = useState("antivirus");

  const current = contents[selected];
  useEffect(() => {
    let ctxs = gsap.context(() => {
      const tla = gsap.timeline();
      tla.to(".about-page-fixed", {
        opacity: 0,
        duration: 0.5,
        display: "none",
        ease: "ease",
      });
    });
    return () => ctxs.revert();
  }, []);

  return (
    <div>
      <div className="content-endpoint-service">
        <div className="about-page-fixed"></div>
        <div className="servicepage-overall-container">
          <div className="ap-first-section sp-first-section ">
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
              <button className="service-title-tag about-title-tag">
                About EndPoint Service
              </button>
              <h1>
                EndPoint Security
                <br />
                <span>Let`s Secure Deep!</span>
              </h1>
              <p>
                XecureOne is your trusted cybersecurity partner — ideal for
                businesses seeking top-tier protection without an in-house
                security team. We specialize in safeguarding your digital
                landscape with cutting-edge solutions.{" "}
              </p>
            </div>
            <div className="btn">
              <div className="let-connect-btn">Let's Connect</div>
            </div>
          </div>

          <div className="sp-second-section service-second-section">
            <div className="sp-circle-bg-1"></div>

            <div className="about-service">
              <div className="card about-service-card">
                <div className="blur-circle circle1 whoweare-circle1"></div>
                {/* <div className="blur-circle circle2 whoweare-circle2"></div> */}
                <div className="blur-circle circle3 whoweare-circle3"></div>
              </div>
              <div className="aboutservice-content">
                <h3 className="sub-heading">
                  What is <span>endpoint security?</span>
                </h3>
                <div className="para-content">
                  <p>
                    Endpoint security is the practice of protecting devices such
                    as desktops, laptops, tablets, and mobile phones that
                    connect to a network from cyber threats. It involves
                    monitoring, detecting, and blocking malicious activities
                    that could compromise these devices and the data they
                    access. Modern endpoint security solutions use advanced
                    technologies like threat intelligence, behavioral analysis,
                    and machine learning to defend against evolving threats. By
                    securing endpoints, organizations can reduce the risk of
                    data breaches and ensure compliance with security policies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="main-bg header-tabs-section">
            {/* Tabs */}
            <div className="sp-circle-bg-2"></div>

            <div className="header-tabs">
              {tabs.map((tab) => (
                <div
                  className={`tab${
                    selected === tab.key ? " tab-selected" : ""
                  }`}
                  key={tab.key}
                  onClick={() => setSelected(tab.key)}
                >
                  {tab.label}
                </div>
              ))}
            </div>
            {/* Content */}
            <div className="content-section">
              <div className="content-sec-left">
                <h2 className="content-title">{current.title}</h2>
                <p className="content-subtitle">{current.subtitle}</p>
              </div>
              <div className="content-sec-right">
                <h3 className="features-title">
                  {current.highlight}
                  <span className="highlight">{current.highlightColor}</span>
                </h3>
                <div className="features-grid">
                  {current.features.map((f, i) => (
                    <div className="feature-card" key={i}>
                      <h4 className="feature-title">{f.head}</h4>
                      <p className="feature-desc">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="sp-third-section">
            <div className="sp-circle-bg-3"></div>
            <div className="sp-circle-bg-4"></div>
            <h2>
              Benefits Of <span>Endpoint Security</span>
            </h2>
            <div className="benefits-container">
              {benefits.map((benefit, index) => (
                <div className="benefit-card" key={index}>
                  <div className="circle-benefits-card"></div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sp-fourth-section">
        <div className="sp-circle-bg-5"></div>

          <div className="emn-section">
            <div className="heading">
              <h2>
                Determining The Need For Our{" "}
                <span>Endpoint Management Services</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis maxime reprehenderit provident omnis, voluptatibus
                quo ut aut, quidem praesentium, voluptatem porro quam labore
                similique tempora soluta? Incidunt at quas quisquam.
              </p>
            </div>

            <div className="emn-grid">
              {needs.map((need, idx) => (
                <div className="emn-card" key={idx}>
                  <h3>{need.title}</h3>
                  <p>{need.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sp-fifth-section">
          <div className="five-step-section">
            <div className="five-step-title">
              <p>5-Step Process for</p>
              <h2>Effective Endpoint Security</h2>
            </div>
            <div className="five-step-container">
              {steps.map((step, idx) => (
                <div
                  className={`five-step-card-wrapper ${
                    idx % 2 === 1 ? "right" : "left"
                  }`}
                  key={idx}
                >
                  <div className="five-step-card-all">
                    <div className="five-step-card">
                      <div className="five-step-card-desc">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                      <div className="five-step-number">
                        <span>{idx + 1}</span>
                      </div>
                    </div>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`five-step-connector ${
                        idx % 2 === 0 ? "to-right" : "to-left"
                      }`}
                    >
                      {/* <div className="progress-line"></div> */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sp-sixth-section">
        <div className="sp-circle-bg-6"></div>

          <div className="why-us-section">
            <h2 className="why-us-title">Why Our Service is Best ?</h2>
            <div className="why-us-grid">
              {reasons.map((reason, idx) => (
                <div className="why-us-card" key={idx}>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sp-seventh-section get-secured-now">
        <div className="sp-circle-bg-7"></div>
        
          <GetSecured />
        </div>
        <div className="last-section footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Transition(MalwareAnalysis);
