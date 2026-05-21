import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: Thick, 오른쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Right
 * 속성: Outlined
 */
const IconChevronDoubleRightThick = forwardRef<SVGSVGElement, Props>(
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.58096 4.91748C2.07327 4.4098 2.07327 3.58668 2.58096 3.079C3.08864 2.57132 3.91175 2.57132 4.41944 3.079L12.4194 11.079C12.9271 11.5867 12.9271 12.4098 12.4194 12.9175L4.41944 20.9175C3.91176 21.4252 3.08864 21.4252 2.58096 20.9175C2.07328 20.4098 2.07328 19.5867 2.58096 19.079L9.66172 11.9982L2.58096 4.91748ZM12.081 4.91748C11.5733 4.4098 11.5733 3.58668 12.081 3.079C12.5887 2.57132 13.4118 2.57132 13.9194 3.079L21.9194 11.079C22.4271 11.5867 22.4271 12.4098 21.9194 12.9175L13.9194 20.9175C13.4118 21.4252 12.5887 21.4252 12.081 20.9175C11.5733 20.4098 11.5733 19.5867 12.081 19.079L19.1617 11.9982L12.081 4.91748Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightThick;
