
import React, { useEffect, useRef } from 'react';
import "../Styles/Bg.css";

function InteractiveBubble() {

    const bubbleRef = useRef(null);

    useEffect(() => {
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        const move = () => {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            if (bubbleRef.current) {
                bubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(move);
        };

        const handleMouseMove = (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        move();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div>
                    <div class="gradient-bg">
                        <svg xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                        </svg>
                        <div class="gradients-container">
                        <div class="g1"></div>
                        <div class="g2"></div>
                        {/* <div class="g3"></div>
                        <div class="g4"></div>
                        <div class="g5"></div> */}
                        <div class="interactive"  ref={bubbleRef}></div>
                        </div>
                    </div>
        </div>
    );
}

export default InteractiveBubble;
