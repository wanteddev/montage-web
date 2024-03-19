'use client';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { usePathname } from 'next/navigation';
import { createContext, useContext } from 'react';

import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

const MobileMenuContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({ open: false, setOpen: () => '' });

export const useMobileMenuContext = () => useContext(MobileMenuContext);
export const MobileMenuProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const pathname = usePathname();

  useEffect(() => {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }

    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      `(min-width: ${theme.breakpoint.md})`,
    );

    const handleChange = () => {
      setOpen((prev) => (prev ? !mediaQueryList.matches : false));
    };

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [theme.breakpoint.md]);

  return (
    <MobileMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
};
