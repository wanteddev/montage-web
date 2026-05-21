import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M10.8203 3.10033C11.5711 2.76604 12.4285 2.76604 13.1794 3.10033C13.7027 3.33333 14.0805 3.76043 14.4088 4.22516C14.7344 4.68589 15.0925 5.30622 15.5282 6.06096L20.6391 14.9133C21.0748 15.668 21.433 16.2883 21.6692 16.8006C21.9075 17.3173 22.0885 17.858 22.0286 18.4277C21.9427 19.2451 21.514 19.9877 20.8491 20.4708C20.3857 20.8075 19.8269 20.9211 19.2602 20.9731C18.6985 21.0246 17.9822 21.0246 17.1107 21.0246H6.889C6.0175 21.0246 5.30121 21.0246 4.73945 20.9731C4.17281 20.9211 3.61403 20.8075 3.15058 20.4708C2.48566 19.9877 2.05696 19.2451 1.97105 18.4277C1.91117 17.858 2.09215 17.3173 2.33044 16.8006C2.56669 16.2883 2.92485 15.668 3.36061 14.9132L8.47146 6.06097C8.90719 5.30622 9.26533 4.68589 9.59084 4.22516C9.91918 3.76043 10.297 3.33333 10.8203 3.10033ZM12.9525 5.19963C12.5291 4.4663 11.4706 4.4663 11.0472 5.19963L3.90252 17.5746C3.47913 18.308 4.00837 19.2246 4.85514 19.2246H19.1445C19.9913 19.2246 20.5205 18.308 20.0971 17.5746L12.9525 5.19963Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconTriangle;
