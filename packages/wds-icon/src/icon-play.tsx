import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPlay = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.3337 18.6304C8.75046 19.5705 7.95883 20.0405 7.30795 19.9777C6.74037 19.923 6.22314 19.6285 5.88628 19.1684C5.5 18.6408 5.5 17.7202 5.5 15.8789V8.12198C5.5 6.28067 5.5 5.36001 5.88628 4.83241C6.22314 4.37232 6.74037 4.07789 7.30795 4.02314C7.95883 3.96035 8.75046 4.43038 10.3337 5.37045L16.8658 9.24889C18.3923 10.1552 19.1555 10.6084 19.4136 11.1959C19.6389 11.7086 19.6389 12.2923 19.4136 12.805C19.1555 13.3925 18.3923 13.8457 16.8658 14.752L10.3337 18.6304Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlay;
