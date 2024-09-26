import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoKakao = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.0003 3.15428C6.79574 3.15428 2.57176 6.43541 2.57176 10.4708C2.57176 12.9882 4.2029 15.1851 6.69203 16.5239L5.64546 20.3613C5.62572 20.4377 5.62978 20.5182 5.65711 20.5922C5.68444 20.6661 5.73373 20.7299 5.79837 20.7751C5.863 20.8202 5.9399 20.8445 6.01874 20.8447C6.09758 20.8449 6.1746 20.821 6.23946 20.7762L10.8217 17.7308C11.2083 17.7308 11.6043 17.7968 12.0003 17.7968C17.2048 17.7968 21.4288 14.5157 21.4288 10.4708C21.4288 6.42598 17.2048 3.15428 12.0003 3.15428Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoKakao;
