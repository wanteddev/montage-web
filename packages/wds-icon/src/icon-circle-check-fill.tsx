import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleCheckFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.0999 12C2.0999 6.53245 6.53226 2.10009 11.9999 2.10009C17.4674 2.10009 21.8998 6.53245 21.8998 12C21.8998 17.4676 17.4674 21.9 11.9999 21.9C6.53226 21.9 2.0999 17.4676 2.0999 12ZM16.6465 9.87589C16.9922 9.51873 16.9829 8.94896 16.6258 8.60327C16.2686 8.25758 15.6989 8.26687 15.3532 8.62402L10.6772 13.455L8.64743 11.3522C8.30222 10.9945 7.73247 10.9845 7.37484 11.3297C7.01722 11.6749 7.00716 12.2446 7.35236 12.6023L10.0288 15.375C10.1983 15.5505 10.4317 15.6498 10.6757 15.6499C10.9197 15.6501 11.1533 15.5512 11.323 15.3759L16.6465 9.87589Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheckFill;
