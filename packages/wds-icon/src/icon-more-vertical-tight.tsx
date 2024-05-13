import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMoreVerticalTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M7.7497 18.75C7.7497 17.7835 6.9662 17 5.9997 17C5.0332 17 4.24969 17.7835 4.24969 18.75C4.24969 19.7165 5.0332 20.5 5.9997 20.5C6.9662 20.5 7.7497 19.7165 7.7497 18.75Z"
        fill="currentColor"
      />
      <path
        d="M5.9997 10.25C6.9662 10.25 7.7497 11.0335 7.7497 12C7.7497 12.9665 6.9662 13.75 5.9997 13.75C5.0332 13.75 4.24969 12.9665 4.24969 12C4.24969 11.0335 5.0332 10.25 5.9997 10.25Z"
        fill="currentColor"
      />
      <path
        d="M5.9997 3.5C6.9662 3.5 7.7497 4.2835 7.7497 5.25C7.7497 6.2165 6.9662 7 5.9997 7C5.0332 7 4.24969 6.2165 4.24969 5.25C4.24969 4.2835 5.0332 3.5 5.9997 3.5Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreVerticalTight;
