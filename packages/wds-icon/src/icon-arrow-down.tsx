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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3637 21.136C11.7152 21.4875 12.285 21.4875 12.6365 21.136L19.6365 14.136C19.988 13.7845 19.988 13.2147 19.6365 12.8632C19.285 12.5117 18.7152 12.5117 18.3637 12.8632L12.9001 18.3268L12.9001 3.49961C12.9001 3.00255 12.4972 2.59961 12.0001 2.59961C11.503 2.59961 11.1001 3.00255 11.1001 3.49961V18.3268L5.63649 12.8632C5.28502 12.5117 4.71517 12.5117 4.3637 12.8632C4.01223 13.2147 4.01223 13.7845 4.3637 14.136L11.3637 21.136Z"
      />
    </Box>
  );
});

export default IconArrowDown;
