import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleExclamation = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.9999 16C12.9999 16.5522 12.5522 17 11.9999 17C11.4476 17 10.9999 16.5522 10.9999 16C10.9999 15.4477 11.4476 15 11.9999 15C12.5522 15 12.9999 15.4477 12.9999 16Z"
        fill="currentColor"
      />
      <path
        d="M12.9 7.99998C12.9 7.50292 12.4971 7.09998 12 7.09998C11.5029 7.09998 11.1 7.50292 11.1 7.99998V12.5C11.1 12.997 11.5029 13.4 12 13.4C12.4971 13.4 12.9 12.997 12.9 12.5V7.99998Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09994 12.0001C2.09994 6.53246 6.5323 2.10009 11.9999 2.10009C17.4675 2.10009 21.8999 6.53246 21.8999 12.0001C21.8999 17.4677 17.4675 21.9 11.9999 21.9C6.5323 21.9 2.09994 17.4677 2.09994 12.0001ZM11.9999 3.90009C7.52642 3.90009 3.89994 7.52657 3.89994 12.0001C3.89994 16.4736 7.52642 20.1 11.9999 20.1C16.4734 20.1 20.0999 16.4736 20.0999 12.0001C20.0999 7.52657 16.4734 3.90009 11.9999 3.90009Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleExclamation;
