import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 여러 목록을 표현합니다.
 * 키워드: 리스트, 메뉴, List, Menu
 */
const IconListCategory = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.09998 5.74961C3.09998 5.25255 3.50292 4.84961 3.99997 4.84961H19.9999C20.497 4.84961 20.8999 5.25255 20.8999 5.74961C20.8999 6.24667 20.497 6.64961 19.9999 6.64961H3.99997C3.50292 6.64961 3.09998 6.24667 3.09998 5.74961Z"
        fill="currentColor"
      />
      <path
        d="M3.09999 11.9996C3.09999 11.5026 3.50293 11.0996 3.99999 11.0996H19.9999C20.497 11.0996 20.8999 11.5026 20.8999 11.9996C20.8999 12.4967 20.497 12.8996 19.9999 12.8996H3.99999C3.50293 12.8996 3.09999 12.4967 3.09999 11.9996Z"
        fill="currentColor"
      />
      <path
        d="M3.09998 18.2496C3.09998 17.7526 3.50292 17.3496 3.99997 17.3496H13.7499C14.247 17.3496 14.6499 17.7526 14.6499 18.2496C14.6499 18.7467 14.247 19.1496 13.7499 19.1496H3.99997C3.50292 19.1496 3.09998 18.7467 3.09998 18.2496Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconListCategory;
