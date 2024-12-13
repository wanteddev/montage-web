import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircle = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 3.90008C7.52641 3.90008 3.89993 7.52656 3.89993 12.0001C3.89993 16.4735 7.52641 20.1 11.9999 20.1C16.4734 20.1 20.0999 16.4735 20.0999 12.0001C20.0999 7.52656 16.4734 3.90008 11.9999 3.90008ZM2.09994 12.0001C2.09994 6.53245 6.5323 2.10009 11.9999 2.10009C17.4675 2.10009 21.8999 6.53245 21.8999 12.0001C21.8999 17.4676 17.4675 21.9 11.9999 21.9C6.5323 21.9 2.09994 17.4676 2.09994 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircle;
