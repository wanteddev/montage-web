import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아래쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, Bottom, Thick
 * 속성: Outlined
 */
const IconArrowDownThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.0809 21.4192C11.5886 21.9269 12.4117 21.9269 12.9194 21.4192L19.9194 14.4192C20.427 13.9115 20.427 13.0884 19.9194 12.5807C19.4117 12.0731 18.5886 12.0731 18.0809 12.5807L13.3002 17.3615V3.49998C13.3002 2.78201 12.7181 2.19998 12.0002 2.19998C11.2822 2.19998 10.7002 2.78201 10.7002 3.49998V17.3615L5.91943 12.5807C5.41175 12.0731 4.58863 12.0731 4.08095 12.5807C3.57328 13.0884 3.57328 13.9115 4.08095 14.4192L11.0809 21.4192Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDownThick;
