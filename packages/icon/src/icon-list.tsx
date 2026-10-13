import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 리스트로 표시할 때 사용합니다.
 * 키워드: 불릿 리스트, Unordered List, Bullet List
 * 속성: Outlined
 */
const IconList = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.74951 7C4.43986 7 4.9995 6.44036 4.9995 5.75C4.9995 5.05964 4.43986 4.5 3.74951 4.5C3.05915 4.5 2.49951 5.05964 2.49951 5.75C2.49951 6.44036 3.05915 7 3.74951 7Z"
        fill="currentColor"
      />
      <path
        d="M7.34962 5.75C7.34962 5.25294 7.75256 4.85 8.24962 4.85H20.2496C20.7466 4.85 21.1496 5.25294 21.1496 5.75C21.1496 6.24706 20.7466 6.65 20.2496 6.65H8.24962C7.75256 6.65 7.34962 6.24706 7.34962 5.75Z"
        fill="currentColor"
      />
      <path
        d="M3.74951 13.25C4.43986 13.25 4.9995 12.6904 4.9995 12C4.9995 11.3096 4.43986 10.75 3.74951 10.75C3.05915 10.75 2.49951 11.3096 2.49951 12C2.49951 12.6904 3.05915 13.25 3.74951 13.25Z"
        fill="currentColor"
      />
      <path
        d="M7.34962 12C7.34962 11.5029 7.75256 11.1 8.24962 11.1H20.2496C20.7466 11.1 21.1496 11.5029 21.1496 12C21.1496 12.4971 20.7466 12.9 20.2496 12.9H8.24962C7.75256 12.9 7.34962 12.4971 7.34962 12Z"
        fill="currentColor"
      />
      <path
        d="M3.74951 19.5C4.43986 19.5 4.9995 18.9404 4.9995 18.25C4.9995 17.5596 4.43986 17 3.74951 17C3.05915 17 2.49951 17.5596 2.49951 18.25C2.49951 18.9404 3.05915 19.5 3.74951 19.5Z"
        fill="currentColor"
      />
      <path
        d="M8.24962 17.35C7.75256 17.35 7.34962 17.7529 7.34962 18.25C7.34962 18.7471 7.75256 19.15 8.24962 19.15H20.2496C20.7466 19.15 21.1496 18.7471 21.1496 18.25C21.1496 17.7529 20.7466 17.35 20.2496 17.35H8.24962Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconList;
