import { useRef } from 'react';

const useThrottle = <T extends (...args: Array<any>) => any>(
  func: T,
  interval = 500,
) => {
  const timeoutRef = useRef(0);
  const lastUpdated = useRef<number | null>(Date.now());

  const throttle = (...args: Parameters<T>) => {
    const now = Date.now();

    const throttled = () => {
      func.apply(this, args);
    };

    clearTimeout(timeoutRef.current);

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      throttled();
    } else {
      timeoutRef.current = window.setTimeout(throttled, interval);
    }
  };

  return throttle;
};

export default useThrottle;
