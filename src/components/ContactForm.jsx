import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      staggerChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ContactForm = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <section
      id="Contact"
      className="relative py-32 px-6 md:px-10 bg-black text-white overflow-hidden"
    >
      {/* Accent background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-red-500 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ delay: 0.6, duration: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-red-400 rounded-full blur-3xl"
      />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center text-[7vw] md:text-5xl font-black uppercase tracking-tight mb-16"
      >
        Let’s Connect
      </motion.h2>

      <motion.form
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-3xl mx-auto grid gap-6 p-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl"
      >
        <motion.input
          variants={itemVariants}
          type="text"
          placeholder="Name"
          className="w-full p-4 bg-transparent border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
        <motion.input
          variants={itemVariants}
          type="email"
          placeholder="Email"
          className="w-full p-4 bg-transparent border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
        <motion.textarea
          variants={itemVariants}
          rows="5"
          placeholder="Message"
          className="w-full p-4 bg-transparent border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
        <motion.button
          variants={itemVariants}
          className="mt-4 py-3 px-8 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
};

export default ContactForm;
