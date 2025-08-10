import React, { useState } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPageFinal from './Pages/ContactPageFinal';
import VsptPage from './Pages/VsptPage';
import Endpointsecurity from './Pages/Endpointsecurity';
import NextGenerationPage from './Pages/NextGenerationPage';
import Emailsecurity from './Pages/Emailsecurity';
import MalwareAnalysis from './Pages/MalwareAnalysis';
import Header from './Components/Header';
import Intro from './Components/Intro'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-datepicker/dist/react-datepicker.css';

function WebsiteRouter() {
   const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div> 
           

            <div className="head">
              <Header />
            </div>
      
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPageFinal />} />
                <Route path="/vspt" element={<VsptPage />} />
                <Route path="/EndpointSecurity" element={<Endpointsecurity />} />
                <Route path="/NextGenerationFirewall" element={<NextGenerationPage />} />
                <Route path="/EmailSecurity" element={<Emailsecurity />} />
                <Route path="/MalwareAnalysis" element={<MalwareAnalysis />} />   
              </Routes>
            </AnimatePresence>
    
    </div>
  );
}

export default WebsiteRouter;