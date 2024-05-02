import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1454 9.62693L10.6761 16.2923L6.85379 12.3542L8.14543 11.1005L10.6761 13.7079L15.8538 8.37327L17.1454 9.62693Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9996 3.9001C7.5261 3.9001 3.89961 7.52659 3.89961 12.0001C3.89961 16.4736 7.5261 20.1001 11.9996 20.1001C16.4731 20.1001 20.0996 16.4736 20.0996 12.0001C20.0996 7.52659 16.4731 3.9001 11.9996 3.9001ZM2.09961 12.0001C2.09961 6.53248 6.53199 2.1001 11.9996 2.1001C17.4672 2.1001 21.8996 6.53248 21.8996 12.0001C21.8996 17.4677 17.4672 21.9001 11.9996 21.9001C6.53199 21.9001 2.09961 17.4677 2.09961 12.0001Z"
      />
    </Box>
  );
});

export default IconCircleCheck;
