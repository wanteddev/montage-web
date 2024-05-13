import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowRightThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.4194 11.081C21.9271 11.5886 21.9271 12.4118 21.4194 12.9194L14.4194 19.9194C13.9117 20.4271 13.0886 20.4271 12.5809 19.9194C12.0732 19.4118 12.0732 18.5886 12.5809 18.081L17.3617 13.3002H3.50013C2.78216 13.3002 2.20013 12.7182 2.20013 12.0002C2.20013 11.2822 2.78216 10.7002 3.50013 10.7002H17.3617L12.5809 5.91943C12.0732 5.41175 12.0732 4.58864 12.5809 4.08096C13.0886 3.57327 13.9117 3.57328 14.4194 4.08096L21.4194 11.081Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowRightThick;
