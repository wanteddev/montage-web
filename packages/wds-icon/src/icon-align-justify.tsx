import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconAlignJustify = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49995 4.60056C4.0029 4.60056 3.59996 5.0035 3.59996 5.50056C3.59996 5.99761 4.0029 6.40055 4.49995 6.40055H19.4999C19.9969 6.40055 20.3999 5.99761 20.3999 5.50056C20.3999 5.0035 19.9969 4.60056 19.4999 4.60056H4.49995Z"
        fill="currentColor"
      />
      <path
        d="M4.49995 8.93387C4.0029 8.93387 3.59996 9.33682 3.59996 9.83387C3.59996 10.3309 4.0029 10.7339 4.49995 10.7339H19.4999C19.9969 10.7339 20.3999 10.3309 20.3999 9.83387C20.3999 9.33682 19.9969 8.93387 19.4999 8.93387H4.49995Z"
        fill="currentColor"
      />
      <path
        d="M3.59996 14.1672C3.59996 13.6701 4.0029 13.2672 4.49995 13.2672H19.4999C19.9969 13.2672 20.3999 13.6701 20.3999 14.1672C20.3999 14.6642 19.9969 15.0672 19.4999 15.0672H4.49995C4.0029 15.0672 3.59996 14.6642 3.59996 14.1672Z"
        fill="currentColor"
      />
      <path
        d="M4.49995 17.6005C4.0029 17.6005 3.59996 18.0034 3.59996 18.5005C3.59996 18.9975 4.0029 19.4005 4.49995 19.4005H19.4999C19.9969 19.4005 20.3999 18.9975 20.3999 18.5005C20.3999 18.0034 19.9969 17.6005 19.4999 17.6005H4.49995Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignJustify;
