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
        d="M9.31942 15.3806C9.31942 15.8606 9.70856 16.2497 10.1886 16.2497C10.6686 16.2497 11.0578 15.8606 11.0578 15.3806V13.3721H12.2323C14.1703 13.3721 15.4976 12.2269 15.4976 10.5531C15.4976 8.89115 14.1703 7.74596 12.2323 7.74596H10.9194C10.3594 7.74596 10.0793 7.74596 9.86543 7.85495C9.67727 7.95082 9.52429 8.1038 9.42842 8.29196C9.31942 8.50587 9.31942 8.7859 9.31942 9.34595V15.3806ZM12.2558 11.7864H11.0578V9.33161H12.2558C13.1896 9.33161 13.7475 9.78968 13.7475 10.5531C13.7475 11.3225 13.1896 11.7864 12.2558 11.7864Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.10009C6.53232 2.10009 2.09996 6.53245 2.09996 12C2.09996 17.4676 6.53232 21.9 11.9999 21.9C17.4675 21.9 21.8998 17.4676 21.8998 12C21.8998 6.53245 17.4675 2.10009 11.9999 2.10009ZM3.89996 12C3.89996 7.52655 7.52643 3.90008 11.9999 3.90008C16.4734 3.90008 20.0999 7.52655 20.0999 12C20.0999 16.4735 16.4734 20.1 11.9999 20.1C7.52643 20.1 3.89996 16.4735 3.89996 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePoint;
