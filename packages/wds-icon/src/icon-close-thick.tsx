import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCloseThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.58069 4.58093C5.08837 4.07325 5.91148 4.07325 6.41916 4.58093L11.9999 10.1617L17.5806 4.58093C18.0883 4.07325 18.9114 4.07325 19.4191 4.58093C19.9268 5.08861 19.9268 5.91172 19.4191 6.4194L13.8384 12.0001L19.4191 17.5809C19.9268 18.0886 19.9268 18.9117 19.4191 19.4193C18.9114 19.927 18.0883 19.927 17.5806 19.4193L11.9999 13.8386L6.41916 19.4193C5.91148 19.927 5.08837 19.927 4.58069 19.4193C4.07301 18.9117 4.07301 18.0886 4.58069 17.5809L10.1614 12.0001L4.58069 6.4194C4.07301 5.91172 4.07301 5.08861 4.58069 4.58093Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCloseThick;
