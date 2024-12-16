import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconUnderline = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9984 17.8287C8.10043 17.8287 5.51742 14.9639 5.51742 10.6902V4.03319C5.51742 3.46257 5.98 2.99999 6.55062 2.99999C7.12124 2.99999 7.58382 3.46257 7.58382 4.03319V10.6902C7.58382 13.7898 9.34497 15.8562 11.9984 15.8562C14.6519 15.8562 16.413 13.7898 16.413 10.6902V4.03319C16.413 3.46257 16.8756 2.99999 17.4462 2.99999C18.0168 2.99999 18.4794 3.46257 18.4794 4.03319V10.6902C18.4794 14.9639 15.8964 17.8287 11.9984 17.8287Z"
        fill="currentColor"
      />
      <path
        d="M5.00008 20.0999C4.50302 20.0999 4.10008 20.5029 4.10008 20.9999C4.10008 21.497 4.50302 21.8999 5.00008 21.8999H19C19.4971 21.8999 19.9 21.497 19.9 20.9999C19.9 20.5029 19.4971 20.0999 19 20.0999H5.00008Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconUnderline;
