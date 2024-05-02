'use client';

import lottie from 'lottie-web/build/player/lottie_light.min';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import type { AnimationConfig } from 'lottie-web';
import type { ComponentPropsWithoutRef, MutableRefObject } from 'react';

const Loading = forwardRef<
  HTMLDivElement,
  Omit<AnimationConfig<'svg'>, 'renderer' | 'container' | 'path'> &
    ComponentPropsWithoutRef<typeof Box<'div'>>
>((props, forwardedRef) => {
  const lottieRef = useRef<HTMLDivElement>(null);

  const composedRefs = useCallback(
    (node: HTMLDivElement) => {
      (lottieRef as MutableRefObject<HTMLDivElement>).current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef !== null) {
        (forwardedRef as MutableRefObject<HTMLDivElement>).current = node;
      }
    },
    [forwardedRef],
  );

  useEffect(() => {
    if (lottieRef.current) {
      lottie.loadAnimation({
        // @ts-ignore
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://static.wanted.co.kr/lottie/loading_brand_new.json',
        ...props,
      });
    }

    return () => lottie.destroy();
  }, [props]);

  return (
    <Box
      ref={composedRefs}
      {...props}
      sx={[{ margin: '0 auto', width: '135px', padding: '16px' }, props.sx]}
    />
  );
});

Loading.displayName = 'Loading';

export default Loading;
