import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.3636 21.1361C11.7151 21.4876 12.285 21.4876 12.6364 21.1361L19.6364 14.1362C19.9879 13.7847 19.9879 13.2149 19.6364 12.8634C19.2849 12.5119 18.7151 12.5119 18.3636 12.8634L12.9 18.327L12.9 3.49984C12.9 3.00278 12.4971 2.59984 12 2.59984C11.503 2.59984 11.1 3.00278 11.1 3.49984V18.327L5.63647 12.8634C5.28499 12.5119 4.71515 12.5119 4.36368 12.8634C4.01221 13.2149 4.01221 13.7847 4.36368 14.1362L11.3636 21.1361Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDown;
