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
        d="M9.31942 15.3804C9.31942 15.8605 9.70856 16.2496 10.1886 16.2496C10.6686 16.2496 11.0578 15.8605 11.0578 15.3804V13.372H12.2323C14.1703 13.372 15.4976 12.2268 15.4976 10.553C15.4976 8.89103 14.1703 7.74583 12.2323 7.74583H10.9194C10.3594 7.74583 10.0793 7.74583 9.86543 7.85483C9.67727 7.9507 9.52429 8.10368 9.42842 8.29184C9.31942 8.50575 9.31942 8.78578 9.31942 9.34583V15.3804ZM12.2558 11.7863H11.0578V9.33148H12.2558C13.1896 9.33148 13.7475 9.78956 13.7475 10.553C13.7475 11.3224 13.1896 11.7863 12.2558 11.7863Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.09996C6.53232 2.09996 2.09996 6.53232 2.09996 11.9999C2.09996 17.4675 6.53232 21.8999 11.9999 21.8999C17.4675 21.8999 21.8998 17.4675 21.8998 11.9999C21.8998 6.53232 17.4675 2.09996 11.9999 2.09996ZM3.89996 11.9999C3.89996 7.52643 7.52643 3.89996 11.9999 3.89996C16.4734 3.89996 20.0999 7.52643 20.0999 11.9999C20.0999 16.4734 16.4734 20.0999 11.9999 20.0999C7.52643 20.0999 3.89996 16.4734 3.89996 11.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePoint;
