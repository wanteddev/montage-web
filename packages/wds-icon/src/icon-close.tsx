import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconClose = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.86351 4.86344C5.21498 4.51197 5.78482 4.51197 6.1363 4.86345L11.9999 10.727L17.8635 4.86345C18.2149 4.51197 18.7848 4.51197 19.1363 4.86344C19.4877 5.21492 19.4877 5.78476 19.1363 6.13623L13.2727 11.9998L19.1363 17.8634C19.4877 18.2149 19.4877 18.7847 19.1363 19.1362C18.7848 19.4877 18.2149 19.4877 17.8635 19.1362L11.9999 13.2726L6.1363 19.1362C5.78482 19.4877 5.21498 19.4877 4.86351 19.1362C4.51204 18.7847 4.51203 18.2149 4.86351 17.8634L10.7271 11.9998L4.86351 6.13623C4.51203 5.78476 4.51204 5.21492 4.86351 4.86344Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClose;
