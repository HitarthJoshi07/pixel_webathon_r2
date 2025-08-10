// hooks/useCursor.js
import { useEffect } from "react";

export default function useCursor() {
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const move = e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
}
