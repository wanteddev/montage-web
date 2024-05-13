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
        d="M11.0809 2.58096C11.5886 2.07327 12.4117 2.07327 12.9194 2.58096L19.9194 9.58095C20.4271 10.0886 20.4271 10.9117 19.9194 11.4194C19.4117 11.9271 18.5886 11.9271 18.0809 11.4194L13.3001 6.63867V20.5002C13.3001 21.2182 12.7181 21.8002 12.0001 21.8002C11.2822 21.8002 10.7001 21.2182 10.7001 20.5002V6.63867L5.91937 11.4194C5.41169 11.9271 4.58858 11.9271 4.0809 11.4194C3.57321 10.9117 3.57321 10.0886 4.0809 9.58095L11.0809 2.58096Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpThick;
