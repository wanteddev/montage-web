'use client';

import lottie from 'lottie-web/build/player/lottie_light.min';
import { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import type { AnimationConfig } from 'lottie-web';
import type { ComponentPropsWithoutRef, MutableRefObject } from 'react';

/**
 * @deprecated packages/wds Loading을 사용해주세요.
 */
const Loading = forwardRef<
  HTMLDivElement,
  Pick<AnimationConfig<'svg'>, 'loop' | 'name'> &
    ComponentPropsWithoutRef<typeof Box<'div'>>
>(({ sx, loop, name, ...props }, forwardedRef) => {
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
        container: lottieRef.current,
        renderer: 'svg',
        loop: loop ?? true,
        autoplay: true,
        path: 'https://static.wanted.co.kr/lottie/loading_brand_new.json',
        name,
      });
    }

    return () => lottie.destroy();
  }, [loop, name]);

  return (
    <Box
      ref={composedRefs}
      {...props}
      sx={[{ margin: '0 auto', width: '135px', padding: '16px' }, sx]}
    />
  );
});

Loading.displayName = 'Loading';

export default memo(Loading);
