import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDownThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.08092 7.58069C3.5886 7.07301 4.41171 7.07301 4.91939 7.58069L12.0001 14.6614L19.0809 7.58069C19.5885 7.07301 20.4117 7.07301 20.9193 7.58069C21.427 8.08837 21.427 8.91149 20.9193 9.41917L12.9194 17.4191C12.4117 17.9268 11.5886 17.9268 11.0809 17.4191L3.08092 9.41917C2.57324 8.91149 2.57324 8.08837 3.08092 7.58069Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownThick;
