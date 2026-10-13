import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 위쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, Top, Thick
 * 속성: Outlined
 */
const IconArrowUpThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.0809 2.58065C11.5886 2.07297 12.4117 2.07297 12.9194 2.58065L19.9194 9.58065C20.427 10.0883 20.427 10.9114 19.9194 11.4191C19.4117 11.9268 18.5886 11.9268 18.0809 11.4191L13.3002 6.63837V20.4999C13.3002 21.2179 12.7181 21.7999 12.0002 21.7999C11.2822 21.7999 10.7002 21.2179 10.7002 20.4999V6.63837L5.91943 11.4191C5.41175 11.9268 4.58863 11.9268 4.08095 11.4191C3.57328 10.9114 3.57328 10.0883 4.08095 9.58065L11.0809 2.58065Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpThick;
