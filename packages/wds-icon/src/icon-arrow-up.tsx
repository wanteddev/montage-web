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
        d="M12.6364 2.86344C12.285 2.51197 11.7151 2.51197 11.3636 2.86344L4.36368 9.8634C4.01221 10.2149 4.01221 10.7847 4.36368 11.1362C4.71515 11.4877 5.28499 11.4877 5.63646 11.1362L11.1 5.67262V20.4997C11.1 20.9968 11.503 21.3997 12 21.3997C12.4971 21.3997 12.9 20.9968 12.9 20.4997V5.67262L18.3636 11.1362C18.7151 11.4877 19.2849 11.4877 19.6364 11.1362C19.9879 10.7847 19.9879 10.2149 19.6364 9.8634L12.6364 2.86344Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUp;
