import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.86356 11.3634C2.51209 11.7149 2.51209 12.2848 2.86356 12.6362L9.86353 19.6362C10.215 19.9877 10.7848 19.9877 11.1363 19.6362C11.4878 19.2847 11.4878 18.7149 11.1363 18.3634L5.67274 12.8998L20.4999 12.8998C20.9969 12.8998 21.3999 12.4969 21.3999 11.9998C21.3999 11.5028 20.9969 11.0998 20.4999 11.0998L5.67274 11.0998L11.1363 5.63627C11.4878 5.2848 11.4878 4.71495 11.1363 4.36348C10.7848 4.01201 10.215 4.01201 9.86353 4.36348L2.86356 11.3634Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeft;
