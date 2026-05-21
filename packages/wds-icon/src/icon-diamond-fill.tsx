import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 다이아몬드를 표현합니다.
 * 키워드: 보석, Jewelry, 주얼리
 * 속성: Solid
 */
const IconDiamondFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.8286 3.99995C5.80846 4.02415 5.78869 4.04808 5.76924 4.07162L5.70918 4.14411L2.39393 8.1224C2.15384 8.41041 1.92283 8.68753 1.75991 8.94234C1.72748 8.99307 1.69578 9.0458 1.66562 9.10065H10.0792L5.8286 3.99995Z"
        fill="currentColor"
      />
      <path
        d="M1.6965 10.9006C1.73146 10.9591 1.7682 11.0149 1.80571 11.0683C1.97945 11.3159 2.22217 11.5828 2.47444 11.8602L9.89073 20.0181C10.2051 20.364 10.5007 20.6893 10.7776 20.9201C10.8757 21.0018 10.9829 21.0817 11.1002 21.1526V10.9006H1.6965Z"
        fill="currentColor"
      />
      <path
        d="M12.9002 21.1527C13.0176 21.0818 13.1248 21.0019 13.2229 20.9201C13.4998 20.6893 13.7954 20.364 14.1097 20.0182L21.5261 11.8602C21.7784 11.5828 22.0211 11.3159 22.1948 11.0683C22.2323 11.0149 22.2691 10.9591 22.304 10.9006H12.9002V21.1527Z"
        fill="currentColor"
      />
      <path
        d="M22.3349 9.10065C22.3048 9.0458 22.2731 8.99307 22.2406 8.94234C22.0777 8.68754 21.8467 8.41043 21.6066 8.12243L18.2914 4.14411L18.2313 4.07161C18.2118 4.04806 18.1921 4.02412 18.1719 3.99991L13.9213 9.10065H22.3349Z"
        fill="currentColor"
      />
      <path
        d="M16.5725 3.10751C16.4284 3.09924 16.2883 3.09983 16.1577 3.10038L16.0635 3.10065H7.93702L7.84287 3.10038C7.71217 3.09983 7.5721 3.09924 7.42797 3.10751L12.0002 8.59422L16.5725 3.10751Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconDiamondFill;
