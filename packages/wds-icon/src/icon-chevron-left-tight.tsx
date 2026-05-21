import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 뒤로가기, Chevron, Back, Left, Tight
 * 속성: Outlined
 */
const IconChevronLeftTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M10.1363 3.36297C10.4878 3.71444 10.4878 4.28429 10.1363 4.63576L2.77271 11.9994L10.1363 19.363C10.4878 19.7144 10.4878 20.2843 10.1363 20.6358C9.78484 20.9872 9.21499 20.9872 8.86352 20.6358L0.863518 12.6358C0.512047 12.2843 0.512047 11.7144 0.863519 11.363L8.86352 3.36297C9.21499 3.0115 9.78484 3.0115 10.1363 3.36297Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftTight;
