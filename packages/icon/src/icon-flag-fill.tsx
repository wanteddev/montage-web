import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 깃발을 표현합니다.
 * 키워드: 휘날림, Milestone, 마일스톤
 * 속성: Solid
 */
const IconFlagFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.14985 16.1482L5.27739 16.1057C7.4737 15.3736 9.86646 15.5061 11.9685 16.4763L12.3449 16.65C14.1475 17.482 16.1431 17.8058 18.1163 17.5866L18.5149 17.5423C19.7303 17.4072 20.6499 16.3799 20.6499 15.157V4.49951C20.6499 4.24352 20.5408 3.99963 20.3501 3.8289C20.1593 3.65817 19.9049 3.57675 19.6505 3.60502L17.9175 3.79757C16.2702 3.98061 14.6041 3.71024 13.0992 3.01566L12.087 2.54852C9.97764 1.57495 7.57647 1.44196 5.37244 2.17663C4.16457 2.57926 3.34985 3.70962 3.34985 4.98283V15.4785C3.34953 15.4924 3.34953 15.5063 3.34985 15.5203V20.9995C3.34985 21.4966 3.7528 21.8995 4.24985 21.8995C4.74691 21.8995 5.14985 21.4966 5.14985 20.9995V16.1482Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFlagFill;
