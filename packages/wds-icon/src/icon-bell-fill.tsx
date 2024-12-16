import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBellFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M6.68776 4.37441C7.94525 2.88788 9.77464 2.10009 11.9999 2.10009C14.2251 2.10009 16.0545 2.88788 17.312 4.37442C18.5521 5.84043 19.1498 7.88318 19.1498 10.2501L19.1498 11.0001C19.1498 13.4652 19.8331 14.9249 20.8062 15.8682C21.1877 16.238 21.2273 16.7498 21.091 17.1264C20.9523 17.5093 20.5722 17.9001 20.0003 17.9001H3.99946C3.42759 17.9001 3.04749 17.5093 2.90879 17.1264C2.7724 16.7498 2.81201 16.238 3.19355 15.8682C4.16667 14.9249 4.8499 13.4652 4.8499 11.0001L4.8499 10.2501C4.8499 7.88318 5.44764 5.84043 6.68776 4.37441Z"
        fill="currentColor"
      />
      <path
        d="M9.09989 20.9999C9.09989 20.5028 9.50283 20.0999 9.99989 20.0999H13.9999C14.4969 20.0999 14.8999 20.5028 14.8999 20.9999C14.8999 21.497 14.4969 21.8999 13.9999 21.8999H9.99989C9.50283 21.8999 9.09989 21.497 9.09989 20.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBellFill;
