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
        d="M10.8552 2.5498C8.92222 2.5498 7.35522 4.1168 7.35522 6.0498V6.15452H6.15C4.4103 6.15452 3 7.56441 3 9.3036V18.301C3 20.0402 4.4103 21.4501 6.15 21.4501H17.85C19.5897 21.4501 21 20.0402 21 18.301V9.3036C21 7.56441 19.5897 6.15452 17.85 6.15452H16.5552V6.0498C16.5552 4.11681 14.9882 2.5498 13.0552 2.5498H10.8552ZM14.5552 6.15452V6.0498C14.5552 5.22138 13.8836 4.5498 13.0552 4.5498H10.8552C10.0268 4.5498 9.35522 5.22138 9.35522 6.0498V6.15452H14.5552Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationRecruit;
