import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconHeartFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.6 3.1001C4.17 3.1001 1.5 5.93664 1.5 9.4001C1.5 11.04 2.09356 12.4208 3.0208 13.7026C3.93088 14.9607 5.19691 16.1683 6.58759 17.4596L6.59185 17.4635L10.3314 20.8915C10.5043 21.0499 10.6701 21.202 10.8208 21.3198C10.9863 21.4492 11.188 21.5821 11.4444 21.6605C11.8065 21.7712 12.1935 21.7712 12.5556 21.6605C12.812 21.5821 13.0137 21.4492 13.1792 21.3198C13.3299 21.202 13.4957 21.05 13.6686 20.8915L17.4082 17.4635L17.4124 17.4596C18.8031 16.1683 20.0691 14.9607 20.9792 13.7026C21.9064 12.4208 22.5 11.04 22.5 9.4001C22.5 5.93664 19.83 3.1001 16.4 3.1001C14.6575 3.1001 13.1026 3.83723 12 5.01883C10.8974 3.83723 9.34248 3.1001 7.6 3.1001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHeartFill;
