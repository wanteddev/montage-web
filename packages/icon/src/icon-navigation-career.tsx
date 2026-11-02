import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 모바일 환경 하단의 내비게이션 바에 들어가는 아이콘입니다.
 * 키워드: 커리어, 깃발, 내비게이션, Career navigation
 */
const IconNavigationCareer = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M6.21972 4.25C6.21972 3.55964 5.66007 3 4.96972 3C4.27937 3 3.71973 3.55964 3.71973 4.25V19.7517C3.71973 20.4421 4.27937 21.0017 4.96972 21.0017C5.66007 21.0017 6.21972 20.4421 6.21972 19.7517V16.0422C8.26362 14.3384 10.3614 15.1047 12.4705 15.8752C14.6284 16.6635 16.7981 17.4561 18.9344 15.6125C19.7871 14.8789 20.2673 13.6879 20.2673 12.4516V5.40811C20.2673 4.57649 19.398 4.22488 18.7523 4.73661C16.4538 6.55816 14.3124 5.7441 12.221 4.94902C10.2063 4.18308 8.23783 3.43475 6.21972 5.07715V4.25Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationCareer;
