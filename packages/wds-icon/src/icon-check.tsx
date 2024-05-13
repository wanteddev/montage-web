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
        d="M19.3864 6.86346C19.7378 7.21493 19.7378 7.78478 19.3864 8.13625L10.3864 17.1362C10.0349 17.4877 9.46505 17.4877 9.11358 17.1362L4.61358 12.6362C4.26211 12.2848 4.26211 11.7149 4.61358 11.3635C4.96505 11.012 5.5349 11.012 5.88637 11.3635L9.74998 15.2271L18.1136 6.86346C18.465 6.51199 19.0349 6.51199 19.3864 6.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheck;
