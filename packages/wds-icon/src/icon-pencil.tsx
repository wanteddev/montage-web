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
        d="M15.9888 3.82176C17.1457 2.66487 19.0213 2.66487 20.1782 3.82176C21.3351 4.97864 21.3351 6.85432 20.1782 8.0112L7.55326 20.6362C7.38448 20.805 7.15556 20.8998 6.91687 20.8998H4.00021C3.50315 20.8998 3.10021 20.4968 3.10021 19.9998V17.0831C3.10021 16.8444 3.19503 16.6155 3.36381 16.4467L15.9888 3.82176ZM18.9054 5.09455C18.4515 4.6406 17.7155 4.6406 17.2616 5.09455L4.90021 17.4559V19.0998H6.54407L18.9054 6.73842C19.3594 6.28447 19.3594 5.54849 18.9054 5.09455Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencil;
