import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPencil = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M15.9888 3.82177C17.1456 2.66488 19.0213 2.66488 20.1782 3.82177C21.3351 4.97866 21.3351 6.85434 20.1782 8.01122L7.55322 20.6362C7.38444 20.805 7.15552 20.8998 6.91682 20.8998H4.00016C3.5031 20.8998 3.10016 20.4969 3.10016 19.9998V17.0832C3.10016 16.8445 3.19498 16.6155 3.36376 16.4468L15.9888 3.82177ZM18.9054 5.09456C18.4515 4.64062 17.7155 4.64062 17.2615 5.09456L4.90016 17.456V19.0998H6.54403L18.9054 6.73843C19.3594 6.28449 19.3594 5.5485 18.9054 5.09456Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencil;
