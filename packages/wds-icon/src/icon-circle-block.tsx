import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleBlock = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12 2.1001C6.53242 2.1001 2.10004 6.53248 2.10004 12.0001C2.10004 17.4677 6.53242 21.9001 12 21.9001C17.4677 21.9001 21.9 17.4677 21.9 12.0001C21.9 6.53248 17.4677 2.1001 12 2.1001ZM3.90004 12.0001C3.90004 7.52659 7.52653 3.9001 12 3.9001C13.9125 3.9001 15.6702 4.56292 17.056 5.67139L5.67133 17.056C4.56286 15.6703 3.90004 13.9126 3.90004 12.0001ZM6.94412 18.3288C8.32982 19.4373 10.0875 20.1001 12 20.1001C16.4735 20.1001 20.1 16.4736 20.1 12.0001C20.1 10.0876 19.4372 8.32988 18.3287 6.94418L6.94412 18.3288Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleBlock;
