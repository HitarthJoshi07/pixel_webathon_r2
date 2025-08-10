import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [splitText, setSplitText] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowParticles(true);
            setSplitText(true);
            setTimeout(onComplete, 1500);
          }, 300);
        }
        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letterVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
    exit: (i) => ({
      y: -50,
      opacity: 0,
      transition: { delay: i * 0.05, duration: 0.5 },
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >

      {showParticles && <Confetti width={windowSize.width} height={windowSize.height} />} 

      <div className="relative z-10 text-center">
        {!splitText ? (
          <motion.h1
            className="text-[12vw] font-extrabold uppercase tracking-widest text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            FINLEARN
          </motion.h1>
        ) : (
          <motion.div className="flex justify-center items-center">
            {"FINLEARN".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="text-[12vw] font-extrabold uppercase mx-1"
                custom={i}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        )}

        {!splitText && (
          <>
            <motion.div
              className="mt-6 w-64 h-2 bg-gray-700 rounded overflow-hidden mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-white"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
              />
            </motion.div>

            <motion.p className="mt-3 text-sm text-gray-400">
              Loading {progress}%
            </motion.p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Loader;
