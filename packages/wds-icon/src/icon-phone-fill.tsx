import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPhoneFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.18177 15.8215C11.4907 19.1304 14.8244 20.3532 17.0084 20.7956C18.8212 21.1629 20.4912 20.3412 21.6552 19.1771L21.9272 18.9051C23.1944 17.638 23.0204 15.5363 21.5622 14.4947L19.5676 13.07C18.613 12.3881 17.3052 12.4963 16.4756 13.3259L15.6465 14.155C15.0405 13.9032 13.8216 13.2589 12.283 11.7203C10.7444 10.1817 10.1001 8.96276 9.84826 8.35676L10.6774 7.52766C11.5069 6.69807 11.6152 5.39032 10.9333 4.43564L9.50857 2.44106C8.46697 0.98283 6.36529 0.80889 5.09814 2.07604L4.82614 2.34804C3.66208 3.5121 2.84041 5.18205 3.20765 6.9949C3.65007 9.17889 4.87284 12.5126 8.18177 15.8215Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPhoneFill;
