import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽으로 들어가는 화살표를 표현합니다.
 * 키워드: Indent, 개행
 * 속성: Outlined
 */
const IconArrowTurnDownRight = forwardRef<SVGSVGElement, Props>(
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
          d="M5.89988 3.99766C5.89988 3.5006 5.49694 3.09766 4.99988 3.09766C4.50283 3.09766 4.09988 3.5006 4.09988 3.99766V5.53739C4.09988 6.90386 4.09987 7.98444 4.17099 8.85494C4.24366 9.74435 4.39504 10.4934 4.74295 11.1762C5.3086 12.2864 6.21118 13.1889 7.32134 13.7546C8.00414 14.1025 8.75319 14.2539 9.64261 14.3265C10.5131 14.3977 11.5937 14.3977 12.9601 14.3977H17.3285L13.8635 17.8626C13.512 18.2141 13.512 18.7839 13.8635 19.1354C14.215 19.4869 14.7848 19.4869 15.1363 19.1354L20.1363 14.1354C20.4877 13.7839 20.4877 13.2141 20.1363 12.8626L15.1363 7.86263C14.7848 7.51116 14.215 7.51116 13.8635 7.86263C13.512 8.2141 13.512 8.78395 13.8635 9.13542L17.3257 12.5977H12.9999C11.5849 12.5977 10.5778 12.597 9.78918 12.5325C9.01108 12.469 8.52528 12.3478 8.13852 12.1508C7.36706 11.7577 6.73984 11.1305 6.34676 10.359C6.14969 9.97226 6.02859 9.48646 5.96502 8.70836C5.90058 7.91975 5.89988 6.91264 5.89988 5.49766V3.99766Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconArrowTurnDownRight;
