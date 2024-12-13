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
          d="M4.08089 6.42329C3.57322 5.91561 3.57322 5.09251 4.08089 4.58483C4.58857 4.07715 5.41168 4.07715 5.91936 4.58483L12.4193 11.0848C12.6631 11.3286 12.8001 11.6592 12.8001 12.004C12.8001 12.3488 12.6631 12.6794 12.4193 12.9232L5.91936 19.4232C5.41168 19.9309 4.58857 19.9309 4.0809 19.4232C3.57322 18.9155 3.57322 18.0924 4.0809 17.5847L9.66161 12.004L4.08089 6.42329ZM12.081 6.42329C11.5733 5.91561 11.5733 5.09251 12.081 4.58483C12.5886 4.07715 13.4117 4.07715 13.9194 4.58483L20.4194 11.0848C20.6632 11.3286 20.8001 11.6592 20.8001 12.004C20.8001 12.3488 20.6632 12.6794 20.4194 12.9232L13.9194 19.4232C13.4117 19.9309 12.5886 19.9309 12.081 19.4232C11.5733 18.9155 11.5733 18.0924 12.081 17.5847L17.6617 12.004L12.081 6.42329Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightThickSmall;
