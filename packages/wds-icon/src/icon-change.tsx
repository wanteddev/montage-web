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
        d="M16.3865 11.8857L20.1365 8.13572C20.488 7.78425 20.488 7.2144 20.1365 6.86293L16.3865 3.11295C16.0351 2.76148 15.4652 2.76148 15.1137 3.11295C14.7623 3.46442 14.7623 4.03427 15.1137 4.38574L17.3273 6.59933H4.5002C4.00314 6.59933 3.6002 7.00227 3.6002 7.49933C3.6002 7.99638 4.00314 8.39932 4.5002 8.39932H17.3273L15.1137 10.6129C14.7623 10.9644 14.7623 11.5342 15.1137 11.8857C15.4652 12.2372 16.0351 12.2372 16.3865 11.8857Z"
        fill="currentColor"
      />
      <path
        d="M3.8638 17.1362C3.51233 16.7847 3.51233 16.2148 3.8638 15.8634L7.61378 12.1134C7.96525 11.7619 8.5351 11.7619 8.88657 12.1134C9.23804 12.4649 9.23804 13.0347 8.88657 13.3862L6.67298 15.5998H19.5001C19.9972 15.5998 20.4001 16.0027 20.4001 16.4998C20.4001 16.9968 19.9972 17.3998 19.5001 17.3998H6.67298L8.88657 19.6134C9.23804 19.9648 9.23804 20.5347 8.88657 20.8861C8.5351 21.2376 7.96525 21.2376 7.61378 20.8861L3.8638 17.1362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChange;
