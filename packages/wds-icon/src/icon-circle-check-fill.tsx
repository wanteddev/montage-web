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
        d="M2.0999 11.9999C2.0999 6.53232 6.53226 2.09996 11.9999 2.09996C17.4674 2.09996 21.8998 6.53232 21.8998 11.9999C21.8998 17.4675 17.4674 21.8999 11.9999 21.8999C6.53226 21.8999 2.0999 17.4675 2.0999 11.9999ZM16.6465 9.87576C16.9922 9.51861 16.9829 8.94884 16.6258 8.60315C16.2686 8.25745 15.6989 8.26674 15.3532 8.6239L10.6772 13.4548L8.64743 11.352C8.30222 10.9944 7.73247 10.9843 7.37484 11.3296C7.01722 11.6748 7.00716 12.2445 7.35236 12.6021L10.0288 15.3749C10.1983 15.5504 10.4317 15.6496 10.6757 15.6498C10.9197 15.65 11.1533 15.5511 11.323 15.3757L16.6465 9.87576Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheckFill;
