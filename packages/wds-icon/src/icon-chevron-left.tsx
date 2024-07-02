import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.1363 3.36293C16.4878 3.7144 16.4878 4.28425 16.1363 4.63571L8.7728 11.9992L16.1363 19.3628C16.4878 19.7142 16.4878 20.2841 16.1363 20.6356C15.7849 20.987 15.215 20.987 14.8635 20.6356L6.86363 12.6356C6.51216 12.2842 6.51216 11.7143 6.86363 11.3629L14.8635 3.36293C15.215 3.01147 15.7849 3.01147 16.1363 3.36293Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeft;
