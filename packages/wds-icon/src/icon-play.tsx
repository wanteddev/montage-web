import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 콘텐츠를 재생할 때 사용합니다.
 * 키워드: 플레이, Play, Resume, 재생
 * 속성: Outlined
 */
const IconPlay = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M10.8337 18.6304C9.25042 19.5705 8.45879 20.0405 7.80792 19.9777C7.24033 19.923 6.72311 19.6285 6.38625 19.1684C5.99997 18.6408 5.99997 17.7202 5.99997 15.8789V8.12198C5.99997 6.28067 5.99997 5.36001 6.38625 4.83241C6.72311 4.37232 7.24033 4.07789 7.80792 4.02314C8.45879 3.96035 9.25042 4.43038 10.8337 5.37045L17.3658 9.24889C18.8922 10.1552 19.6554 10.6084 19.9135 11.1959C20.1388 11.7086 20.1388 12.2923 19.9135 12.805C19.6554 13.3925 18.8922 13.8457 17.3658 14.752L10.8337 18.6304Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlay;
