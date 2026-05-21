import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: Thick, 왼쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Left, Small
 * 속성: Outlined
 */
const IconChevronDoubleLeftThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M19.9197 6.41748C20.4274 5.9098 20.4274 5.08668 19.9197 4.579C19.4121 4.07132 18.5889 4.07132 18.0813 4.579L11.5813 11.079C11.0736 11.5867 11.0736 12.4098 11.5813 12.9175L18.0813 19.4175C18.5889 19.9252 19.4121 19.9252 19.9197 19.4175C20.4274 18.9098 20.4274 18.0867 19.9197 17.579L14.339 11.9982L19.9197 6.41748ZM11.9193 6.41768C12.427 5.90999 12.427 5.08688 11.9193 4.5792C11.4116 4.07152 10.5885 4.07152 10.0808 4.5792L3.58083 11.0792C3.07315 11.5869 3.07315 12.41 3.58083 12.9177L10.0808 19.4177C10.5885 19.9254 11.4116 19.9254 11.9193 19.4177C12.427 18.91 12.427 18.0869 11.9193 17.5792L6.33855 11.9984L11.9193 6.41768Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftThickSmall;
