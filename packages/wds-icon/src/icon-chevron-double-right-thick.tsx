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
          d="M2.58098 4.91747C2.0733 4.40979 2.0733 3.58668 2.58098 3.079C3.08866 2.57132 3.91177 2.57132 4.41945 3.079L12.4194 11.079C12.9271 11.5867 12.9271 12.4098 12.4194 12.9174L4.41945 20.9174C3.91177 21.4251 3.08866 21.4251 2.58098 20.9174C2.0733 20.4097 2.0733 19.5866 2.58098 19.079L9.66172 11.9982L2.58098 4.91747ZM12.081 4.91747C11.5733 4.40979 11.5733 3.58668 12.081 3.079C12.5886 2.57132 13.4118 2.57132 13.9194 3.079L21.9194 11.079C22.4271 11.5867 22.4271 12.4098 21.9194 12.9174L13.9194 20.9174C13.4118 21.4251 12.5886 21.4251 12.081 20.9174C11.5733 20.4097 11.5733 19.5866 12.081 19.079L19.1617 11.9982L12.081 4.91747Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightThick;
