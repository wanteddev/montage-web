import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChange = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.3866 11.8857L20.1365 8.13573C20.488 7.78426 20.488 7.21441 20.1365 6.86294L16.3866 3.11296C16.0351 2.76149 15.4652 2.76149 15.1138 3.11296C14.7623 3.46443 14.7623 4.03427 15.1138 4.38574L17.3274 6.59934H4.5002C4.00315 6.59934 3.60021 7.00228 3.60021 7.49934C3.60021 7.99639 4.00315 8.39933 4.5002 8.39933H17.3274L15.1138 10.6129C14.7623 10.9644 14.7623 11.5342 15.1138 11.8857C15.4652 12.2372 16.0351 12.2372 16.3866 11.8857Z"
        fill="currentColor"
      />
      <path
        d="M3.86381 17.1362C3.51234 16.7847 3.51234 16.2149 3.86381 15.8634L7.61379 12.1134C7.96526 11.7619 8.53511 11.7619 8.88658 12.1134C9.23805 12.4649 9.23805 13.0347 8.88658 13.3862L6.67298 15.5998H19.5001C19.9972 15.5998 20.4001 16.0027 20.4001 16.4998C20.4001 16.9968 19.9972 17.3998 19.5001 17.3998H6.67298L8.88658 19.6134C9.23805 19.9649 9.23805 20.5347 8.88658 20.8862C8.53511 21.2376 7.96526 21.2376 7.61379 20.8862L3.86381 17.1362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChange;
