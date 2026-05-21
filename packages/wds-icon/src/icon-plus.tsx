import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 내용을 추가할 때 사용합니다.
 * 키워드: Plus, 플러스, Add
 * 속성: Outlined
 */
const IconPlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9998 3.10254C12.4968 3.10254 12.8998 3.50548 12.8998 4.00254V11.1025H19.9997C20.4968 11.1025 20.8997 11.5055 20.8997 12.0025C20.8997 12.4996 20.4968 12.9025 19.9997 12.9025H12.8998V20.0025C12.8998 20.4996 12.4968 20.9025 11.9998 20.9025C11.5027 20.9025 11.0998 20.4996 11.0998 20.0025V12.9025H3.99979C3.50273 12.9025 3.09979 12.4996 3.09979 12.0025C3.09979 11.5055 3.50273 11.1025 3.99979 11.1025H11.0998V4.00254C11.0998 3.50548 11.5027 3.10254 11.9998 3.10254Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlus;
