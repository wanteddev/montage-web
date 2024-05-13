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
        d="M2.35022 12C2.35022 6.67043 6.67067 2.34998 12.0002 2.34998C17.3298 2.34998 21.6502 6.67043 21.6502 12C21.6502 13.5383 21.2896 14.9947 20.6478 16.2871L21.142 18.0995C21.2539 18.5097 21.3538 18.8757 21.4068 19.1762C21.4606 19.4808 21.4973 19.8668 21.35 20.2525C21.1571 20.7578 20.758 21.1569 20.2527 21.3498C19.8671 21.497 19.481 21.4604 19.1764 21.4066C18.8758 21.3535 18.51 21.2537 18.0998 21.1418L16.2874 20.6475C14.995 21.2894 13.5386 21.65 12.0002 21.65C6.67067 21.65 2.35022 17.3295 2.35022 12ZM12.9007 8.00012C12.9007 7.50307 12.4977 7.10012 12.0007 7.10012C11.5036 7.10012 11.1007 7.50307 11.1007 8.00012V11.1001H8.00067C7.50361 11.1001 7.10067 11.5031 7.10067 12.0001C7.10067 12.4972 7.50361 12.9001 8.00067 12.9001H11.1007V16.0001C11.1007 16.4972 11.5036 16.9001 12.0007 16.9001C12.4977 16.9001 12.9007 16.4972 12.9007 16.0001V12.9001H16.0007C16.4977 12.9001 16.9007 12.4972 16.9007 12.0001C16.9007 11.5031 16.4977 11.1001 16.0007 11.1001H12.9007V8.00012Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubblePlusFill;
