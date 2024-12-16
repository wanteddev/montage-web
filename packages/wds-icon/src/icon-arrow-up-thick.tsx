import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowUpThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.0809 2.58058C11.5885 2.0729 12.4116 2.0729 12.9193 2.58058L19.9193 9.58055C20.427 10.0882 20.427 10.9113 19.9193 11.419C19.4116 11.9267 18.5885 11.9267 18.0808 11.419L13.3001 6.63828V20.4998C13.3001 21.2177 12.7181 21.7997 12.0001 21.7997C11.2821 21.7997 10.7001 21.2177 10.7001 20.4998V6.63828L5.91935 11.419C5.41167 11.9267 4.58856 11.9267 4.08088 11.419C3.5732 10.9113 3.5732 10.0882 4.08088 9.58055L11.0809 2.58058Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpThick;
