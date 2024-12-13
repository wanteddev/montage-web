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
          d="M8.58132 4.58092C8.07364 5.0886 8.07364 5.91171 8.58132 6.41939L14.162 12.0001L8.58132 17.5808C8.07364 18.0885 8.07364 18.9116 8.58132 19.4193C9.089 19.927 9.9121 19.927 10.4198 19.4193L16.9197 12.9193C17.4274 12.4117 17.4274 11.5885 16.9197 11.0809L10.4198 4.58092C9.9121 4.07324 9.089 4.07324 8.58132 4.58092Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightThickSmall;
