import { useEffect } from 'react';

import { debounce } from '../utils/debounce';

const useResizeObserver = (
  target: Element | HTMLElement | null | undefined,
  callback: () => void,
) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!target) {
      return;
    }

    let resizeObserverEntries: Array<ResizeObserverEntry> = [];

    let rAF: any;
    const rAFHandleResize = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        callback();
      });
    };
    const debounceHandleResize = debounce(callback);
    const containerWindow = target.ownerDocument.defaultView || window;
    containerWindow.addEventListener('resize', debounceHandleResize);
    let resizeObserver: ResizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        resizeObserverEntries = entries;

        const func =
          process.env.NODE_ENV === 'test' ? rAFHandleResize : callback;

        func();
      });
      resizeObserver.observe(target);
    }
    return () => {
      debounceHandleResize.clear();
      cancelAnimationFrame(rAF);
      containerWindow.removeEventListener('resize', debounceHandleResize);
      resizeObserverEntries.forEach((entry) => entry.target.remove());
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [target, callback]);
};

export default useResizeObserver;
