import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.86407 4.86346C8.5126 5.21493 8.5126 5.78478 8.86407 6.13625L14.7277 11.9999L8.86407 17.8635C8.5126 18.2149 8.5126 18.7848 8.86407 19.1362C9.21554 19.4877 9.78539 19.4877 10.1369 19.1362L16.6369 12.6362C16.9883 12.2848 16.9883 11.7149 16.6369 11.3635L10.1369 4.86346C9.78539 4.51199 9.21554 4.51199 8.86407 4.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightSmall;
