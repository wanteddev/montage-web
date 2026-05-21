import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽으로 들어가는 화살표를 표현합니다.
 * 키워드: Select, Enter, 선택, 엔터
 * 속성: Outlined
 */
const IconArrowTurnDownLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.8999 3.99766C19.8999 3.5006 19.4969 3.09766 18.9999 3.09766C18.5028 3.09766 18.0999 3.5006 18.0999 3.99766V5.49766C18.0999 6.91264 18.0992 7.91975 18.0348 8.70836C17.9712 9.48646 17.8501 9.97226 17.653 10.359C17.2599 11.1305 16.6327 11.7577 15.8612 12.1508C15.4745 12.3478 14.9887 12.469 14.2106 12.5325C13.422 12.597 12.4149 12.5977 10.9999 12.5977H6.67414L10.1363 9.13552C10.4878 8.78405 10.4878 8.2142 10.1363 7.86273C9.78481 7.51125 9.21496 7.51125 8.86349 7.86273L3.86349 12.8627C3.51202 13.2142 3.51202 13.784 3.86349 14.1355L8.86349 19.1355C9.21496 19.487 9.78481 19.487 10.1363 19.1355C10.4878 18.784 10.4878 18.2142 10.1363 17.8627L6.67121 14.3977H11.0396C12.4061 14.3977 13.4867 14.3977 14.3572 14.3265C15.2466 14.2539 15.9956 14.1025 16.6784 13.7546C17.7886 13.1889 18.6912 12.2864 19.2568 11.1762C19.6047 10.4934 19.7561 9.74435 19.8288 8.85494C19.8999 7.98445 19.8999 6.90386 19.8999 5.53739V3.99766Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowTurnDownLeft;
