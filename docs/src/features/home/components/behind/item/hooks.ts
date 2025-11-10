import { useCallback, useEffect, useRef, useState } from 'react';

export const useCursor = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const thumbnailRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    backgroundX: 0,
    backgroundY: 0,
  });

  const handleMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!thumbnailRef.current || !glassRef.current) return;

      const glassRect = glassRef.current.clientWidth / 2;

      const rect = thumbnailRef.current.getBoundingClientRect();

      const mouseX = e.clientX - rect.left - glassRect;
      const mouseY = e.clientY - rect.top - glassRect;

      // glass effect 내부의 배경 이미지를 반대 방향으로 이동시켜서
      // 실제 배경 이미지와 일치하도록 함 (돋보기 효과)
      const backgroundX = -mouseX;
      const backgroundY = -mouseY;

      setPosition({
        x: mouseX,
        y: mouseY,
        backgroundX,
        backgroundY,
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
