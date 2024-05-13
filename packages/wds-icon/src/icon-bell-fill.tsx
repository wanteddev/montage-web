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
        d="M6.68778 4.37443C7.94527 2.88789 9.77467 2.1001 11.9999 2.1001C14.2251 2.1001 16.0545 2.88789 17.312 4.37443C18.5522 5.84044 19.1499 7.8832 19.1499 10.2501L19.1499 11.0001C19.1499 13.4652 19.8331 14.9249 20.8062 15.8682C21.1878 16.2381 21.2274 16.7499 21.091 17.1264C20.9523 17.5094 20.5722 17.9001 20.0003 17.9001H3.99947C3.4276 17.9001 3.0475 17.5094 2.9088 17.1264C2.77241 16.7499 2.81201 16.2381 3.19356 15.8682C4.16668 14.9249 4.84991 13.4652 4.84991 11.0001L4.84991 10.2501C4.84991 7.8832 5.44765 5.84044 6.68778 4.37443Z"
        fill="currentColor"
      />
      <path
        d="M9.09991 20.9999C9.09991 20.5029 9.50286 20.0999 9.99991 20.0999H13.9999C14.497 20.0999 14.8999 20.5029 14.8999 20.9999C14.8999 21.497 14.497 21.8999 13.9999 21.8999H9.99991C9.50286 21.8999 9.09991 21.497 9.09991 20.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBellFill;
