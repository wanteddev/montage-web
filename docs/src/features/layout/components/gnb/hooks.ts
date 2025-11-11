import { useEffect, useState } from 'react';

export const useSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: false });

    return () =>
      window.removeEventListener('keydown', handleKeyDown, { capture: false });
  }, [setIsOpen]);

  return {
    isOpen,
    handleOpen,
    handleOpenChange,
  };
};
