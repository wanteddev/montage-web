import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, Left, Back
 * 속성: Outlined
 */
const IconArrowLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.86358 11.3635C2.51211 11.715 2.51211 12.2848 2.86358 12.6363L9.86355 19.6363C10.215 19.9878 10.7849 19.9878 11.1363 19.6363C11.4878 19.2848 11.4878 18.715 11.1363 18.3635L5.67276 12.8999H20.4999C20.997 12.8999 21.3999 12.497 21.3999 11.9999C21.3999 11.5028 20.997 11.0999 20.4999 11.0999L5.67276 11.0999L11.1363 5.6363C11.4878 5.28483 11.4878 4.71498 11.1363 4.36351C10.7849 4.01203 10.215 4.01203 9.86355 4.36351L2.86358 11.3635Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeft;
