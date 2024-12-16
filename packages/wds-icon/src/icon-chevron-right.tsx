import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.86351 3.3627C7.51204 3.71416 7.51204 4.28401 7.86351 4.63548L15.227 11.999L7.86351 19.3626C7.51204 19.714 7.51204 20.2839 7.86351 20.6353C8.21498 20.9868 8.78482 20.9868 9.13629 20.6353L17.1362 12.6354C17.4877 12.2839 17.4877 11.7141 17.1362 11.3626L9.13629 3.3627C8.78482 3.01123 8.21498 3.01123 7.86351 3.3627Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRight;
