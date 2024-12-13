import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCirclePlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.8999 7.99998C12.8999 7.50292 12.497 7.09998 11.9999 7.09998C11.5029 7.09998 11.0999 7.50292 11.0999 7.99998V11.1H7.99995C7.5029 11.1 7.09995 11.5029 7.09995 12C7.09995 12.497 7.5029 12.9 7.99995 12.9H11.0999V16C11.0999 16.497 11.5029 16.9 11.9999 16.9C12.497 16.9 12.8999 16.497 12.8999 16V12.9H15.9999C16.497 12.9 16.8999 12.497 16.8999 12C16.8999 11.5029 16.497 11.1 15.9999 11.1H12.8999V7.99998Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.10009C6.5323 2.10009 2.09994 6.53246 2.09994 12.0001C2.09994 17.4677 6.5323 21.9 11.9999 21.9C17.4675 21.9 21.8999 17.4677 21.8999 12.0001C21.8999 6.53246 17.4675 2.10009 11.9999 2.10009ZM3.89994 12.0001C3.89994 7.52657 7.52642 3.90009 11.9999 3.90009C16.4734 3.90009 20.0999 7.52657 20.0999 12.0001C20.0999 16.4736 16.4734 20.1 11.9999 20.1C7.52642 20.1 3.89994 16.4736 3.89994 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlus;
