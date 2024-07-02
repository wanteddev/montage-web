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
        d="M11.9984 17.8286C8.10042 17.8286 5.51741 14.9639 5.51741 10.6902V4.03319C5.51741 3.46257 5.97999 2.99998 6.55061 2.99998C7.12123 2.99998 7.58381 3.46256 7.58381 4.03319V10.6902C7.58381 13.7898 9.34495 15.8562 11.9984 15.8562C14.6519 15.8562 16.413 13.7898 16.413 10.6902V4.03319C16.413 3.46257 16.8756 2.99998 17.4462 2.99998C18.0168 2.99998 18.4794 3.46256 18.4794 4.03319V10.6902C18.4794 14.9639 15.8964 17.8286 11.9984 17.8286Z"
        fill="currentColor"
      />
      <path
        d="M5.00007 20.0999C4.50302 20.0999 4.10008 20.5028 4.10008 20.9999C4.10008 21.4969 4.50302 21.8999 5.00007 21.8999H19C19.497 21.8999 19.9 21.4969 19.9 20.9999C19.9 20.5028 19.497 20.0999 19 20.0999H5.00007Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconUnderline;
