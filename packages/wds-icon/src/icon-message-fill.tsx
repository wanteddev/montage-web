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
        d="M2.35016 12.0001C2.35016 6.67055 6.67061 2.3501 12.0002 2.3501C17.3297 2.3501 21.6501 6.67055 21.6501 12.0001C21.6501 13.5384 21.2895 14.9948 20.6477 16.2873L21.142 18.0997C21.2539 18.5098 21.3537 18.8758 21.4068 19.1763C21.4605 19.4809 21.4972 19.867 21.3499 20.2526C21.157 20.7579 20.7579 21.157 20.2527 21.3499C19.867 21.4971 19.4809 21.4605 19.1764 21.4067C18.8758 21.3537 18.5099 21.2538 18.0997 21.1419L16.2873 20.6476C14.9949 21.2895 13.5385 21.6501 12.0002 21.6501C6.67061 21.6501 2.35016 17.3296 2.35016 12.0001ZM7.09982 10C7.09982 9.50294 7.50276 9.1 7.99982 9.1H15.9998C16.4969 9.1 16.8998 9.50294 16.8998 10C16.8998 10.4971 16.4969 10.9 15.9998 10.9H7.99982C7.50276 10.9 7.09982 10.4971 7.09982 10ZM7.09982 14C7.09982 13.5029 7.50276 13.1 7.99982 13.1H12.7498C13.2469 13.1 13.6498 13.5029 13.6498 14C13.6498 14.4971 13.2469 14.9 12.7498 14.9H7.99982C7.50276 14.9 7.09982 14.4971 7.09982 14Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMessageFill;
