import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M13.734 21.3236C14.4595 20.7426 15.4294 19.9049 16.4024 18.8796C18.3085 16.8709 20.3995 13.9624 20.3995 10.7496C20.3995 6.11042 16.6388 2.34961 11.9996 2.34961C7.3604 2.34961 3.59961 6.11042 3.59961 10.7496C3.59961 13.9624 5.6907 16.8709 7.59675 18.8796C8.56973 19.9049 9.53962 20.7426 10.2652 21.3236C10.6642 21.6431 11.0703 21.9571 11.4936 22.2444C11.7937 22.4475 12.2033 22.4483 12.5038 22.2456C12.9277 21.9581 13.3344 21.6435 13.734 21.3236ZM14.7497 10.7495C14.7497 12.2683 13.5185 13.4995 11.9997 13.4995C10.4809 13.4995 9.24972 12.2683 9.24972 10.7495C9.24972 9.23073 10.4809 7.99951 11.9997 7.99951C13.5185 7.99951 14.7497 9.23073 14.7497 10.7495Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLocationFill;
