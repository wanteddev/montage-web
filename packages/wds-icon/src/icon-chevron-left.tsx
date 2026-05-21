import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 뒤로가기, Chevron, Back, Left, Size
 * 속성: Outlined
 */
const IconChevronLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.1363 3.36297C16.4878 3.71444 16.4878 4.28429 16.1363 4.63576L8.77271 11.9994L16.1363 19.363C16.4878 19.7144 16.4878 20.2843 16.1363 20.6358C15.7848 20.9872 15.215 20.9872 14.8635 20.6358L6.86352 12.6358C6.51205 12.2843 6.51205 11.7144 6.86352 11.363L14.8635 3.36297C15.215 3.0115 15.7848 3.0115 16.1363 3.36297Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeft;
