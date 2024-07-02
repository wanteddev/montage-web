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
        d="M11.0808 21.4191C11.5885 21.9268 12.4116 21.9268 12.9192 21.4191L19.9192 14.4191C20.4269 13.9114 20.4269 13.0883 19.9192 12.5807C19.4115 12.073 18.5884 12.073 18.0807 12.5807L13.3 17.3614V3.49993C13.3 2.78197 12.718 2.19994 12 2.19994C11.282 2.19994 10.7 2.78197 10.7 3.49993V17.3614L5.91928 12.5807C5.4116 12.073 4.58849 12.073 4.08081 12.5807C3.57313 13.0883 3.57313 13.9114 4.08081 14.4191L11.0808 21.4191Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDownThick;
