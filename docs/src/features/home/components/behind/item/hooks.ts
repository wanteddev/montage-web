import { useCallback, useEffect, useRef, useState } from 'react';

export const useCursor = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const thumbnailRef = useRef<HTMLImageElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseEnter = useCallback(() => {
    setIsMouseOver(true);

    glassRef.current?.parentElement?.style.setProperty('cursor', 'none');
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseOver(false);

    glassRef.current?.parentElement?.style.removeProperty('cursor');
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!thumbnailRef.current || !glassRef.current) return;

      const glassRect = glassRef.current.clientWidth / 2;

      const rect = thumbnailRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - glassRect;
      const mouseY = e.clientY - rect.top - glassRect;

      setPosition({
        x: mouseX,
        y: mouseY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return {
    handleMouseEnter,
    handleMouseLeave,
    position,
    isMouseOver,
    thumbnailRef,
    glassRef,
  };
};
