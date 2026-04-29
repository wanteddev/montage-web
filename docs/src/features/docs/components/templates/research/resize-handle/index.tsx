'use client';
import { Box } from '@wanteddev/wds';

import { handleGripStyle, handleStyle } from './style';

type Props = {
  width: number;
  minWidth: number;
  maxWidth: number;
  onWidthChange: (width: number) => void;
};

const ResizeHandle = ({ width, minWidth, maxWidth, onWidthChange }: Props) => {
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    const startX = event.clientX;
    const startWidth = width;

    const handleMove = (moveEvent: MouseEvent) => {
      const delta = (moveEvent.clientX - startX) * 2;
      const next = Math.max(minWidth, Math.min(maxWidth, startWidth + delta));
      onWidthChange(next);
    };

    const handleUp = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  };

  return (
    <Box
      role="separator"
      aria-orientation="vertical"
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
      aria-valuenow={width}
      onMouseDown={handleMouseDown}
      sx={handleStyle(width)}
    >
      <Box sx={handleGripStyle} />
    </Box>
  );
};

export default ResizeHandle;
