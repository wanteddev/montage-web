import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 현재 또는 특정 위치를 표현합니다.
 * 키워드: GPS, Location, Place, 좌표, 위치
 * 속성: Solid
 */
const IconLocationFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.7342 21.3236C14.4597 20.7426 15.4296 19.9049 16.4026 18.8796C18.3086 16.8709 20.3997 13.9624 20.3997 10.7496C20.3997 6.11042 16.6389 2.34961 11.9998 2.34961C7.36059 2.34961 3.59979 6.11042 3.59979 10.7496C3.59979 13.9624 5.69088 16.8709 7.59693 18.8796C8.56992 19.9049 9.5398 20.7426 10.2653 21.3236C10.6644 21.6431 11.0705 21.9571 11.4937 22.2444C11.7939 22.4475 12.2035 22.4483 12.504 22.2456C12.9279 21.9581 13.3346 21.6435 13.7342 21.3236ZM14.7499 10.7495C14.7499 12.2683 13.5187 13.4995 11.9999 13.4995C10.4811 13.4995 9.2499 12.2683 9.2499 10.7495C9.2499 9.23073 10.4811 7.99951 11.9999 7.99951C13.5187 7.99951 14.7499 9.23073 14.7499 10.7495Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLocationFill;
