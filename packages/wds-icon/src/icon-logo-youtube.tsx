import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoYoutube = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M20.3176 4.99222C21.2335 5.23717 21.9577 5.96137 22.2027 6.87727C22.65 8.53867 22.65 11.9999 22.65 11.9999C22.65 11.9999 22.65 15.4612 22.2027 17.1226C21.9577 18.0385 21.2335 18.7627 20.3176 19.0076C18.6562 19.4549 12 19.4549 12 19.4549C12 19.4549 5.34373 19.4549 3.68233 19.0076C2.76643 18.7627 2.04223 18.0385 1.79728 17.1226C1.34998 15.4612 1.34998 11.9999 1.34998 11.9999C1.34998 11.9999 1.34998 8.53867 1.79728 6.87727C2.04223 5.96137 2.76643 5.23717 3.68233 4.99222C5.34373 4.54492 12 4.54492 12 4.54492C12 4.54492 18.6562 4.54492 20.3176 4.99222ZM9.87 8.80518V15.1952L15.408 12.0002L9.87 8.80518Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoYoutube;
