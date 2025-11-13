import lottie from 'lottie-web/build/player/lottie_light.min';
import { forwardRef, memo, useCallback, useEffect, useRef } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import type { AnimationConfig, AnimationItem } from 'lottie-web';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * @deprecated use `@wanteddev/wds` Loading instead
 */
const Loading = memo(
  forwardRef<
    HTMLDivElement,
    Pick<AnimationConfig<'svg'>, 'loop' | 'name'> &
      ComponentPropsWithoutRef<typeof Box<'div'>>
  >(({ sx, loop, name, ...props }, forwardedRef) => {
    const lottieRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);

    const composedRefs = useComposedRefs(forwardedRef, lottieRef);

    const loadAnimation = useCallback(() => {
      animationRef.current = lottie.loadAnimation({
        container: lottieRef.current!,
        renderer: 'svg',
        loop: loop ?? true,
        autoplay: true,
        path: 'https://static.wanted.co.kr/lottie/loading_brand_new.json',
        name,
      });
    }, [loop, name]);

    useEffect(() => {
      if (lottieRef.current) {
        loadAnimation();
      }

      return () => animationRef.current?.destroy();
    }, [loadAnimation]);

    return (
      <Box
        ref={composedRefs}
        role="status"
        aria-label="Loading..."
        {...props}
        sx={[{ margin: '0 auto', width: '135px', padding: '16px' }, sx]}
      />
    );
  }),
);

Loading.displayName = 'Loading';

export default Loading;
