import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconNavigationRecruit = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.8552 2.55005C8.92222 2.55005 7.35522 4.11705 7.35522 6.05005V6.15476H6.15C4.4103 6.15476 3 7.56465 3 9.30385V18.3012C3 20.0404 4.4103 21.4503 6.15 21.4503H17.85C19.5897 21.4503 21 20.0404 21 18.3012V9.30385C21 7.56465 19.5897 6.15476 17.85 6.15476H16.5552V6.05005C16.5552 4.11705 14.9882 2.55005 13.0552 2.55005H10.8552ZM14.5552 6.15476V6.05005C14.5552 5.22162 13.8836 4.55005 13.0552 4.55005H10.8552C10.0268 4.55005 9.35522 5.22162 9.35522 6.05005V6.15476H14.5552Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationRecruit;
