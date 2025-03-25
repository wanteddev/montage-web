import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFireFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.6086 2.41169C12.2336 1.42733 13.6097 1.22102 14.4833 2.03437C18.5797 5.84864 21.1493 9.5084 21.1493 13.6004C21.1493 18.5158 17.3279 22.4004 11.9993 22.4004C9.36677 22.4004 7.07295 21.5019 5.43187 19.9242C3.78869 18.3445 2.84937 16.1304 2.84937 13.6004C2.84937 10.8748 3.96077 8.26304 5.85929 6.26238C6.4875 5.60036 7.4877 5.62911 8.11057 6.18969L8.81015 6.81932L11.6086 2.41169ZM8.49935 15.6C8.49935 17.5 10.0493 19 11.9993 19C13.9493 19 15.4993 17.5 15.4993 15.6C15.4993 13.7 13.9493 12.2 11.9993 10.5C10.0493 12.2 8.49935 13.7 8.49935 15.6Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFireFill;
