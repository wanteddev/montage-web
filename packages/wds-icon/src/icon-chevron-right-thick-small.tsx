import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
          d="M8.58117 4.58096C8.07349 5.08864 8.07349 5.91175 8.58117 6.41943L14.1619 12.0002L8.58117 17.581C8.07349 18.0886 8.07349 18.9118 8.58117 19.4194C9.08885 19.9271 9.91197 19.9271 10.4196 19.4194L16.9196 12.9194C17.4273 12.4118 17.4273 11.5886 16.9196 11.081L10.4196 4.58096C9.91197 4.07327 9.08885 4.07327 8.58117 4.58096Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightThickSmall;
