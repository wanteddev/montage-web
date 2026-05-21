import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 추가할 때 사용합니다.
 * 키워드: 플러스, 추가, Add, Plus
 * 속성: Solid
 */
const IconCirclePlusFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09995 12.0001C2.09995 6.53248 6.5323 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.5323 21.9001 2.09995 17.4677 2.09995 12.0001ZM12.8999 7.75C12.8999 7.25294 12.497 6.85 11.9999 6.85C11.5029 6.85 11.0999 7.25294 11.0999 7.75V11.1H7.74995C7.25289 11.1 6.84995 11.5029 6.84995 12C6.84995 12.4971 7.25289 12.9 7.74995 12.9H11.0999V16.25C11.0999 16.7471 11.5029 17.15 11.9999 17.15C12.497 17.15 12.8999 16.7471 12.8999 16.25V12.9H16.2499C16.747 12.9 17.1499 12.4971 17.1499 12C17.1499 11.5029 16.747 11.1 16.2499 11.1H12.8999V7.75Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlusFill;
