import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowLeftThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.5809 11.0806C2.07321 11.5882 2.07321 12.4114 2.5809 12.919L9.58089 19.919C10.0886 20.4267 10.9117 20.4267 11.4194 19.919C11.9271 19.4114 11.9271 18.5882 11.4194 18.0806L6.63861 13.2998H20.5001C21.2181 13.2998 21.8001 12.7178 21.8001 11.9998C21.8001 11.2818 21.2181 10.6998 20.5001 10.6998L6.63861 10.6998L11.4194 5.91904C11.9271 5.41136 11.9271 4.58825 11.4194 4.08057C10.9117 3.57289 10.0886 3.57289 9.58089 4.08057L2.5809 11.0806Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeftThick;
