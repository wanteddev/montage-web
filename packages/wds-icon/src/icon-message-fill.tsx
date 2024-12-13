import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMessageFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.35015 11.9996C2.35015 6.67004 6.67058 2.3496 12.0001 2.3496C17.3296 2.3496 21.6501 6.67004 21.6501 11.9996C21.6501 13.5379 21.2895 14.9943 20.6476 16.2867L21.1419 18.0991C21.2538 18.5092 21.3536 18.8752 21.4067 19.1758C21.4605 19.4803 21.4971 19.8664 21.3499 20.2521C21.1569 20.7573 20.7578 21.1564 20.2526 21.3493C19.8669 21.4966 19.4809 21.4599 19.1763 21.4062C18.8757 21.3531 18.5098 21.2533 18.0997 21.1414L16.2872 20.6471C14.9948 21.2889 13.5384 21.6495 12.0001 21.6495C6.67058 21.6495 2.35015 17.3291 2.35015 11.9996ZM7.09979 9.99947C7.09979 9.50242 7.50273 9.09948 7.99979 9.09948H15.9998C16.4968 9.09948 16.8998 9.50242 16.8998 9.99947C16.8998 10.4965 16.4968 10.8995 15.9998 10.8995H7.99979C7.50273 10.8995 7.09979 10.4965 7.09979 9.99947ZM7.09979 13.9995C7.09979 13.5024 7.50273 13.0995 7.99979 13.0995H12.7498C13.2468 13.0995 13.6498 13.5024 13.6498 13.9995C13.6498 14.4965 13.2468 14.8995 12.7498 14.8995H7.99979C7.50273 14.8995 7.09979 14.4965 7.09979 13.9995Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMessageFill;
