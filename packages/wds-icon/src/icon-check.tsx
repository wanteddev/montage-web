import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.3863 6.86342C19.7377 7.21489 19.7377 7.78474 19.3863 8.13621L10.3863 17.1362C10.0348 17.4876 9.465 17.4876 9.11353 17.1362L4.61356 12.6362C4.26209 12.2847 4.26209 11.7149 4.61356 11.3634C4.96503 11.0119 5.53487 11.0119 5.88634 11.3634L9.74993 15.227L18.1135 6.86342C18.465 6.51195 19.0348 6.51195 19.3863 6.86342Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheck;
