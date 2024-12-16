import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPersonFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.60006 7.25251C7.60006 4.82247 9.57 2.85253 12 2.85253C14.4301 2.85253 16.4 4.82247 16.4 7.25251C16.4 9.68255 14.4301 11.6525 12 11.6525C9.57 11.6525 7.60006 9.68255 7.60006 7.25251Z"
        fill="currentColor"
      />
      <path
        d="M12 13.5986C9.68803 13.5986 7.5306 14.0511 5.91633 14.9207C4.3032 15.7896 3.1 17.1648 3.1 18.9986L3.1 19.3262C3.09997 19.5129 3.09994 19.7029 3.11321 19.8654C3.12797 20.0461 3.16355 20.2704 3.27985 20.4986C3.43805 20.8091 3.69049 21.0615 4.00097 21.2197C4.22923 21.336 4.45347 21.3715 4.6342 21.3863C4.79665 21.3995 4.98667 21.3995 5.17333 21.3995L18.8268 21.3987C19.0135 21.3987 19.2035 21.3987 19.3659 21.3854C19.5466 21.3706 19.7709 21.3351 19.9991 21.2188C20.3095 21.0606 20.5619 20.8081 20.7201 20.4977C20.8364 20.2695 20.872 20.0452 20.8867 19.8645C20.9 19.7021 20.9 19.5121 20.8999 19.3254L20.8999 18.9986C20.8999 17.1648 19.6967 15.7896 18.0836 14.9207C16.4693 14.0511 14.3119 13.5986 12 13.5986Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPersonFill;
