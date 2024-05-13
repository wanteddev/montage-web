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
        d="M13.8628 14.7075C13.2249 15.4925 12.906 15.885 12.522 16.0276C12.1853 16.1525 11.8149 16.1525 11.4782 16.0276C11.0942 15.885 10.7753 15.4925 10.1374 14.7075L8.67975 12.9134C7.66321 11.6623 7.15495 11.0367 7.15158 10.5096C7.14866 10.0512 7.3555 9.61661 7.71311 9.32982C8.12437 9 8.93039 9 10.5424 9H13.4578C15.0698 9 15.8758 9 16.2871 9.32982C16.6447 9.61661 16.8515 10.0512 16.8486 10.5096C16.8452 11.0367 16.337 11.6623 15.3204 12.9134L13.8628 14.7075Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCaretDown;
