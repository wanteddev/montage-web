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
        d="M20.178 3.82175C19.0212 2.66487 17.1455 2.66487 15.9886 3.82175L3.36368 16.4467C3.1949 16.6155 3.10008 16.8444 3.10008 17.0831V19.9997C3.10008 20.4968 3.50302 20.8997 4.00008 20.8997H6.91673C7.15542 20.8997 7.38434 20.8049 7.55312 20.6361L20.178 8.01118C21.3349 6.8543 21.3349 4.97863 20.178 3.82175Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencilFill;
