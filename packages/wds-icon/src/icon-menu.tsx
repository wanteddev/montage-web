import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M4.00031 4.84961C3.50325 4.84961 3.10031 5.25255 3.10031 5.74961C3.10031 6.24667 3.50325 6.64961 4.00031 6.64961H20.0002C20.4973 6.64961 20.9002 6.24667 20.9002 5.74961C20.9002 5.25255 20.4973 4.84961 20.0002 4.84961H4.00031Z"
        fill="currentColor"
      />
      <path
        d="M3.10032 11.9998C3.10032 11.5027 3.50327 11.0998 4.00032 11.0998H20.0003C20.4973 11.0998 20.9003 11.5027 20.9003 11.9998C20.9003 12.4969 20.4973 12.8998 20.0003 12.8998H4.00032C3.50327 12.8998 3.10032 12.4969 3.10032 11.9998Z"
        fill="currentColor"
      />
      <path
        d="M3.10032 18.2495C3.10032 17.7525 3.50326 17.3495 4.00032 17.3495H20.0003C20.4973 17.3495 20.9003 17.7525 20.9003 18.2495C20.9003 18.7466 20.4973 19.1495 20.0003 19.1495H4.00032C3.50326 19.1495 3.10032 18.7466 3.10032 18.2495Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenu;
