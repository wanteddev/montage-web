import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMoon = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.76126 2.54294C10.0163 2.81234 10.08 3.21067 9.92152 3.54613C9.42702 4.59298 9.15005 5.76345 9.15005 7.00111C9.15005 11.4746 12.7765 15.1011 17.25 15.1011C18.3318 15.1011 19.3619 14.8895 20.3029 14.5063C20.6465 14.3664 21.0407 14.4516 21.2958 14.721C21.5509 14.9904 21.6145 15.3888 21.4561 15.7242C19.8722 19.0774 16.4583 21.4004 12.5 21.4004C7.03244 21.4004 2.60008 16.968 2.60008 11.5005C2.60008 7.35158 5.15195 3.80087 8.76831 2.3282C9.11192 2.18828 9.50618 2.27354 9.76126 2.54294ZM7.53218 5.10211C5.62562 6.58463 4.40008 8.90005 4.40008 11.5005C4.40008 15.9739 8.02655 19.6004 12.5 19.6004C14.943 19.6004 17.1344 18.5189 18.6201 16.8069C18.1721 16.869 17.7146 16.9011 17.25 16.9011C11.7824 16.9011 7.35006 12.4687 7.35006 7.00111C7.35006 6.352 7.41265 5.71704 7.53218 5.10211Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoon;
