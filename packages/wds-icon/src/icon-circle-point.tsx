import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCirclePoint = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.31942 15.3806C9.31942 15.8606 9.70856 16.2498 10.1886 16.2498C10.6686 16.2498 11.0578 15.8606 11.0578 15.3806V13.3721H12.2323C14.1703 13.3721 15.4976 12.2269 15.4976 10.5532C15.4976 8.89117 14.1703 7.74598 12.2323 7.74598H10.9194C10.3594 7.74598 10.0793 7.74598 9.86542 7.85497C9.67726 7.95084 9.52428 8.10382 9.42841 8.29198C9.31942 8.5059 9.31942 8.78592 9.31942 9.34597V15.3806ZM12.2558 11.7865H11.0578V9.33163H12.2558C13.1896 9.33163 13.7475 9.78971 13.7475 10.5532C13.7475 11.3225 13.1896 11.7865 12.2558 11.7865Z"
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

export default IconCirclePoint;
