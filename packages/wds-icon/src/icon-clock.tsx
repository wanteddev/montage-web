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
        d="M11.4998 6.59967C11.9968 6.59967 12.3998 7.00262 12.3998 7.49967V12.127L14.6109 14.3381C14.9624 14.6896 14.9624 15.2594 14.6109 15.6109C14.2594 15.9624 13.6896 15.9624 13.3381 15.6109L10.8633 13.136C10.6837 12.9565 10.5959 12.72 10.5998 12.4847V7.49967C10.5998 7.00262 11.0027 6.59967 11.4998 6.59967Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.10009C6.53232 2.10009 2.09996 6.53245 2.09996 12C2.09996 17.4676 6.53232 21.9 11.9999 21.9C17.4675 21.9 21.8999 17.4676 21.8999 12C21.8999 6.53245 17.4675 2.10009 11.9999 2.10009ZM3.89996 12C3.89996 7.52655 7.52643 3.90008 11.9999 3.90008C16.4734 3.90008 20.0999 7.52655 20.0999 12C20.0999 16.4735 16.4734 20.1 11.9999 20.1C7.52643 20.1 3.89996 16.4735 3.89996 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClock;
