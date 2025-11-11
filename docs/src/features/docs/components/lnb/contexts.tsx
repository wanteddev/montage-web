'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createContext, useContext } from 'react';

import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

const LnbContext = createContext<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}>({ open: false, setOpen: () => '' });

export const useLnbContext = () => useContext(LnbContext);

export const LnbProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(min-width: 1200px)`);

    const handleChange = () => {
      setOpen((prev) => (prev ? !mediaQueryList.matches : false));
    };

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, []);

  return (
    <LnbContext.Provider value={{ open, setOpen }}>
      {children}
    </LnbContext.Provider>
  );
};
