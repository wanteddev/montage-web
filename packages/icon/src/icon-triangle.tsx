import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 삼각형을 표현합니다.
 * 키워드: Triangle, 삼각형
 * 속성: Outlined
 */
const IconTriangle = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8203 3.10033C11.5711 2.76604 12.4285 2.76604 13.1793 3.10033C13.7027 3.33333 14.0805 3.76043 14.4088 4.22516C14.7343 4.68589 15.0925 5.30622 15.5282 6.06096L20.6391 14.9133C21.0748 15.668 21.433 16.2883 21.6692 16.8006C21.9075 17.3173 22.0885 17.858 22.0286 18.4277C21.9427 19.2451 21.514 19.9877 20.8491 20.4708C20.3856 20.8075 19.8268 20.9211 19.2602 20.9731C18.6984 21.0246 17.9821 21.0246 17.1106 21.0246H6.88897C6.01747 21.0246 5.30117 21.0246 4.73942 20.9731C4.17278 20.9211 3.614 20.8075 3.15055 20.4708C2.48563 19.9877 2.05693 19.2451 1.97102 18.4277C1.91114 17.858 2.09211 17.3173 2.33041 16.8006C2.56666 16.2883 2.92482 15.668 3.36058 14.9132L8.47143 6.06097C8.90716 5.30622 9.2653 4.68589 9.59081 4.22516C9.91914 3.76043 10.297 3.33333 10.8203 3.10033ZM12.9524 5.19963C12.529 4.4663 11.4706 4.4663 11.0472 5.19963L3.90249 17.5746C3.4791 18.308 4.00834 19.2246 4.85511 19.2246H19.1445C19.9913 19.2246 20.5205 18.308 20.0971 17.5746L12.9524 5.19963Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconTriangle;
