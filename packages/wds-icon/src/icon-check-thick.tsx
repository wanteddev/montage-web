import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCheckThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.6697 6.58093C20.1774 7.08861 20.1774 7.91172 19.6697 8.4194L10.6698 17.4194C10.1621 17.927 9.33897 17.927 8.83129 17.4194L4.33131 12.9194C3.82363 12.4117 3.82363 11.5886 4.33131 11.0809C4.83899 10.5732 5.6621 10.5732 6.16978 11.0809L9.75052 14.6617L17.8313 6.58093C18.3389 6.07325 19.162 6.07325 19.6697 6.58093Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheckThick;
