import { useEffect, useState } from 'react';

export type UseTransitionStatusParams = {
  duration?: number;
  open?: boolean;
};

export type TransitionStatus = 'unmounted' | 'initial' | 'open' | 'close';

const useTransitionStatus = ({
  duration = 250,
  open = false,
}: UseTransitionStatusParams): {
  hasExited: boolean;
  status: TransitionStatus;
} => {
  const [status, setStatus] = useState<TransitionStatus>('initial');
  const hasExited = !useDelayUnmount(open, duration);

  if (!hasExited && status === 'close') {
    setStatus('unmounted');
  }

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('close');
      return;
    }

    setStatus('initial');

    const rAF = requestAnimationFrame(() => {
      setStatus('open');
    });

    return () => {
      cancelAnimationFrame(rAF);
    };
  }, [open, duration]);

  return {
    hasExited,
    status,
  };
};

export default useTransitionStatus;

const useDelayUnmount = (open: boolean, durationMs: number): boolean => {
  const [isMounted, setIsMounted] = useState(open);

  if (open && !isMounted) {
    setIsMounted(true);
  }

  useEffect(() => {
    if (!open && isMounted) {
      const timeout = setTimeout(() => setIsMounted(false), durationMs);
      return () => clearTimeout(timeout);
    }
  }, [open, isMounted, durationMs]);

  return isMounted;
};
