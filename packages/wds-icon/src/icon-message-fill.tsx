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
        d="M2.35021 11.9998C2.35021 6.67027 6.67063 2.34984 12.0002 2.34984C17.3297 2.34984 21.6501 6.67027 21.6501 11.9998C21.6501 13.5381 21.2895 14.9945 20.6477 16.2869L21.1419 18.0993C21.2538 18.5094 21.3537 18.8754 21.4067 19.176C21.4605 19.4806 21.4971 19.8666 21.3499 20.2523C21.157 20.7575 20.7579 21.1566 20.2526 21.3495C19.867 21.4968 19.4809 21.4601 19.1763 21.4064C18.8758 21.3533 18.5099 21.2535 18.0997 21.1416L16.2873 20.6473C14.9949 21.2891 13.5385 21.6497 12.0002 21.6497C6.67063 21.6497 2.35021 17.3293 2.35021 11.9998ZM7.09984 9.9997C7.09984 9.50265 7.50278 9.09971 7.99984 9.09971H15.9998C16.4968 9.09971 16.8998 9.50265 16.8998 9.9997C16.8998 10.4968 16.4968 10.8997 15.9998 10.8997H7.99984C7.50278 10.8997 7.09984 10.4968 7.09984 9.9997ZM7.09984 13.9997C7.09984 13.5026 7.50278 13.0997 7.99984 13.0997H12.7498C13.2469 13.0997 13.6498 13.5026 13.6498 13.9997C13.6498 14.4967 13.2469 14.8997 12.7498 14.8997H7.99984C7.50278 14.8997 7.09984 14.4967 7.09984 13.9997Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMessageFill;
