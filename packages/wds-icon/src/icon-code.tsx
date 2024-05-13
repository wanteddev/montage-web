import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCode = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M14.2183 3.12669C14.7005 3.24725 14.9937 3.73589 14.8731 4.2181L10.8731 20.2181C10.7526 20.7003 10.2639 20.9935 9.78172 20.873C9.2995 20.7524 9.00632 20.2638 9.12687 19.7815L13.1269 3.78154C13.2474 3.29932 13.7361 3.00614 14.2183 3.12669Z"
        fill="currentColor"
      />
      <path
        d="M16.3636 6.36343C16.0121 6.7149 16.0121 7.28475 16.3636 7.63622L20.7272 11.9998L16.3636 16.3634C16.0121 16.7149 16.0121 17.2847 16.3636 17.6362C16.7151 17.9877 17.2849 17.9877 17.6364 17.6362L22.6364 12.6362C22.9879 12.2847 22.9879 11.7149 22.6364 11.3634L17.6364 6.36343C17.2849 6.01195 16.7151 6.01195 16.3636 6.36343Z"
        fill="currentColor"
      />
      <path
        d="M7.63649 7.63622C7.98797 7.28475 7.98797 6.7149 7.63649 6.36343C7.28502 6.01195 6.71517 6.01195 6.3637 6.36343L1.3637 11.3634C1.01223 11.7149 1.01223 12.2847 1.3637 12.6362L6.3637 17.6362C6.71517 17.9877 7.28502 17.9877 7.63649 17.6362C7.98797 17.2847 7.98797 16.7149 7.63649 16.3634L3.27289 11.9998L7.63649 7.63622Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCode;
