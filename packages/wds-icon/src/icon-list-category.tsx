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
        d="M3.09996 5.75008C3.09996 5.25302 3.50291 4.85008 3.99996 4.85008H19.9999C20.497 4.85008 20.8999 5.25302 20.8999 5.75008C20.8999 6.24713 20.497 6.65007 19.9999 6.65007H3.99996C3.50291 6.65007 3.09996 6.24713 3.09996 5.75008Z"
        fill="currentColor"
      />
      <path
        d="M3.09998 12.0001C3.09998 11.503 3.50292 11.1001 3.99998 11.1001H19.9999C20.497 11.1001 20.8999 11.503 20.8999 12.0001C20.8999 12.4971 20.497 12.9 19.9999 12.9H3.99998C3.50292 12.9 3.09998 12.4971 3.09998 12.0001Z"
        fill="currentColor"
      />
      <path
        d="M3.09996 18.25C3.09996 17.753 3.50291 17.35 3.99996 17.35H13.7499C14.247 17.35 14.6499 17.753 14.6499 18.25C14.6499 18.7471 14.247 19.15 13.7499 19.15H3.99996C3.50291 19.15 3.09996 18.7471 3.09996 18.25Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconListCategory;
