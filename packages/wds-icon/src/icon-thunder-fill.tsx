import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconThunderFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.8929 2.11227C13.9435 1.70734 13.7153 1.31902 13.3369 1.16617C12.9585 1.01331 12.5247 1.13418 12.2798 1.46065L5.17545 10.9331C4.88736 11.3172 4.63483 11.6539 4.45947 11.9383C4.28637 12.219 4.09104 12.5959 4.10027 13.0401C4.11212 13.6103 4.37947 14.145 4.82851 14.4966C5.17831 14.7704 5.59704 14.8403 5.92546 14.8703C6.25819 14.9006 6.67905 14.9006 7.15917 14.9006L10.9803 14.9006L10.1068 21.8889C10.0562 22.2938 10.2843 22.6822 10.6627 22.835C11.0411 22.9879 11.475 22.867 11.7198 22.5405L18.8242 13.0681C19.1123 12.684 19.3648 12.3473 19.5402 12.0629C19.7133 11.7822 19.9086 11.4053 19.8994 10.9611C19.8875 10.3909 19.6202 9.85622 19.1711 9.50463C18.8213 9.23074 18.4026 9.16086 18.0742 9.13091C17.7414 9.10056 17.3206 9.10058 16.8405 9.10061L13.0193 9.10061L13.8929 2.11227Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconThunderFill;
