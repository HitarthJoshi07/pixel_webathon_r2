import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    title: "Hyper Visuals",
    desc: "Cinematic-grade motion, interactive shaders & textures that leave a lasting impact.",
    icon: "/icons/visual.svg",
    video: `${import.meta.env.BASE_URL}videos/5.mp4`,
    from: { x: "-100vw" },
  },
  {
    title: "Immersive UX",
    desc: "Micro-interactions, transitions, and fluid navigation create a seamless journey.",
    icon: "/icons/ux.svg",
    video: `${import.meta.env.BASE_URL}videos/6.mp4`,
    from: { y: "100vh" },
  },
  {
    title: "Peak Performance",
    desc: "Fast-loading, GPU-accelerated WebGL and optimized assets for all devices.",
    icon: "/icons/performance.svg",
    video: `${import.meta.env.BASE_URL}videos/7.mp4`,
    from: { x: "100vw" },
  },
];

const FeaturesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      id="Features"
      className="relative z-10 w-full h-screen bg-black text-white px-6 py-20 overflow-hidden"
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold mb-16 text-center"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        Features
      </motion.h2>

      <motion.div
        className="flex gap-6 h-[60vh] overflow-visible justify-center items-stretch"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
          hidden: {},
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={{
              hidden: { ...feature.from, opacity: 0 },
              visible: {
                x: 0,
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            layout
            className="relative flex flex-col justify-end p-6 rounded-3xl overflow-hidden border border-white/10 bg-white/5 min-w-0 flex-1"
          >
            {/* Background Video */}
            <AnimatePresence>
              <motion.video
                key={`video-${index}`}
                src={feature.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 brightness-[1.3] contrast-[1.2]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-0 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <div className="w-14 h-14 mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-semibold mb-2 tracking-tight leading-snug">
                {feature.title}
              </h3>

              <p className="text-gray-300 leading-relaxed text-sm opacity-100">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
