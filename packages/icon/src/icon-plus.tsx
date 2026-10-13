import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M11.9996 3.10254C12.4966 3.10254 12.8996 3.50548 12.8996 4.00254V11.1025H19.9995C20.4966 11.1025 20.8995 11.5055 20.8995 12.0025C20.8995 12.4996 20.4966 12.9025 19.9995 12.9025H12.8996V20.0025C12.8996 20.4996 12.4966 20.9025 11.9996 20.9025C11.5025 20.9025 11.0996 20.4996 11.0996 20.0025V12.9025H3.99961C3.50255 12.9025 3.09961 12.4996 3.09961 12.0025C3.09961 11.5055 3.50255 11.1025 3.99961 11.1025H11.0996V4.00254C11.0996 3.50548 11.5025 3.10254 11.9996 3.10254Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlus;
