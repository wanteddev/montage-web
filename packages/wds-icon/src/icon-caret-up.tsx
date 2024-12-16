import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCaretUp = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.8631 9.29316C13.2252 8.50813 12.9063 8.11561 12.5223 7.9731C12.1856 7.84812 11.8152 7.84812 11.4785 7.9731C11.0945 8.11561 10.7756 8.50813 10.1377 9.29317L8.68008 11.0872C7.66355 12.3383 7.15528 12.9639 7.15192 13.4911C7.14899 13.9494 7.35584 14.384 7.71345 14.6708C8.12471 15.0006 8.93072 15.0006 10.5427 15.0006H13.4581C15.0701 15.0006 15.8761 15.0006 16.2874 14.6708C16.645 14.384 16.8518 13.9494 16.8489 13.4911C16.8455 12.9639 16.3373 12.3383 15.3207 11.0872L13.8631 9.29316Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCaretUp;
