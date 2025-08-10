import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import frames from "./framesData";

gsap.registerPlugin(ScrollTrigger);

const FinalVideoScroll = () => {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [renderedFrameIndex, setRenderedFrameIndex] = useState(0);

  useEffect(() => {
    let loaded = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === frames.length) {
          setIsLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const obj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=5000",
        scrub: true,
        pin: true,
      },
    });

    // Animate text words
    tl.to(".animated-word", {
      opacity: 1,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      ease: "power2.inOut",
      stagger: 0.02,
    });

    // Expand mask circle to full screen
    tl.to(
      maskRef.current,
      {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "power2.inOut",
      },
      "+=0.5"
    );

    // Play frames
    tl.to(obj, {
      frame: frames.length - 1,
      ease: "none",
      onUpdate: () => {
        setRenderedFrameIndex(Math.round(obj.frame));
      },
    });

    return () => {
      ScrollTrigger.kill();
    };
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
        Loading video...
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/grid.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for darkening background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      />

      {/* Text */}
      <div
        className="animated-title text-center text-[40px] font-bold mb-10 text-white relative z-10"
        style={{ perspective: "1000px" }}
      >
        {"Gateway to smarter finance and wealth ...."
          .split(" ")
          .map((word, idx) => (
            <span
              key={idx}
              className="animated-word opacity-0 inline-block mx-1 transform translate-y-5 rotate-y-12"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word}
            </span>
          ))}
      </div>

      {/* Mask container */}
      <div
        ref={maskRef}
        className="mask-clip-path relative overflow-hidden flex items-center justify-center"
        style={{
          width: "60vw",
          height: "60vh",
          borderRadius: "50%",
          transition: "border-radius 0.3s",
          zIndex: 10,
        }}
      >
        {/* Frame-by-frame images */}
        <img
          src={frames[renderedFrameIndex]}
          alt={`Frame ${renderedFrameIndex + 1}`}
          className="object-contain"
          style={{
            width: "80%",
            height: "80%",
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      </div>
    </section>
  );
};

export default FinalVideoScroll;
