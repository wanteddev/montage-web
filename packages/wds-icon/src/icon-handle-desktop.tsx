import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 데스크톱에서 요소를 옮길 때 사용합니다.
 * 키워드: Grabber, 그랩, 그래빙, 핸들러, 핸들, 옮기기
 * 속성: Outlined
 */
const IconHandleDesktop = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.3754 5.25C10.3754 4.2835 9.59195 3.5 8.62545 3.5C7.65896 3.5 6.87546 4.2835 6.87546 5.25C6.87546 6.2165 7.65896 7 8.62545 7C9.59195 7 10.3754 6.2165 10.3754 5.25Z"
        fill="currentColor"
      />
      <path
        d="M15.3754 17C16.3419 17 17.1254 17.7835 17.1254 18.75C17.1254 19.7165 16.3419 20.5 15.3754 20.5C14.4089 20.5 13.6254 19.7165 13.6254 18.75C13.6254 17.7835 14.4089 17 15.3754 17Z"
        fill="currentColor"
      />
      <path
        d="M17.1254 12C17.1254 11.0335 16.3419 10.25 15.3754 10.25C14.4089 10.25 13.6254 11.0335 13.6254 12C13.6254 12.9665 14.4089 13.75 15.3754 13.75C16.3419 13.75 17.1254 12.9665 17.1254 12Z"
        fill="currentColor"
      />
      <path
        d="M17.1254 5.25C17.1254 4.2835 16.3419 3.5 15.3754 3.5C14.4089 3.5 13.6254 4.2835 13.6254 5.25C13.6254 6.2165 14.4089 7 15.3754 7C16.3419 7 17.1254 6.2165 17.1254 5.25Z"
        fill="currentColor"
      />
      <path
        d="M8.62545 10.25C9.59195 10.25 10.3754 11.0335 10.3754 12C10.3754 12.9665 9.59195 13.75 8.62545 13.75C7.65896 13.75 6.87546 12.9665 6.87546 12C6.87546 11.0335 7.65896 10.25 8.62545 10.25Z"
        fill="currentColor"
      />
      <path
        d="M10.3754 18.75C10.3754 17.7835 9.59195 17 8.62545 17C7.65896 17 6.87546 17.7835 6.87546 18.75C6.87546 19.7165 7.65896 20.5 8.62545 20.5C9.59195 20.5 10.3754 19.7165 10.3754 18.75Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHandleDesktop;
