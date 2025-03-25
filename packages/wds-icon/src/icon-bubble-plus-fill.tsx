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
        d="M2.35022 12C2.35022 6.67043 6.67066 2.34998 12.0002 2.34998C17.3297 2.34998 21.6501 6.67043 21.6501 12C21.6501 13.5383 21.2895 14.9947 20.6477 16.2871L21.142 18.0995C21.2539 18.5097 21.3537 18.8757 21.4068 19.1762C21.4606 19.4808 21.4972 19.8668 21.3499 20.2525C21.157 20.7578 20.7579 21.1569 20.2527 21.3498C19.867 21.497 19.481 21.4604 19.1764 21.4066C18.8758 21.3535 18.5099 21.2537 18.0997 21.1418L16.2873 20.6475C14.9949 21.2894 13.5385 21.65 12.0002 21.65C6.67066 21.65 2.35022 17.3295 2.35022 12ZM12.9006 8.00012C12.9006 7.50307 12.4977 7.10012 12.0006 7.10012C11.5036 7.10012 11.1006 7.50307 11.1006 8.00012V11.1001H8.00066C7.5036 11.1001 7.10066 11.5031 7.10066 12.0001C7.10066 12.4972 7.5036 12.9001 8.00066 12.9001H11.1006V16.0001C11.1006 16.4972 11.5036 16.9001 12.0006 16.9001C12.4977 16.9001 12.9006 16.4972 12.9006 16.0001V12.9001H16.0006C16.4977 12.9001 16.9006 12.4972 16.9006 12.0001C16.9006 11.5031 16.4977 11.1001 16.0006 11.1001H12.9006V8.00012Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubblePlusFill;
