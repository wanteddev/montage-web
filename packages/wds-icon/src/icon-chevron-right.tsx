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
        d="M7.8635 3.36269C7.51203 3.71416 7.51203 4.284 7.8635 4.63547L15.227 11.999L7.8635 19.3625C7.51203 19.714 7.51203 20.2838 7.8635 20.6353C8.21497 20.9868 8.78481 20.9868 9.13628 20.6353L17.1362 12.6354C17.4877 12.2839 17.4877 11.7141 17.1362 11.3626L9.13628 3.36269C8.78481 3.01122 8.21497 3.01122 7.8635 3.36269Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRight;
