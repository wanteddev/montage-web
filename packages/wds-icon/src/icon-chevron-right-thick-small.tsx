import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightThickSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M8.58136 4.58091C8.07368 5.08859 8.07368 5.91169 8.58136 6.41937L14.1621 12.0001L8.58136 17.5808C8.07368 18.0885 8.07368 18.9116 8.58136 19.4192C9.08903 19.9269 9.91214 19.9269 10.4198 19.4192L16.9197 12.9193C17.4274 12.4116 17.4274 11.5885 16.9197 11.0808L10.4198 4.58091C9.91214 4.07323 9.08903 4.07323 8.58136 4.58091Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightThickSmall;
