import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconAlignLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49985 4.60059C4.0028 4.60059 3.59985 5.00353 3.59985 5.50059C3.59985 5.99764 4.0028 6.40059 4.49985 6.40059H19.4999C19.9969 6.40059 20.3999 5.99764 20.3999 5.50059C20.3999 5.00353 19.9969 4.60059 19.4999 4.60059H4.49985Z"
        fill="currentColor"
      />
      <path
        d="M4.49985 8.9339C4.0028 8.9339 3.59985 9.33685 3.59985 9.8339C3.59985 10.331 4.0028 10.7339 4.49985 10.7339H14.4999C14.9969 10.7339 15.3999 10.331 15.3999 9.8339C15.3999 9.33685 14.9969 8.9339 14.4999 8.9339H4.49985Z"
        fill="currentColor"
      />
      <path
        d="M3.59985 14.1672C3.59985 13.6702 4.0028 13.2672 4.49985 13.2672H19.4999C19.9969 13.2672 20.3999 13.6702 20.3999 14.1672C20.3999 14.6643 19.9969 15.0672 19.4999 15.0672H4.49985C4.0028 15.0672 3.59985 14.6643 3.59985 14.1672Z"
        fill="currentColor"
      />
      <path
        d="M4.49985 17.6005C4.0028 17.6005 3.59985 18.0035 3.59985 18.5005C3.59985 18.9976 4.0028 19.4005 4.49985 19.4005H14.4999C14.9969 19.4005 15.3999 18.9976 15.3999 18.5005C15.3999 18.0035 14.9969 17.6005 14.4999 17.6005H4.49985Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignLeft;
