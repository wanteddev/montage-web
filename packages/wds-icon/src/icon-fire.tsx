import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 불꽃을 표현합니다.
 * 키워드: Featured, Hot, 인기
 * 속성: Outlined
 */
const IconFire = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.49937 15.1002C8.49937 17.0002 10.0494 18.5002 11.9994 18.5002C13.9494 18.5002 15.4994 17.0002 15.4994 15.1002C15.4994 13.2002 13.9494 11.7002 11.9994 10.0002C10.0494 11.7002 8.49937 13.2002 8.49937 15.1002Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2641 1.83176C13.505 1.13309 12.3106 1.30634 11.7664 2.16348L8.81015 6.81953L8.11057 6.1899C7.4877 5.62932 6.4875 5.60057 5.85929 6.26259C3.96077 8.26325 2.84937 10.8751 2.84937 13.6006C2.84937 16.1306 3.78869 18.3447 5.43187 19.9244C7.07295 21.5021 9.36677 22.4006 11.9993 22.4006C17.3279 22.4006 21.1493 18.516 21.1493 13.6006C21.1493 9.43786 18.4901 5.72118 14.2641 1.83176ZM9.75914 8.68304L13.1858 3.28607C17.2582 7.06316 19.3493 10.2844 19.3493 13.6006C19.3493 17.4853 16.3708 20.6006 11.9993 20.6006C9.78192 20.6006 7.95075 19.8491 6.67935 18.6268C5.41003 17.4065 4.64936 15.6706 4.64936 13.6006C4.64936 11.4307 5.51076 9.31266 7.03388 7.64253L8.39728 8.86959C8.59415 9.04678 8.85908 9.12825 9.12149 9.0923C9.38391 9.05635 9.61717 8.90664 9.75914 8.68304Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFire;
