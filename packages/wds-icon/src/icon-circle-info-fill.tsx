import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보를 표시할 때 사용합니다.
 * 키워드: Additional Information, Info
 * 속성: Solid
 */
const IconCircleInfoFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09998 12.0001C2.09998 6.53248 6.53234 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53234 21.9001 2.09998 17.4677 2.09998 12.0001ZM12.9999 8C12.9999 8.55228 12.5522 9 11.9999 9C11.4476 9 10.9999 8.55228 10.9999 8C10.9999 7.44772 11.4476 7 11.9999 7C12.5522 7 12.9999 7.44772 12.9999 8ZM12 10.6C12.4971 10.6 12.9 11.0029 12.9 11.5V16C12.9 16.4971 12.4971 16.9 12 16.9C11.503 16.9 11.1 16.4971 11.1 16V11.5C11.1 11.0029 11.503 10.6 12 10.6Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfoFill;
