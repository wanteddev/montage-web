import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 메뉴를 표시할 때 사용합니다.
 * 키워드: Thick, Hamburger, 햄버거, 삼선 메뉴, Menu, Thick
 * 속성: Outlined
 */
const IconMenuThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4 4.49951C3.30964 4.49951 2.75 5.05916 2.75 5.74951C2.75 6.43987 3.30964 6.99951 4 6.99951H19.9999C20.6903 6.99951 21.2499 6.43987 21.2499 5.74951C21.2499 5.05916 20.6903 4.49951 19.9999 4.49951H4Z"
        fill="currentColor"
      />
      <path
        d="M2.75001 11.9997C2.75001 11.3094 3.30965 10.7497 4.00001 10.7497H19.9999C20.6903 10.7497 21.2499 11.3094 21.2499 11.9997C21.2499 12.6901 20.6903 13.2497 19.9999 13.2497H4.00001C3.30965 13.2497 2.75001 12.6901 2.75001 11.9997Z"
        fill="currentColor"
      />
      <path
        d="M2.75001 18.2494C2.75001 17.5591 3.30965 16.9994 4 16.9994H19.9999C20.6903 16.9994 21.2499 17.5591 21.2499 18.2494C21.2499 18.9398 20.6903 19.4994 19.9999 19.4994H4C3.30965 19.4994 2.75001 18.9398 2.75001 18.2494Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenuThick;
