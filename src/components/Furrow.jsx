import React, { useState, useEffect, useRef } from 'react';
import './cursor.css';
import FeaturesSection from './FeaturesSection';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'; 
import Testimonials from './Testimonials';
import ContactForm from './ContactForm';
import { testimonials, pageVariants, exitOverlayVariants } from '../constants';
import useLenis from '../hooks/useLenis';
import FinalVideoScroll from './FinalRevealScroll';
// import TransitionScroll from './TransitionScroll';


import LearningModules from './LearningModules';
import Card from './Card';
import { Car } from 'lucide-react';

import SectionScroller from './SectionScroller';


const sections = ['Home', 'Features', 'Testimonials', 'Contact'];





const Furrow = () => {
  useLenis();
  const [darkMode, setDarkMode] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const canvasRef = useRef(null);
  const erasedPixelsRef = useRef(0);
  const fadeTriggeredRef = useRef(false);
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const heroRef = useRef(null);
  const titleRef = useRef();
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);



useEffect(() => {
  const canvas = canvasRef.current;
  const hero = heroRef.current;
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx || !hero) return;

  const resizeCanvas = () => {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-out";
    erasedPixelsRef.current = 0;
    fadeTriggeredRef.current = false;
    canvas.style.opacity = 1;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let lastX = null, lastY = null;
  const baseRadius = 50;

  const draw = (x, y) => {
    if (lastX === null || lastY === null) {
      lastX = x; lastY = y;
    }

    const dx = x - lastX, dy = y - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.ceil(distance / 5);

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const lerpX = lastX + dx * t;
      const lerpY = lastY + dy * t;

      for (let j = 0; j < 3; j++) {
        const offsetX = (Math.random() - 0.5) * 8;
        const offsetY = (Math.random() - 0.5) * 8;
        const radius = baseRadius + Math.random() * 8 - 4;
        const gradient = ctx.createRadialGradient(
          lerpX + offsetX, lerpY + offsetY, 0,
          lerpX + offsetX, lerpY + offsetY, radius
        );
        gradient.addColorStop(0, 'rgba(0,0,0,0.6)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(lerpX + offsetX, lerpY + offsetY, radius, 0, Math.PI * 2, false);
        ctx.fill();
        erasedPixelsRef.current += Math.PI * radius * radius;
      }
    }

    lastX = x; lastY = y;

    if (!fadeTriggeredRef.current) {
      const erased = erasedPixelsRef.current;
      const total = canvas.width * canvas.height;
      if (erased / total > 0.75) {
        fadeTriggeredRef.current = true;
        canvas.style.transition = "opacity 5s ease";
        canvas.style.opacity = 0;
      }
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      draw(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  };

  hero.addEventListener("mousemove", handleMouseMove);
  hero.addEventListener("touchmove", handleTouchMove, { passive: true });

  return () => {
    window.removeEventListener("resize", resizeCanvas);
    hero.removeEventListener("mousemove", handleMouseMove);
    hero.removeEventListener("touchmove", handleTouchMove);
  };
}, []);


  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="custom-cursor"></div>
      <AnimatePresence mode="wait">
        <motion.div
          key="page"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black z-[9999]"
            variants={exitOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          <div className="relative bg-white dark:bg-black text-white transition-colors duration-500 overflow-hidden">
            <nav className="fixed top-0 w-full p-6 flex justify-end space-x-6 z-50 bg-white/10 backdrop-blur-lg dark:bg-black/10">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => document.getElementById(s).scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-red-600 uppercase font-medium"
                >
                  {s}
                </button>
              ))}
              <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'Light' : 'Dark'}</button>
            </nav>

            <section id="Home" ref={heroRef} className="h-screen relative overflow-hidden flex items-center">
              <video
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/hero-1.mp4"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
              />
              <div className="relative inset-0 z-20 px-5 py-2 pt-25 text-white flex flex-col justify-center h-full pointer-events-none">
                {/* <motion.h1
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100, transition: { duration: 0.8 } }}
                  className="text-[18vw] sm:text-[16vw] md:text-[12vw] font-black uppercase leading-none tracking-tight"
                > */}
                
              <motion.h1
                  ref={titleRef}
                  style={{ scale, opacity }}
                  className="text-[18vw] sm:text-[16vw] md:text-[12vw] font-black uppercase leading-none tracking-tight"
                >
                DIG<br />DEEP
              </motion.h1>
               <br /><h6 className="absolute z-85 pt-120 px-10 justify-center text-[2vw] tracking-wide font-extrabold ">Hoveer your mouse</h6>
            
                </div>
             </section>

            <FinalVideoScroll />

           
            <section>
                <FeaturesSection animateCards={isInView} ref={featuresRef} />
            </section>

           
            {/* <TransitionScroll /> */}

      
              <section>
                <Testimonials testimonials={testimonials} />
              </section>
              <section>
                  <LearningModules />
              </section>
          

           
            {/* the hovering Card to contact  */}
   <section
  aria-label="Featured profile card"
  style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "4rem 1rem",
    background: "radial-gradient(circle at center, #121212, #0a0a0a 80%)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Decorative subtle floating circles */}
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      top: "10%",
      left: "5%",
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(62,255,62,0.3) 0%, transparent 70%)",
      animation: "floatUpDown 8s ease-in-out infinite",
      filter: "blur(12px)",
      zIndex: 0,
    }}
  />
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      bottom: "15%",
      right: "10%",
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(62,255,62,0.25) 0%, transparent 70%)",
      animation: "floatUpDown 10s ease-in-out infinite alternate",
      filter: "blur(8px)",
      zIndex: 0,
      animationDelay: "3s",
    }}
  />

  {/* Animated entrance wrapper */}
  <div
    style={{
      zIndex: 1,
      maxWidth: "700px",
      width: "100%",
      animation: "fadeSlideIn 1s ease forwards",
      opacity: 0,
      transform: "translateY(30px)",
    }}
    className="animated-section-wrapper"
  >
    <Card />
  </div>

  {/* Modules button */}
  <button
    aria-label="Modules button"
    style={{
      position: "absolute",
      right: "2rem",
      top: "50%",
      transform: "translateY(-50%) translateX(-10%)",
      backgroundColor: "#22c55e", // Tailwind green-500
      color: "white",
      padding: "0.5rem 1.5rem",
      borderRadius: "0.5rem",
      fontWeight: "600",
      boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      zIndex: 2,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")} // green-600 hover
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#22c55e")}
  >
    Modules
  </button>

  <style>{`
    @keyframes fadeSlideIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes floatUpDown {
      0%, 100% {
        transform: translateY(0);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-20px);
        opacity: 1;
      }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      section {
        padding: 3rem 1rem;
      }
      .animated-section-wrapper {
        max-width: 90vw;
      }
    }
  `}</style>
</section>


          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Furrow;
