import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionScroller = ({ children }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(wrapperRef.current.querySelectorAll("section"));

      gsap.to(sections, {
        yPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 1.2,
            ease: "power1.inOut",
          },
          end: () => "+=" + wrapperRef.current.offsetHeight,
        },
      });
    }, wrapperRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "100vh", overflow: "hidden" }}>
      {children}
    </div>
  );
};

export default SectionScroller;
