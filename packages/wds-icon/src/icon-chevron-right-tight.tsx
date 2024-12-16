import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M1.86335 3.3627C1.51188 3.71417 1.51188 4.28401 1.86335 4.63548L9.2269 11.999L1.86335 19.3626C1.51188 19.714 1.51188 20.2839 1.86335 20.6354C2.21482 20.9868 2.78467 20.9868 3.13613 20.6354L11.1361 12.6354C11.4875 12.284 11.4875 11.7141 11.1361 11.3626L3.13613 3.3627C2.78466 3.01123 2.21482 3.01123 1.86335 3.3627Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightTight;
