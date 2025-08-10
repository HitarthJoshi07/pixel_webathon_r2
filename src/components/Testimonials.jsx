import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const transition = { duration: 0.6, ease: [0.65, 0, 0.35, 1] };

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
};

const Testimonials = ({ testimonials }) => {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (dir) => {
    const newIndex = (index + dir + testimonials.length) % testimonials.length;
    setIndex([newIndex, dir]);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 7000);
    return () => clearInterval(timer);
  }, [index]);

  const { name, quote, company, image } = testimonials[index];

  return (
    <section
      id="Testimonials"
      className="relative py-32 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-black to-[#0c0c0c] text-center overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold mb-14 text-white tracking-wide"
      >
        What Our Learners Say
      </motion.h2>

      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="relative bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl px-8 py-12 text-white shadow-2xl"
          >
            {image && (
              <img
                src={image}
                alt={name}
                className="w-16 h-16 rounded-full mx-auto mb-6 object-cover border border-white/20 shadow-md"
              />
            )}

            <p className="italic text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-xl mx-auto">
              “{quote}”
            </p>

            <div className="font-semibold text-lg tracking-wide text-green-400">{name}</div>
            {company && (
              <div className="text-sm text-white/60 mt-1 font-medium tracking-wider uppercase">
                {company}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10">
          <button
            onClick={() => paginate(-1)}
            className="group p-2 rounded-full bg-white/5 hover:bg-white/10 transition text-white/70 hover:text-white backdrop-blur-xl"
          >
            <ChevronLeft size={26} />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10">
          <button
            onClick={() => paginate(1)}
            className="group p-2 rounded-full bg-white/5 hover:bg-white/10 transition text-white/70 hover:text-white backdrop-blur-xl"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
