import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowDownThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.0809 21.4191C11.5885 21.9268 12.4116 21.9268 12.9193 21.4191L19.9193 14.4191C20.427 13.9115 20.427 13.0883 19.9193 12.5807C19.4116 12.073 18.5885 12.073 18.0808 12.5807L13.3001 17.3614V3.49994C13.3001 2.78197 12.7181 2.19994 12.0001 2.19994C11.2821 2.19994 10.7001 2.78197 10.7001 3.49994V17.3614L5.91935 12.5807C5.41167 12.073 4.58856 12.073 4.08088 12.5807C3.5732 13.0883 3.5732 13.9115 4.08088 14.4191L11.0809 21.4191Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDownThick;
