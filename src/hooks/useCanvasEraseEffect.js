// hooks/useCanvasEraseEffect.js
import { useEffect, useRef } from 'react';

export default function useCanvasEraseEffect(canvasRef) {
  const erasedPixelsRef = useRef(0);
  const fadeTriggeredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "destination-out";
      canvas.style.opacity = 1;
      erasedPixelsRef.current = 0;
      fadeTriggeredRef.current = false;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (x, y) => { /* same drawing logic */ };
    const mouseMove = (e) => draw(e.clientX, e.clientY);
    const touchMove = (e) => e.touches?.length && draw(e.touches[0].clientX, e.touches[0].clientY);

    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("touchmove", touchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", mouseMove);
      canvas.removeEventListener("touchmove", touchMove);
    };
  }, []);
}
