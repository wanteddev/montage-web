import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleRightThick = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M2.58094 4.91746C2.07326 4.40978 2.07326 3.58667 2.58094 3.07899C3.08862 2.57131 3.91173 2.57131 4.41941 3.07899L12.4194 11.0789C12.927 11.5866 12.927 12.4097 12.4194 12.9174L4.41941 20.9174C3.91173 21.4251 3.08862 21.4251 2.58094 20.9174C2.07327 20.4097 2.07326 19.5866 2.58094 19.0789L9.66166 11.9982L2.58094 4.91746ZM12.0809 4.91746C11.5732 4.40978 11.5732 3.58667 12.0809 3.07899C12.5886 2.57131 13.4117 2.57131 13.9194 3.07899L21.9193 11.0789C22.427 11.5866 22.427 12.4097 21.9193 12.9174L13.9194 20.9174C13.4117 21.4251 12.5886 21.4251 12.0809 20.9174C11.5732 20.4097 11.5732 19.5866 12.0809 19.0789L19.1616 11.9982L12.0809 4.91746Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightThick;
