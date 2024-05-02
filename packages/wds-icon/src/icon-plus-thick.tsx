import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPlusThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        d="M11.9997 1.9502C12.7177 1.9502 13.2997 2.53223 13.2997 3.2502V10.7002H20.7497C21.4677 10.7002 22.0497 11.2822 22.0497 12.0002C22.0497 12.7182 21.4677 13.3002 20.7497 13.3002H13.2997V20.7502C13.2997 21.4682 12.7177 22.0502 11.9997 22.0502C11.2817 22.0502 10.6997 21.4682 10.6997 20.7502V13.3002H3.24971C2.53174 13.3002 1.94971 12.7182 1.94971 12.0002C1.94971 11.2822 2.53174 10.7002 3.24971 10.7002H10.6997V3.2502C10.6997 2.53223 11.2817 1.9502 11.9997 1.9502Z"
      />
    </Box>
  );
});

export default IconPlusThick;
