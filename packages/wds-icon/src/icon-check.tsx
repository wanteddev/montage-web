import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        d="M19.3862 6.86346C19.7377 7.21493 19.7377 7.78478 19.3862 8.13625L10.3862 17.1362C10.0348 17.4877 9.46493 17.4877 9.11346 17.1362L4.61346 12.6362C4.26199 12.2848 4.26199 11.7149 4.61346 11.3635C4.96493 11.012 5.53478 11.012 5.88625 11.3635L9.74985 15.2271L18.1135 6.86346C18.4649 6.51199 19.0348 6.51199 19.3862 6.86346Z"
      />
    </Box>
  );
});

export default IconCheck;
