import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCode = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M14.2182 3.12668C14.7004 3.24723 14.9936 3.73587 14.8731 4.21808L10.8731 20.218C10.7525 20.7002 10.2639 20.9934 9.78167 20.8728C9.29946 20.7523 9.00627 20.2637 9.12683 19.7814L13.1268 3.78152C13.2474 3.29931 13.736 3.00612 14.2182 3.12668Z"
        fill="currentColor"
      />
      <path
        d="M16.3635 6.36339C16.0121 6.71486 16.0121 7.28471 16.3635 7.63618L20.7271 11.9998L16.3635 16.3633C16.0121 16.7148 16.0121 17.2847 16.3635 17.6361C16.715 17.9876 17.2848 17.9876 17.6363 17.6361L22.6363 12.6362C22.9878 12.2847 22.9878 11.7148 22.6363 11.3634L17.6363 6.36339C17.2848 6.01192 16.715 6.01192 16.3635 6.36339Z"
        fill="currentColor"
      />
      <path
        d="M7.63646 7.63618C7.98793 7.28471 7.98793 6.71486 7.63646 6.36339C7.28499 6.01192 6.71514 6.01192 6.36367 6.36339L1.36369 11.3634C1.01222 11.7148 1.01222 12.2847 1.36369 12.6362L6.36367 17.6361C6.71514 17.9876 7.28499 17.9876 7.63646 17.6361C7.98793 17.2847 7.98793 16.7148 7.63646 16.3633L3.27287 11.9998L7.63646 7.63618Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCode;
