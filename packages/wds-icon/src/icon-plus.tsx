import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9997 3.10254C12.4968 3.10254 12.8997 3.50548 12.8997 4.00254V11.1025H19.9997C20.4968 11.1025 20.8997 11.5055 20.8997 12.0025C20.8997 12.4996 20.4968 12.9025 19.9997 12.9025H12.8997V20.0025C12.8997 20.4996 12.4968 20.9025 11.9997 20.9025C11.5027 20.9025 11.0997 20.4996 11.0997 20.0025V12.9025H3.99973C3.50268 12.9025 3.09973 12.4996 3.09973 12.0025C3.09973 11.5055 3.50268 11.1025 3.99973 11.1025H11.0997V4.00254C11.0997 3.50548 11.5027 3.10254 11.9997 3.10254Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlus;
