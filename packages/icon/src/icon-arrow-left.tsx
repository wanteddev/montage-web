import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M2.8637 11.3635C2.51223 11.715 2.51223 12.2848 2.8637 12.6363L9.86367 19.6363C10.2151 19.9878 10.785 19.9878 11.1365 19.6363C11.4879 19.2848 11.4879 18.715 11.1365 18.3635L5.67288 12.8999H20.5C20.9971 12.8999 21.4 12.497 21.4 11.9999C21.4 11.5028 20.9971 11.0999 20.5 11.0999L5.67288 11.0999L11.1365 5.6363C11.4879 5.28483 11.4879 4.71498 11.1365 4.36351C10.785 4.01203 10.2151 4.01203 9.86367 4.36351L2.8637 11.3635Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeft;
