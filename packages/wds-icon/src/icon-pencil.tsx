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
        d="M15.9887 3.82175C17.1456 2.66487 19.0213 2.66487 20.1782 3.82175C21.335 4.97863 21.335 6.8543 20.1782 8.01118L7.55324 20.6361C7.38446 20.8049 7.15554 20.8997 6.91685 20.8997H4.0002C3.50315 20.8997 3.1002 20.4968 3.1002 19.9997V17.0831C3.1002 16.8444 3.19502 16.6155 3.36381 16.4467L15.9887 3.82175ZM18.9054 5.09453C18.4514 4.64059 17.7155 4.64059 17.2615 5.09453L4.90019 17.4559V19.0997H6.54406L18.9054 6.7384C19.3593 6.28446 19.3593 5.54847 18.9054 5.09453Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencil;
