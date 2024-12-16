import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBubblePlusFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.35021 11.9999C2.35021 6.67041 6.67065 2.34997 12.0002 2.34997C17.3297 2.34997 21.6501 6.67041 21.6501 11.9999C21.6501 13.5383 21.2895 14.9947 20.6477 16.2871L21.142 18.0995C21.2539 18.5096 21.3537 18.8756 21.4068 19.1761C21.4606 19.4807 21.4972 19.8668 21.3499 20.2524C21.157 20.7577 20.7579 21.1568 20.2527 21.3497C19.867 21.497 19.481 21.4603 19.1764 21.4065C18.8758 21.3535 18.5099 21.2537 18.0997 21.1418L16.2873 20.6475C14.9949 21.2893 13.5385 21.6499 12.0002 21.6499C6.67065 21.6499 2.35021 17.3295 2.35021 11.9999ZM12.9006 8.0001C12.9006 7.50305 12.4977 7.1001 12.0006 7.1001C11.5036 7.1001 11.1006 7.50305 11.1006 8.0001V11.1001H8.00065C7.5036 11.1001 7.10065 11.503 7.10065 12.0001C7.10065 12.4971 7.5036 12.9001 8.00065 12.9001H11.1006V16.0001C11.1006 16.4971 11.5036 16.9001 12.0006 16.9001C12.4977 16.9001 12.9006 16.4971 12.9006 16.0001V12.9001H16.0006C16.4977 12.9001 16.9006 12.4971 16.9006 12.0001C16.9006 11.503 16.4977 11.1001 16.0006 11.1001H12.9006V8.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubblePlusFill;
