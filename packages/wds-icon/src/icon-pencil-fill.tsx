import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPencilFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.6706 2.60764C18.289 2.48365 17.8779 2.48365 17.4963 2.60764C17.2241 2.69607 17.0138 2.84649 16.8437 2.99091C16.6877 3.12334 16.5165 3.2945 16.3367 3.47434L16.3157 3.49541L3.1001 16.711V20.9004H7.28956L20.5051 7.68487L20.5262 7.66383C20.706 7.48401 20.8772 7.31288 21.0096 7.15687C21.154 6.98676 21.3045 6.77639 21.3929 6.50423C21.5169 6.12263 21.5169 5.71157 21.3929 5.32997C21.3045 5.05781 21.154 4.84745 21.0096 4.67733C20.8772 4.52133 20.706 4.35021 20.5262 4.1704L19.8302 3.47437C19.6503 3.29452 19.4792 3.12335 19.3232 2.99091C19.1531 2.84649 18.9427 2.69607 18.6706 2.60764Z"
      />
    </Box>
  );
});

export default IconPencilFill;
