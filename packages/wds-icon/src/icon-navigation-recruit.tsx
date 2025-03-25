import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconNavigationRecruit = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.8551 2.54999C8.92209 2.54999 7.35509 4.11699 7.35509 6.04999V6.1547H6.14987C4.41018 6.1547 2.99988 7.56459 2.99988 9.30378V18.3012C2.99988 20.0404 4.41018 21.4503 6.14987 21.4503H17.8498C19.5895 21.4503 20.9998 20.0404 20.9998 18.3012V9.30378C20.9998 7.56459 19.5895 6.1547 17.8498 6.1547H16.5551V6.04999C16.5551 4.11699 14.9881 2.54999 13.0551 2.54999H10.8551ZM14.5551 6.1547V6.04999C14.5551 5.22156 13.8835 4.54999 13.0551 4.54999H10.8551C10.0266 4.54999 9.35508 5.22156 9.35508 6.04999V6.1547H14.5551Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationRecruit;
