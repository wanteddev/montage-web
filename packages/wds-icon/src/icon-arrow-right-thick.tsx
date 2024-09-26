import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowRightThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.4192 11.0807C21.9269 11.5883 21.9269 12.4114 21.4192 12.9191L14.4192 19.9191C13.9116 20.4268 13.0885 20.4268 12.5808 19.9191C12.0731 19.4114 12.0731 18.5883 12.5808 18.0806L17.3615 13.2999H3.50005C2.78209 13.2999 2.20006 12.7179 2.20006 11.9999C2.20006 11.2819 2.78209 10.6999 3.50005 10.6999H17.3615L12.5808 5.91916C12.0731 5.41148 12.0731 4.58837 12.5808 4.08069C13.0885 3.57301 13.9116 3.57301 14.4192 4.08069L21.4192 11.0807Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowRightThick;
