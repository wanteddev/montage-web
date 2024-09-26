import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCaretUp = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.8631 9.29315C13.2253 8.50812 12.9064 8.1156 12.5224 7.97309C12.1857 7.84811 11.8153 7.84811 11.4785 7.97309C11.0946 8.1156 10.7756 8.50812 10.1378 9.29315L8.68013 11.0872C7.6636 12.3383 7.15534 12.9639 7.15197 13.491C7.14905 13.9494 7.35589 14.384 7.7135 14.6708C8.12476 15.0006 8.93077 15.0006 10.5428 15.0006H13.4581C15.0701 15.0006 15.8762 15.0006 16.2874 14.6708C16.645 14.384 16.8519 13.9494 16.8489 13.491C16.8456 12.9639 16.3373 12.3383 15.3208 11.0872L13.8631 9.29315Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCaretUp;
