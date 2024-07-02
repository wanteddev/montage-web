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
        d="M2.35021 11.9995C2.35021 6.67003 6.67063 2.3496 12.0002 2.3496C17.3297 2.3496 21.6501 6.67003 21.6501 11.9995C21.6501 13.5379 21.2895 14.9943 20.6477 16.2867L21.1419 18.0991C21.2538 18.5092 21.3537 18.8752 21.4067 19.1757C21.4605 19.4803 21.4971 19.8664 21.3499 20.252C21.157 20.7573 20.7579 21.1564 20.2526 21.3493C19.867 21.4965 19.4809 21.4599 19.1763 21.4061C18.8758 21.3531 18.5099 21.2532 18.0997 21.1413L16.2873 20.6471C14.9949 21.2889 13.5385 21.6495 12.0002 21.6495C6.67063 21.6495 2.35021 17.3291 2.35021 11.9995ZM7.09984 9.99946C7.09984 9.50241 7.50278 9.09947 7.99984 9.09947H15.9998C16.4968 9.09947 16.8998 9.50241 16.8998 9.99946C16.8998 10.4965 16.4968 10.8995 15.9998 10.8995H7.99984C7.50278 10.8995 7.09984 10.4965 7.09984 9.99946ZM7.09984 13.9994C7.09984 13.5024 7.50278 13.0994 7.99984 13.0994H12.7498C13.2469 13.0994 13.6498 13.5024 13.6498 13.9994C13.6498 14.4965 13.2469 14.8994 12.7498 14.8994H7.99984C7.50278 14.8994 7.09984 14.4965 7.09984 13.9994Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMessageFill;
