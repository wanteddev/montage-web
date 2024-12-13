import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.58136 3.08022C7.07368 3.5879 7.07368 4.41101 7.58136 4.91869L14.6621 11.9994L7.58136 19.0802C7.07368 19.5879 7.07369 20.411 7.58136 20.9186C8.08904 21.4263 8.91216 21.4263 9.41984 20.9186L17.4198 12.9187C17.9275 12.411 17.9275 11.5879 17.4198 11.0802L9.41984 3.08022C8.91216 2.57254 8.08904 2.57254 7.58136 3.08022Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightThick;
