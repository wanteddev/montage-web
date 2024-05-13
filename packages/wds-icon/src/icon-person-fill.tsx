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
        d="M7.60006 7.25254C7.60006 4.82249 9.57001 2.85254 12.0001 2.85254C14.4301 2.85254 16.4001 4.82249 16.4001 7.25254C16.4001 9.68259 14.4301 11.6525 12.0001 11.6525C9.57001 11.6525 7.60006 9.68259 7.60006 7.25254Z"
        fill="currentColor"
      />
      <path
        d="M12 13.5986C9.68804 13.5986 7.5306 14.0512 5.91632 14.9207C4.30319 15.7897 3.09998 17.1648 3.09998 18.9986L3.09998 19.3263C3.09995 19.513 3.09992 19.703 3.11319 19.8655C3.12796 20.0462 3.16353 20.2704 3.27983 20.4987C3.43804 20.8092 3.69047 21.0616 4.00096 21.2198C4.22921 21.336 4.45346 21.3716 4.63419 21.3864C4.79663 21.3996 4.98666 21.3996 5.17332 21.3995L18.8269 21.3987C19.0135 21.3988 19.2035 21.3988 19.366 21.3855C19.5467 21.3707 19.7709 21.3351 19.9991 21.2188C20.3096 21.0606 20.562 20.8082 20.7202 20.4978C20.8364 20.2695 20.872 20.0453 20.8868 19.8646C20.9 19.7022 20.9 19.5121 20.9 19.3255L20.9 18.9986C20.9 17.1648 19.6968 15.7897 18.0836 14.9207C16.4694 14.0512 14.3119 13.5986 12 13.5986Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPersonFill;
