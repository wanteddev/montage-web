import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconListCategory = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.09996 5.75007C3.09996 5.25301 3.5029 4.85007 3.99996 4.85007H19.9999C20.4969 4.85007 20.8999 5.25301 20.8999 5.75007C20.8999 6.24712 20.4969 6.65006 19.9999 6.65006H3.99996C3.5029 6.65006 3.09996 6.24712 3.09996 5.75007Z"
        fill="currentColor"
      />
      <path
        d="M3.09998 12C3.09998 11.503 3.50292 11.1 3.99997 11.1H19.9999C20.4969 11.1 20.8999 11.503 20.8999 12C20.8999 12.4971 20.4969 12.9 19.9999 12.9H3.99997C3.50292 12.9 3.09998 12.4971 3.09998 12Z"
        fill="currentColor"
      />
      <path
        d="M3.09996 18.25C3.09996 17.753 3.5029 17.35 3.99996 17.35H13.7499C14.247 17.35 14.6499 17.753 14.6499 18.25C14.6499 18.7471 14.247 19.15 13.7499 19.15H3.99996C3.5029 19.15 3.09996 18.7471 3.09996 18.25Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconListCategory;
