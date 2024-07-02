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
        d="M6.68781 4.3744C7.94529 2.88787 9.77468 2.10009 11.9999 2.10009C14.2251 2.10009 16.0545 2.88787 17.312 4.3744C18.5521 5.84041 19.1499 7.88316 19.1499 10.25L19.1499 11C19.1499 13.4652 19.8331 14.9248 20.8062 15.8681C21.1877 16.238 21.2273 16.7498 21.091 17.1263C20.9523 17.5093 20.5722 17.9 20.0003 17.9H3.99951C3.42765 17.9 3.04754 17.5093 2.90884 17.1263C2.77246 16.7498 2.81206 16.238 3.1936 15.8681C4.16672 14.9248 4.84995 13.4652 4.84995 11L4.84995 10.25C4.84995 7.88316 5.44768 5.84041 6.68781 4.3744Z"
        fill="currentColor"
      />
      <path
        d="M9.09993 20.9998C9.09993 20.5028 9.50287 20.0998 9.99992 20.0998H13.9999C14.497 20.0998 14.8999 20.5028 14.8999 20.9998C14.8999 21.4969 14.497 21.8998 13.9999 21.8998H9.99992C9.50287 21.8998 9.09993 21.4969 9.09993 20.9998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBellFill;
