import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 포인트를 표현합니다.
 * 키워드: Wanted Point, 원티드 포인트
 * 속성: Solid
 */
const IconCirclePointFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.2559 9.33203C13.1895 9.33203 13.7479 9.78949 13.748 10.5527C13.748 11.3221 13.1896 11.7861 12.2559 11.7861H11.0576V9.33203H12.2559Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.09961C17.4676 2.09963 21.9004 6.5324 21.9004 12C21.9004 17.4676 17.4676 21.9004 12 21.9004C6.5324 21.9004 2.09961 17.4676 2.09961 12C2.09961 6.53238 6.5324 2.09961 12 2.09961ZM10.9199 7.74609C10.3599 7.74609 10.0791 7.7455 9.86523 7.85449C9.67711 7.95036 9.52457 8.10386 9.42871 8.29199C9.31973 8.50588 9.31934 8.78578 9.31934 9.3457V15.3809C9.31951 15.8607 9.70864 16.2499 10.1885 16.25C10.6684 16.25 11.0574 15.8607 11.0576 15.3809V13.3721H12.2324C14.1704 13.3721 15.498 12.2265 15.498 10.5527C15.4979 8.89093 14.1703 7.7461 12.2324 7.74609H10.9199Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePointFill;
