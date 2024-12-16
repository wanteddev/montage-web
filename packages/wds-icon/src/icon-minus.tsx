import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMinus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.09984 11.9996C3.09984 11.5025 3.50278 11.0996 3.99984 11.0996H19.9998C20.4968 11.0996 20.8998 11.5025 20.8998 11.9996C20.8998 12.4966 20.4968 12.8996 19.9998 12.8996H3.99984C3.50278 12.8996 3.09984 12.4966 3.09984 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMinus;
