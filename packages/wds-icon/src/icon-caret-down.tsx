import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCaretDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.8627 14.7074C13.2249 15.4925 12.906 15.885 12.522 16.0275C12.1853 16.1525 11.8149 16.1525 11.4781 16.0275C11.0942 15.885 10.7752 15.4925 10.1374 14.7074L8.67973 12.9134C7.66319 11.6623 7.15493 11.0367 7.15156 10.5095C7.14864 10.0512 7.35548 9.61658 7.71309 9.32979C8.12435 8.99998 8.93037 8.99998 10.5424 8.99998H13.4577C15.0698 8.99998 15.8758 8.99998 16.287 9.32979C16.6446 9.61658 16.8515 10.0512 16.8486 10.5095C16.8452 11.0367 16.3369 11.6623 15.3204 12.9134L13.8627 14.7074Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCaretDown;
