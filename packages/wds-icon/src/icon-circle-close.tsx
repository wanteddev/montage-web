import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleClose = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.10003 12C2.10003 6.53245 6.53238 2.10009 12 2.10009C17.4676 2.10009 21.8999 6.53245 21.8999 12C21.8999 17.4676 17.4676 21.9 12 21.9C6.53238 21.9 2.10003 17.4676 2.10003 12ZM9.13637 7.86369C8.7849 7.51222 8.21506 7.51222 7.86359 7.86369C7.51212 8.21516 7.51212 8.785 7.86359 9.13647L10.7272 12.0001L7.86359 14.8637C7.51212 15.2151 7.51212 15.785 7.86359 16.1364C8.21506 16.4879 8.7849 16.4879 9.13637 16.1364L12 13.2728L14.8635 16.1364C15.215 16.4879 15.7849 16.4879 16.1363 16.1364C16.4878 15.785 16.4878 15.2151 16.1363 14.8637L13.2727 12.0001L16.1363 9.13647C16.4878 8.785 16.4878 8.21516 16.1363 7.86369C15.7849 7.51222 15.215 7.51222 14.8635 7.86369L12 10.7273L9.13637 7.86369Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleClose;
