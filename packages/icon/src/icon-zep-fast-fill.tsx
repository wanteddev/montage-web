import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 속도를 표현합니다.
 * 키워드: Thunder, 번개, 속도, Fast
 * 속성: Solid
 */
const IconZepFastFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.3506 1.20368C16.8565 1.16575 17.3081 1.5737 17.3184 2.08357C17.3203 2.18078 17.3064 2.28001 17.2754 2.37653L15.1582 8.95075L20.4453 8.95661C22.0787 9.08408 22.8104 11.1422 21.5498 12.2681L9.78125 22.773C9.59173 22.9418 9.34601 23.0184 9.10547 22.9976C8.7694 22.9687 8.44689 22.7188 8.33398 22.4019C8.26949 22.2205 8.26319 22.0179 8.3252 21.8248L10.4434 15.2515H5.31641C3.57279 15.251 2.75086 13.0959 4.05078 11.9342L15.8193 1.42927C15.9708 1.29413 16.1585 1.21806 16.3506 1.20368Z"
        fill="currentColor"
      />
      <path
        d="M5.60059 6.20075C6.09759 6.20082 6.50098 6.60413 6.50098 7.10114C6.50076 7.59798 6.09745 8.00147 5.60059 8.00153H3.10059C2.60366 8.00153 2.20041 7.59802 2.2002 7.10114C2.2002 6.60409 2.60353 6.20075 3.10059 6.20075H5.60059Z"
        fill="currentColor"
      />
      <path
        d="M7.60059 2.94978C8.09747 2.94984 8.50079 3.35331 8.50098 3.85017C8.50098 4.34718 8.09759 4.75049 7.60059 4.75056H3.10059C2.60353 4.75056 2.2002 4.34722 2.2002 3.85017C2.20038 3.35327 2.60364 2.94978 3.10059 2.94978H7.60059Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconZepFastFill;
