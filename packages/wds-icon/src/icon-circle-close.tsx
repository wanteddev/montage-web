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
        d="M2.09998 12.0001C2.09998 6.53248 6.53235 2.1001 12 2.1001C17.4676 2.1001 21.9 6.53248 21.9 12.0001C21.9 17.4677 17.4676 21.9001 12 21.9001C6.53235 21.9001 2.09998 17.4677 2.09998 12.0001ZM9.13636 7.86373C8.78489 7.51225 8.21504 7.51225 7.86357 7.86373C7.51209 8.2152 7.51209 8.78505 7.86357 9.13652L10.7272 12.0001L7.86357 14.8637C7.51209 15.2152 7.51209 15.785 7.86357 16.1365C8.21504 16.488 8.78489 16.488 9.13636 16.1365L12 13.2729L14.8636 16.1365C15.215 16.488 15.7849 16.488 16.1364 16.1365C16.4878 15.785 16.4878 15.2152 16.1364 14.8637L13.2728 12.0001L16.1364 9.13652C16.4878 8.78505 16.4878 8.2152 16.1364 7.86373C15.7849 7.51225 15.215 7.51225 14.8636 7.86373L12 10.7273L9.13636 7.86373Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleClose;
