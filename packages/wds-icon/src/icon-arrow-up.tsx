import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowUp = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.6365 2.86345C12.285 2.51198 11.7152 2.51198 11.3637 2.86345L4.36375 9.86342C4.01228 10.2149 4.01228 10.7847 4.36375 11.1362C4.71522 11.4877 5.28506 11.4877 5.63653 11.1362L11.1001 5.67262V20.4998C11.1001 20.9968 11.5031 21.3998 12.0001 21.3998C12.4972 21.3998 12.9001 20.9968 12.9001 20.4998V5.67262L18.3637 11.1362C18.7152 11.4877 19.285 11.4877 19.6365 11.1362C19.988 10.7847 19.988 10.2149 19.6365 9.86342L12.6365 2.86345Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUp;
