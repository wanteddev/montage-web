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
        d="M2.35021 12C2.35021 6.67052 6.67063 2.35009 12.0002 2.35009C17.3297 2.35009 21.6501 6.67052 21.6501 12C21.6501 13.5384 21.2895 14.9948 20.6477 16.2872L21.1419 18.0996C21.2538 18.5097 21.3537 18.8757 21.4067 19.1762C21.4605 19.4808 21.4971 19.8669 21.3499 20.2525C21.157 20.7578 20.7579 21.1569 20.2526 21.3498C19.867 21.497 19.4809 21.4604 19.1763 21.4066C18.8758 21.3535 18.5099 21.2537 18.0997 21.1418L16.2873 20.6475C14.9949 21.2894 13.5385 21.65 12.0002 21.65C6.67063 21.65 2.35021 17.3296 2.35021 12ZM12.9006 8.0002C12.9006 7.50315 12.4977 7.10021 12.0006 7.10021C11.5036 7.10021 11.1006 7.50315 11.1006 8.0002V11.1002H8.00063C7.50358 11.1002 7.10064 11.5031 7.10064 12.0002C7.10064 12.4972 7.50358 12.9002 8.00063 12.9002H11.1006V16.0002C11.1006 16.4972 11.5036 16.9002 12.0006 16.9002C12.4977 16.9002 12.9006 16.4972 12.9006 16.0002V12.9002H16.0006C16.4976 12.9002 16.9006 12.4972 16.9006 12.0002C16.9006 11.5031 16.4976 11.1002 16.0006 11.1002H12.9006V8.0002Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubblePlusFill;
