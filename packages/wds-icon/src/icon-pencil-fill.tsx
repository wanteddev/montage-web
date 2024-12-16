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
        d="M20.1782 3.82176C19.0213 2.66487 17.1456 2.66487 15.9887 3.82176L3.36375 16.4467C3.19497 16.6155 3.10015 16.8444 3.10015 17.0831V19.9998C3.10015 20.4968 3.50309 20.8998 4.00015 20.8998H6.91681C7.1555 20.8998 7.38442 20.805 7.5532 20.6362L20.1782 8.0112C21.335 6.85432 21.335 4.97864 20.1782 3.82176Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencilFill;
