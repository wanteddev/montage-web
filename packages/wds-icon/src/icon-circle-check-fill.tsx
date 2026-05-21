import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정상적으로 확인된 상태를 표현합니다.
 * 키워드: 체크, 확인, Check, Checked, Confirm
 * 속성: Solid
 */
const IconCircleCheckFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09995 12.0001C2.09995 6.53248 6.53231 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53231 21.9001 2.09995 17.4677 2.09995 12.0001ZM16.6466 9.87594C16.9923 9.51878 16.983 8.94901 16.6258 8.60331C16.2687 8.25762 15.6989 8.26691 15.3532 8.62406L10.6773 13.455L8.64748 11.3522C8.30227 10.9946 7.73251 10.9845 7.37489 11.3297C7.01727 11.6749 7.0072 12.2447 7.35241 12.6023L10.0289 15.3751C10.1983 15.5506 10.4318 15.6498 10.6758 15.65C10.9198 15.6502 11.1534 15.5513 11.3231 15.3759L16.6466 9.87594Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheckFill;
