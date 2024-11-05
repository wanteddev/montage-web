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
        d="M11.6086 2.41168C12.2336 1.42732 13.6097 1.22101 14.4832 2.03436C18.5796 5.84861 21.1493 9.50835 21.1493 13.6003C21.1493 18.5157 17.3278 22.4003 11.9993 22.4003C9.36675 22.4003 7.07293 21.5018 5.43185 19.9241C3.78867 18.3444 2.84935 16.1303 2.84935 13.6003C2.84935 10.8748 3.96076 8.263 5.85927 6.26235C6.48748 5.60033 7.48768 5.62908 8.11054 6.18966L8.81013 6.81929L11.6086 2.41168ZM8.49932 15.6C8.49932 17.4999 10.0493 18.9999 11.9993 18.9999C13.9493 18.9999 15.4993 17.4999 15.4993 15.6C15.4993 13.7 13.9493 12.2 11.9993 10.5C10.0493 12.2 8.49932 13.7 8.49932 15.6Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFireFill;
