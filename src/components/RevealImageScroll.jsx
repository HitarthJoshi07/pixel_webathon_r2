import React, { useEffect, useRef, useState } from "react";

const RevealSection = () => {
  const sectionRef = useRef(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [circleComplete, setCircleComplete] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const baseRadius = 40;
  const maxRadius = 1000;

  const texts = [
    "What began as a whisper through a keyhole now stands fully revealed.",
    "Curiosity isn't weakness — it's the gateway to the extraordinary.",
    "The unknown transforms into the familiar as you move forward.",
    "Every detail you uncover adds a new layer to the journey.",
    "And now, you are part of the infinite expanse."
  ];

  const easeInOutExpo = (t) =>
    t === 0 ? 0 : t === 1 ? 1 : t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2;

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visibleTop = Math.max(0, windowHeight - rect.top);
      const rawRatio = Math.min(visibleTop / rect.height, 1);
      const easedRatio = easeInOutExpo(rawRatio);

      setScrollRatio(easedRatio);

      const currentRadius = baseRadius + easedRatio * (maxRadius - baseRadius);
      const isComplete = currentRadius >= maxRadius - 10;
      setCircleComplete(isComplete);

      // After zoom complete → change text every 100px scroll
      if (isComplete) {
        const scrollOffset = Math.abs(rect.top);
        const index = Math.floor(scrollOffset / 100);
        setTextIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = baseRadius + scrollRatio * (maxRadius - baseRadius);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[150vh] bg-black text-white overflow-hidden font-sans"
    >
      {/* === Background Layer === */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
        alt="space"
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm transition-transform duration-1000"
        style={{ transform: `translateY(-${scrollRatio * 60}px)` }}
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] z-0" />

      {/* === Circle Reveal Mask === */}
      {!circleComplete && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-all duration-300 ease-out"
          style={{
            clipPath: `circle(${radius}px at center)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            alt="clear space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}

      {/* === Glow Ring === */}
      {!circleComplete && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full border-2 border-white/10 blur-2xl opacity-70 transition-all duration-300 ease-out"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
            }}
          />
        </div>
      )}

      {/* === Text on Top === */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center h-full p-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-xl">
          PEEK INTO THE BEYOND
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-xl drop-shadow">
          You're peering into the unknown. Keep scrolling and step through.
        </p>
      </div>

      {/* === Sticky Layout After Reveal === */}
      {circleComplete && (
        <div className="absolute inset-0 flex z-40">
          {/* Left: Sticky Image */}
          <div className="w-[60%] h-screen sticky top-0">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
              alt="post reveal"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Fixed Height Description That Changes on Scroll */}
          <div className="w-[40%] bg-white text-black flex items-center justify-center px-10">
            <div
              style={{ height: "500px" }}
              className="flex items-center transition-opacity duration-500"
            >
              <p className="text-lg leading-relaxed">
                {texts[textIndex % texts.length]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* === Grain Overlay === */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10 mix-blend-overlay" />
    </section>
  );
};

export default RevealSection;
