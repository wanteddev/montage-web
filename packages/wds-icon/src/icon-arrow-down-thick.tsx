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
        d="M11.0809 21.4194C11.5886 21.9271 12.4117 21.9271 12.9194 21.4194L19.9194 14.4194C20.4271 13.9118 20.4271 13.0886 19.9194 12.581C19.4117 12.0733 18.5886 12.0733 18.0809 12.581L13.3001 17.3617V3.50019C13.3001 2.78222 12.7181 2.2002 12.0001 2.2002C11.2822 2.2002 10.7001 2.78222 10.7001 3.50019V17.3617L5.91937 12.581C5.41169 12.0733 4.58858 12.0733 4.0809 12.581C3.57321 13.0886 3.57321 13.9118 4.0809 14.4194L11.0809 21.4194Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDownThick;
