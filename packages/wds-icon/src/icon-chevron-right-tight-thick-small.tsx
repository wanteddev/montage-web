import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: Thick, 꺾쇠, 앞으로 가기, Chevron, Forward, Right, Tight, Small
 * 속성: Outlined
 */
const IconChevronRightTightThickSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M2.58096 4.58096C2.07327 5.08864 2.07327 5.91175 2.58096 6.41943L8.16172 12.0002L2.58096 17.581C2.07328 18.0886 2.07328 18.9118 2.58096 19.4194C3.08864 19.9271 3.91175 19.9271 4.41944 19.4194L10.9194 12.9194C11.4271 12.4118 11.4271 11.5886 10.9194 11.081L4.41943 4.58096C3.91175 4.07327 3.08864 4.07327 2.58096 4.58096Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightThickSmall;
