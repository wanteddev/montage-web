import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconClock = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.4997 6.59922C11.9968 6.59922 12.3997 7.00216 12.3997 7.49922V12.1265L14.6109 14.3377C14.9623 14.6892 14.9623 15.259 14.6109 15.6105C14.2594 15.962 13.6895 15.962 13.3381 15.6105L10.8632 13.1356C10.6837 12.9561 10.5958 12.7196 10.5997 12.4843V7.49922C10.5997 7.00216 11.0027 6.59922 11.4997 6.59922Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.09961C6.53223 2.09961 2.09985 6.53199 2.09985 11.9996C2.09985 17.4672 6.53223 21.8996 11.9999 21.8996C17.4675 21.8996 21.8999 17.4672 21.8999 11.9996C21.8999 6.53199 17.4675 2.09961 11.9999 2.09961ZM3.89985 11.9996C3.89985 7.5261 7.52635 3.89961 11.9999 3.89961C16.4734 3.89961 20.0999 7.5261 20.0999 11.9996C20.0999 16.4731 16.4734 20.0996 11.9999 20.0996C7.52635 20.0996 3.89985 16.4731 3.89985 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClock;
