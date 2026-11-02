import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M5.8285 3.99995C5.80836 4.02415 5.78859 4.04808 5.76915 4.07162L5.70909 4.14411L2.39384 8.1224C2.15375 8.41041 1.92274 8.68753 1.75982 8.94234C1.72738 8.99307 1.69568 9.0458 1.66553 9.10065H10.0791L5.8285 3.99995Z"
        fill="currentColor"
      />
      <path
        d="M1.69641 10.9006C1.73137 10.9591 1.76811 11.0149 1.80562 11.0683C1.97935 11.3159 2.22208 11.5828 2.47435 11.8602L9.89064 20.0181C10.205 20.364 10.5006 20.6893 10.7775 20.9201C10.8756 21.0018 10.9828 21.0817 11.1001 21.1526V10.9006H1.69641Z"
        fill="currentColor"
      />
      <path
        d="M12.9001 21.1527C13.0175 21.0818 13.1247 21.0019 13.2228 20.9201C13.4997 20.6893 13.7953 20.364 14.1096 20.0182L21.526 11.8602C21.7783 11.5828 22.021 11.3159 22.1947 11.0683C22.2322 11.0149 22.269 10.9591 22.3039 10.9006H12.9001V21.1527Z"
        fill="currentColor"
      />
      <path
        d="M22.3348 9.10065C22.3047 9.0458 22.273 8.99307 22.2405 8.94234C22.0776 8.68754 21.8466 8.41043 21.6065 8.12243L18.2913 4.14411L18.2312 4.07161C18.2117 4.04806 18.192 4.02412 18.1718 3.99991L13.9212 9.10065H22.3348Z"
        fill="currentColor"
      />
      <path
        d="M16.5724 3.10751C16.4283 3.09924 16.2882 3.09983 16.1576 3.10038L16.0634 3.10065H7.93693L7.84278 3.10038C7.71208 3.09983 7.57201 3.09924 7.42788 3.10751L12.0001 8.59422L16.5724 3.10751Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconDiamondFill;
