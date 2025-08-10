    // export const testimonials = [
    //   { name: "Alice", quote: "This studio redefined my brand!" },
    //   { name: "Bob", quote: "They captured exactly what I envisioned." },
    //   { name: "Charlie", quote: "An immersive, elegant experience." },
    // ];
export const testimonials = [
  {
    name: "Jane Doe",
    quote: "FinLearn absolutely nailed our brand. The features are world-class!",
    company: "Creative Corp",
    
  },
  {
    name: "John Smith",
    quote: "Truly visionary idea. Every detail reflects their innovation.",
    company: "Visionary Labs",
    
  },
  // More...
];




export const pageVariants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

export const exitOverlayVariants = {
  initial: { scaleY: 0 },
  animate: { scaleY: 0 },
  exit: {
    scaleY: 1,
    originY: 0,
    transition: { duration: 1, ease: [0.77, 0, 0.175, 1] },
  },
};
