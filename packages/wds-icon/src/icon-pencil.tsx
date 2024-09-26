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
        d="M15.9887 3.8215C17.1456 2.66462 19.0213 2.66462 20.1782 3.8215C21.335 4.97839 21.335 6.85406 20.1782 8.01094L7.55324 20.6359C7.38446 20.8047 7.15554 20.8995 6.91685 20.8995H4.0002C3.50315 20.8995 3.1002 20.4965 3.1002 19.9995V17.0828C3.1002 16.8441 3.19502 16.6152 3.36381 16.4464L15.9887 3.8215ZM18.9054 5.09429C18.4514 4.64035 17.7155 4.64035 17.2615 5.09429L4.90019 17.4556V19.0995H6.54406L18.9054 6.73815C19.3593 6.28421 19.3593 5.54823 18.9054 5.09429Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencil;
