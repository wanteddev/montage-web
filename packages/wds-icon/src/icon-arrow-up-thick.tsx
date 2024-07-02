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
        d="M11.0808 2.58058C11.5885 2.0729 12.4116 2.0729 12.9192 2.58058L19.9192 9.58054C20.4269 10.0882 20.4269 10.9113 19.9192 11.419C19.4115 11.9267 18.5884 11.9267 18.0807 11.419L13.3 6.63827V20.4997C13.3 21.2177 12.718 21.7997 12 21.7997C11.282 21.7997 10.7 21.2177 10.7 20.4997V6.63827L5.91928 11.419C5.4116 11.9267 4.58849 11.9267 4.08081 11.419C3.57313 10.9113 3.57313 10.0882 4.08081 9.58054L11.0808 2.58058Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpThick;
