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
        d="M12.0001 2.34996C6.67057 2.34996 2.35015 6.67039 2.35015 11.9999C2.35015 17.3294 6.67057 21.6499 12.0001 21.6499C13.5384 21.6499 14.9948 21.2893 16.2872 20.6474L18.0996 21.1417C18.5098 21.2536 18.8757 21.3534 19.1763 21.4065C19.4808 21.4603 19.8669 21.4969 20.2526 21.3497C20.7578 21.1567 21.1569 20.7576 21.3498 20.2524C21.4971 19.8667 21.4604 19.4807 21.4067 19.1761C21.3536 18.8755 21.2538 18.5097 21.1419 18.0995L20.6476 16.2871C21.2894 14.9946 21.65 13.5382 21.65 11.9999C21.65 6.67039 17.3296 2.34996 12.0001 2.34996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubbleFill;
