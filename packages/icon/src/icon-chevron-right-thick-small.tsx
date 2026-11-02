import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: Thick, 꺾쇠, 앞으로 가기, Chevron, Forward, Right, Small
 * 속성: Outlined
 */
const IconChevronRightThickSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M8.58096 4.58096C8.07327 5.08864 8.07327 5.91175 8.58096 6.41943L14.1617 12.0002L8.58096 17.581C8.07328 18.0886 8.07328 18.9118 8.58096 19.4194C9.08864 19.9271 9.91175 19.9271 10.4194 19.4194L16.9194 12.9194C17.4271 12.4118 17.4271 11.5886 16.9194 11.081L10.4194 4.58096C9.91175 4.07327 9.08864 4.07327 8.58096 4.58096Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightThickSmall;
