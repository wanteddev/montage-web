import { useEffect } from 'react';

import { debounce } from '../../utils/internal/debounce';

const useResizeObserver = (
  target: Element | HTMLElement | null | undefined,
  callback: () => void,
) => {
  useEffect(() => {
    if (!target) {
      return;
    }

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
      resizeObserver = new ResizeObserver(() => {
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
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (resizeObserver) {
        resizeObserver.unobserve(target);
        resizeObserver.disconnect();
      }
    };
  }, [target, callback]);
};

export default useResizeObserver;
