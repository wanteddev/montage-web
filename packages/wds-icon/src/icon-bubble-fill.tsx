import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBubbleFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.3501 12.0006C2.3501 6.67104 6.67055 2.35059 12.0001 2.35059C17.3296 2.35059 21.6501 6.67104 21.6501 12.0006C21.6501 13.5389 21.2895 14.9953 20.6476 16.2877L21.142 18.1003C21.2539 18.5104 21.3537 18.8763 21.4067 19.1768C21.4605 19.4814 21.4971 19.8674 21.3499 20.2531C21.157 20.7584 20.7579 21.1575 20.2526 21.3504C19.867 21.4976 19.4809 21.461 19.1763 21.4072C18.8758 21.3541 18.5099 21.2544 18.0998 21.1425L16.2873 20.6481C14.9948 21.29 13.5384 21.6506 12.0001 21.6506C6.67055 21.6506 2.3501 17.3301 2.3501 12.0006Z"
      />
    </Box>
  );
});

export default IconBubbleFill;
