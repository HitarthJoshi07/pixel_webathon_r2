// src/hooks/useLenis.js
import { useEffect } from 'react';

export default function useLenis() {
  useEffect(() => {
    let lenis;

    const loadLenis = async () => {
      const { default: Lenis } = await import('@studio-freight/lenis');
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothWheel: true,
        smoothTouch: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    loadLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);
}
