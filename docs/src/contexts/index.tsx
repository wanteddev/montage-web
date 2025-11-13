'use client';
import { usePathname } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';

import type { PropsWithChildren } from 'react';

type RouteContextType = {
  listeners: Set<() => void>;
  addListenerOnce: (listener: () => void) => void;
};

export const RouteContext = createContext<RouteContextType>({
  listeners: new Set(),
  addListenerOnce: () => {},
});

export const useRouteContext = () => useContext(RouteContext);

export const RouteContextProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const listenersRef = useRef<Set<() => void>>(new Set());

  useEffect(() => {
    listenersRef.current.forEach((listener) => listener());
    listenersRef.current.clear();
  }, [pathname]);

  const addListenerOnce = useCallback((listener: () => void) => {
    listenersRef.current.add(listener);
  }, []);

  return (
    <RouteContext.Provider
      value={{ listeners: listenersRef.current, addListenerOnce }}
    >
      {children}
    </RouteContext.Provider>
  );
};
