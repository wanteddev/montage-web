import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleRightThickSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.08092 6.42327C3.57324 5.9156 3.57324 5.09249 4.08091 4.58482C4.58859 4.07714 5.4117 4.07714 5.91937 4.58482L12.4193 11.0847C12.6631 11.3285 12.8001 11.6592 12.8001 12.004C12.8001 12.3488 12.6631 12.6794 12.4193 12.9232L5.91937 19.4231C5.4117 19.9308 4.58859 19.9308 4.08092 19.4231C3.57324 18.9155 3.57324 18.0924 4.08092 17.5847L9.66162 12.004L4.08092 6.42327ZM12.081 6.42327C11.5733 5.9156 11.5733 5.09249 12.081 4.58482C12.5886 4.07714 13.4117 4.07714 13.9194 4.58482L20.4193 11.0847C20.6631 11.3285 20.8001 11.6592 20.8001 12.004C20.8001 12.3488 20.6631 12.6794 20.4193 12.9232L13.9194 19.4231C13.4117 19.9308 12.5886 19.9308 12.081 19.4231C11.5733 18.9155 11.5733 18.0924 12.081 17.5847L17.6617 12.004L12.081 6.42327Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightThickSmall;
