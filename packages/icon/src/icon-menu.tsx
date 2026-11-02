import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 메뉴를 표시할 때 사용합니다.
 * 키워드: Hamburger, 햄버거, 삼선 메뉴, Menu
 * 속성: Outlined
 */
const IconMenu = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.00009 4.84961C3.50304 4.84961 3.1001 5.25255 3.1001 5.74961C3.1001 6.24667 3.50304 6.64961 4.00009 6.64961H20C20.4971 6.64961 20.9 6.24667 20.9 5.74961C20.9 5.25255 20.4971 4.84961 20 4.84961H4.00009Z"
        fill="currentColor"
      />
      <path
        d="M3.10011 11.9998C3.10011 11.5027 3.50305 11.0998 4.00011 11.0998H20C20.4971 11.0998 20.9 11.5027 20.9 11.9998C20.9 12.4969 20.4971 12.8998 20 12.8998H4.00011C3.50305 12.8998 3.10011 12.4969 3.10011 11.9998Z"
        fill="currentColor"
      />
      <path
        d="M3.10011 18.2495C3.10011 17.7525 3.50305 17.3495 4.0001 17.3495H20C20.4971 17.3495 20.9 17.7525 20.9 18.2495C20.9 18.7466 20.4971 19.1495 20 19.1495H4.0001C3.50305 19.1495 3.10011 18.7466 3.10011 18.2495Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenu;
