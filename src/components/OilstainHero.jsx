import React, { useEffect, useState, useRef ,useMemo} from "react";
import { AnimatePresence, motion, useMotionValue, useTransform,useScroll, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import RevealImageScroll from "./RevealImageScroll";
import RevealSection from './RevealImageScroll';
import ChatBot from "./ChatBot";
import Card from "./Card";


// Images
const galleryImages = [
 "https://wealthandfinance.digital/wp-content/uploads/2021/07/Fintech-Banking.jpg",
  "https://t4.ftcdn.net/jpg/00/79/93/51/360_F_79935155_pvN2FCv0qgUntgpLKL7JskhS19LKuavZ.jpg",
  "https://media.geeksforgeeks.org/wp-content/uploads/20230615110137/Finance-Landing-page-copy.webp",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSyEF0W_9tarI0TH_qLDbqrqoqfIOoLUTP3w&s", // Replace these with your own

];

 
export function MachineSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const machineImages = [
  "https://www.tripwire.com/sites/default/files/2023-10/uk-finance-reports-slight-decrease-in-fintech-cyberattacks.jpg",
  "https://images.unsplash.com/photo-1628519592419-bf288f08cef5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BvcnRzJTIwY2FyfGVufDB8fDB8fHww",
  "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
  "https://cdn.wallpapersafari.com/52/12/XBTWd7.jpg",
  "https://www.pexels.com/photo/black-car-305070/",
  "https://www.pexels.com/photo/photo-of-audi-parked-near-trees-1402787/",
];

  const imageIndex = useTransform(scrollYProgress, [0, 5], [0, machineImages.length - 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white h-[110vh] px-6 md:px-20 overflow-hidden"
    >
      {/* === Background Title === */}
      <motion.h2
        className="absolute top-[20%] left-0 right-0 text-center md:text-left text-[15vw] font-bold leading-none z-10 text-white mix-blend-difference pointer-events-none px-4 md:px-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        NEW BEGINNING
      </motion.h2>

      {/* === Content Container === */}
      <div className="sticky top-0 h-screen flex flex-col justify-end max-w-7xl mx-auto">

        {/* === Section Description === */}
        <header className="mb-16 max-w-xl relative z-20">
          <motion.p
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
          Begin your fintech journey by identifying a real-world financial problem and exploring how technology can solve it.
Start small, test often, and let user feedback guide your growth
          </motion.p>
        </header>

        {/* === Scroll-Synced Image Showcase === */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden z-20">
          {machineImages.map((src, i) => {
            const opacity = useTransform(imageIndex, (v) =>
              Math.round(v) === i ? 1 : 0
            );
            const scale = useTransform(imageIndex, (v) =>
              Math.round(v) === i ? 1 : 0.95
            );

            return (
              <motion.img
                key={i}
                src={src}
                alt={`Machine ${i + 1}`}
                draggable={false}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl transition-all duration-700"
                style={{ opacity, scale }}
              />
            );
          })}
        </div>
      </div>

      {/* === Extra Space to Allow Scroll === */}
      <div className="h-[1vh]" />
    </section>
  );
}



const pageVariants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -60, transition: { duration: 0.5 } },
};

const fade = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8 },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};


const OilstainPage = () => {
  const [index, setIndex] = useState(-1);
 
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

 

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="oilstain"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-black text-white overflow-x-hidden"
      >
        {/* HERO */}
        <section>
          <ChatBot />
        </section>

      

        {/* MISSION */}
        <section className="bg-[#0c0c0c] text-white py-24 px-6 md:px-16 overflow-hidden relative">
  {/* Decorative glow effect */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 left-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-2000"></div>
  </div>

  <motion.div
    variants={{ show: { transition: { staggerChildren: 0.2 } } }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="max-w-5xl mx-auto relative z-10"
  >
    <motion.h2
      variants={fadeInUp}
      className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-green-400 via-teal-300 to-blue-400 bg-clip-text text-transparent"
    >
      The Mission
    </motion.h2>

    <motion.p
      variants={fadeInUp}
      className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-3xl"
    >
      <span className="text-green-400 font-semibold">FinLearn</span> is an
      interactive financial literacy portal designed for students to explore,
      learn, and apply money management skills through engaging modules,
      real-world simulations, and gamified challenges — preparing them for
      confident and informed financial decisions.
    </motion.p>

    <motion.div
      variants={fadeInUp}
      className="mt-10 overflow-hidden rounded-xl shadow-2xl border border-white/10 hover:border-green-400/40 transition-all duration-500"
    >
      
    </motion.div>
  </motion.div>
</section>




        <div>
        
    </div>
        {/* MACHINE */}
           <MachineSection />

           
           

        {/* GALLERY */}
        <section className="bg-[#0a0a0a] py-24 px-6 md:px-20 text-white">
  <h2
    className="text-4xl md:text-6xl font-bold mb-12 opacity-0 translate-y-4 animate-fadeInUp"
  >
    Gallery
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {galleryImages.map((src, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-lg cursor-pointer group relative"
        onClick={() => setIndex(i)}
      >
        <img
          src={src}
          alt={`Gallery Image ${i + 1}`}
          className="w-full h-48 md:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        {/* Optional hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    ))}
  </div>

  <Lightbox
    open={index >= 0}
    index={index}
    close={() => setIndex(-1)}
    slides={galleryImages.map((src, i) => ({ src, alt: `Gallery Image ${i + 1}` }))}
    animation={{ fade: 300, swipe: 400 }}
    render={{ slide: ({ slide }) => <img src={slide.src} alt={slide.alt} /> }}
  />

  {/* Animation styles */}
  <style>{`
    @keyframes fadeInUp {
      0% { opacity: 0; transform: translateY(16px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease forwards;
      animation-delay: 0.2s;
    }
  `}</style>
</section>

         
        

      </motion.main>
    </AnimatePresence>
  );
};

export default OilstainPage;
