import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconNavigationMenu = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.3332 4.99997H4.66664C4.29845 4.99997 3.99998 5.36561 3.99998 5.81664V6.6333C3.99998 7.08433 4.29845 7.44996 4.66664 7.44996H19.3332C19.7014 7.44996 19.9999 7.08433 19.9999 6.6333V5.81664C19.9999 5.36561 19.7014 4.99997 19.3332 4.99997Z"
        fill="currentColor"
      />
      <path
        d="M19.3332 10.7749H4.66664C4.29845 10.7749 3.99998 11.1406 3.99998 11.5916V12.4083C3.99998 12.8593 4.29845 13.2249 4.66664 13.2249H19.3332C19.7014 13.2249 19.9999 12.8593 19.9999 12.4083V11.5916C19.9999 11.1406 19.7014 10.7749 19.3332 10.7749Z"
        fill="currentColor"
      />
      <path
        d="M4.66664 16.5499H19.3332C19.7014 16.5499 19.9999 16.9155 19.9999 17.3666V18.1832C19.9999 18.6343 19.7014 18.9999 19.3332 18.9999H4.66664C4.29845 18.9999 3.99998 18.6343 3.99998 18.1832V17.3666C3.99998 16.9155 4.29845 16.5499 4.66664 16.5499Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationMenu;
