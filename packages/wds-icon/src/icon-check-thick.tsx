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
        d="M19.6696 6.58092C20.1773 7.0886 20.1773 7.91171 19.6696 8.41939L10.6696 17.4193C10.1619 17.927 9.33883 17.927 8.83116 17.4193L4.33118 12.9194C3.8235 12.4117 3.8235 11.5886 4.33118 11.0809C4.83886 10.5732 5.66197 10.5732 6.16965 11.0809L9.75039 14.6616L17.8311 6.58092C18.3388 6.07324 19.1619 6.07324 19.6696 6.58092Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheckThick;
