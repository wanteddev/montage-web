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
        d="M19.3863 6.86343C19.7378 7.2149 19.7378 7.78475 19.3863 8.13622L10.3864 17.1362C10.0349 17.4877 9.46505 17.4877 9.11357 17.1362L4.61359 12.6362C4.26212 12.2847 4.26212 11.7149 4.61359 11.3634C4.96506 11.0119 5.53491 11.0119 5.88638 11.3634L9.74997 15.227L18.1135 6.86343C18.465 6.51196 19.0349 6.51196 19.3863 6.86343Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheck;
