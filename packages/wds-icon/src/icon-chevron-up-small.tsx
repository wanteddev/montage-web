import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUpSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.36352 15.6365C4.71499 15.988 5.28484 15.988 5.63631 15.6365L11.9999 9.27289L18.3635 15.6365C18.715 15.988 19.2848 15.988 19.6363 15.6365C19.9878 15.285 19.9878 14.7152 19.6363 14.3637L12.6363 7.3637C12.2848 7.01223 11.715 7.01223 11.3635 7.3637L4.36352 14.3637C4.01205 14.7152 4.01205 15.285 4.36352 15.6365Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpSmall;
