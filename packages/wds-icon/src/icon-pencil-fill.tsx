import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPencilFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M20.178 3.8215C19.0212 2.66462 17.1455 2.66462 15.9886 3.8215L3.36368 16.4464C3.1949 16.6152 3.10008 16.8441 3.10008 17.0828V19.9995C3.10008 20.4965 3.50302 20.8995 4.00008 20.8995H6.91673C7.15542 20.8995 7.38434 20.8047 7.55312 20.6359L20.178 8.01094C21.3349 6.85406 21.3349 4.97839 20.178 3.8215Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencilFill;
