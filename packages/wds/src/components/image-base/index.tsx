import { forwardRef, useEffect, useRef } from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { loadImage } from './helpers';

import type { ImageBaseProps } from './types';
import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';

const ImageBase = forwardRef<
  HTMLImageElement,
  DefaultComponentPropsInternal<ImageBaseProps>
>(({ src, onError, onLoad, onAbort, ...props }, forwardedRef) => {
  const ref = useRef<HTMLImageElement>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const composedRefs = useComposedRefs(ref, forwardedRef);

  useEffect(() => {
    if (!src) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const abortController = abortControllerRef.current;

    // https://github.com/facebook/react/issues/15446
    loadImage(src, abortController.signal)
      .then(() => {
        onLoad?.();
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          onAbort?.();
        } else {
          onError?.();
        }
      });

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return <img ref={composedRefs} src={src} {...props} />;
});

ImageBase.displayName = 'ImageBase';

export { ImageBase };

export type { ImageBaseProps };
