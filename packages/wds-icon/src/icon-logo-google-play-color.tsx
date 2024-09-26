import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoGooglePlayColor = forwardRef<SVGSVGElement, Props>(
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
          d="M11.9443 11.5752L4.07383 19.926C4.3177 20.835 5.14539 21.5001 6.12827 21.5001C6.51995 21.5001 6.88945 21.3966 7.20722 21.2045L7.22939 21.1897L16.0827 16.0831L11.9369 11.5678L11.9443 11.5752Z"
          fill="#EA4335"
        />
        <path
          d="M19.9034 10.156H19.896L16.0753 7.9316L11.7669 11.767L16.0901 16.0902L19.896 13.8954C20.5611 13.5333 21.0119 12.8312 21.0119 12.0257C21.0119 11.2202 20.5685 10.5181 19.9034 10.1634V10.156Z"
          fill="#FBBC04"
        />
        <path
          d="M4.07388 4.08152C4.02954 4.25888 3.99998 4.43625 3.99998 4.62839V19.3864C3.99998 19.5785 4.02215 19.7559 4.07388 19.9332L12.2104 11.7968L4.07388 4.08152Z"
          fill="#4285F4"
        />
        <path
          d="M12.0034 12.0036L16.0753 7.93169L7.22939 2.80298C6.91162 2.61084 6.53473 2.49999 6.12827 2.49999C5.14539 2.49999 4.3177 3.17248 4.07383 4.07407L12.0034 11.9962V12.0036Z"
          fill="#34A853"
        />
      </Box>
    );
  },
);

export default IconLogoGooglePlayColor;
