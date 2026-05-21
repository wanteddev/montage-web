import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: Thick, 왼쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Left
 * 속성: Outlined
 */
const IconChevronDoubleLeftThick = forwardRef<SVGSVGElement, Props>(
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
          d="M21.4192 4.91748C21.9269 4.4098 21.9269 3.58668 21.4192 3.079C20.9115 2.57132 20.0884 2.57132 19.5807 3.079L11.5807 11.079C11.073 11.5867 11.073 12.4098 11.5807 12.9175L19.5807 20.9175C20.0884 21.4252 20.9115 21.4252 21.4192 20.9175C21.9269 20.4098 21.9269 19.5867 21.4192 19.079L14.3384 11.9982L21.4192 4.91748ZM11.9192 4.91768C12.4269 4.40999 12.4269 3.58688 11.9192 3.0792C11.4115 2.57152 10.5884 2.57152 10.0807 3.0792L2.08071 11.0792C1.57303 11.5869 1.57303 12.41 2.08071 12.9177L10.0807 20.9177C10.5884 21.4254 11.4115 21.4254 11.9192 20.9177C12.4269 20.41 12.4269 19.5869 11.9192 19.0792L4.83843 11.9984L11.9192 4.91768Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftThick;
