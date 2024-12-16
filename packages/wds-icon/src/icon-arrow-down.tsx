import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3637 21.1362C11.7152 21.4876 12.285 21.4876 12.6365 21.1362L19.6365 14.1362C19.988 13.7847 19.988 13.2149 19.6365 12.8634C19.285 12.5119 18.7152 12.5119 18.3637 12.8634L12.9001 18.327L12.9001 3.49984C12.9001 3.00278 12.4972 2.59984 12.0001 2.59984C11.5031 2.59984 11.1001 3.00278 11.1001 3.49984V18.327L5.63653 12.8634C5.28506 12.5119 4.71522 12.5119 4.36375 12.8634C4.01228 13.2149 4.01228 13.7847 4.36375 14.1362L11.3637 21.1362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDown;
