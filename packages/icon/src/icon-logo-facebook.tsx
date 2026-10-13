import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 페이스북 로고를 표현합니다.
 * 키워드: 페이스북 로고, FB, Facebook, Meta, Logo, 메타
 * 속성: Outlined
 */
const IconLogoFacebook = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.0001 2.1001C6.53528 2.1001 2.1001 6.5353 2.1001 12.0001C2.1001 16.9402 5.72348 21.0388 10.4557 21.7813V14.8612H7.94107V12.0001H10.4557V9.8221C10.4557 7.3372 11.9308 5.971 14.1979 5.971C15.2769 5.971 16.4154 6.169 16.4154 6.169V8.6044H15.168C13.9405 8.6044 13.5544 9.3667 13.5544 10.1488V12.01H16.2966L15.861 14.8711H13.5544V21.7912C18.2865 21.0487 21.9 16.9402 21.9 12.0001C21.9 6.5353 17.4747 2.11 12.01 2.11L12.0001 2.1001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoFacebook;
