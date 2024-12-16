import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleLeftThick = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M21.4192 4.91744C21.9269 4.40976 21.9269 3.58665 21.4192 3.07898C20.9116 2.5713 20.0884 2.5713 19.5808 3.07898L11.5808 11.0789C11.0732 11.5866 11.0732 12.4097 11.5808 12.9174L19.5808 20.9173C20.0884 21.425 20.9116 21.425 21.4192 20.9173C21.9269 20.4096 21.9269 19.5865 21.4192 19.0788L14.3385 11.9981L21.4192 4.91744ZM11.9193 4.91763C12.427 4.40995 12.427 3.58685 11.9193 3.07917C11.4116 2.57149 10.5885 2.57149 10.0809 3.07917L2.08094 11.0791C1.57326 11.5868 1.57326 12.4099 2.08094 12.9176L10.0809 20.9175C10.5885 21.4252 11.4116 21.4252 11.9193 20.9175C12.427 20.4098 12.427 19.5867 11.9193 19.079L4.83863 11.9983L11.9193 4.91763Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftThick;
