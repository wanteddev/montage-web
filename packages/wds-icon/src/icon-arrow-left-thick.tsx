import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowLeftThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.58094 11.0808C2.07326 11.5884 2.07326 12.4115 2.58094 12.9192L9.5809 19.9192C10.0886 20.4269 10.9117 20.4269 11.4194 19.9192C11.9271 19.4115 11.9271 18.5884 11.4194 18.0807L6.63864 13.3H20.5001C21.2181 13.3 21.8001 12.718 21.8001 12C21.8001 11.282 21.2181 10.7 20.5001 10.7L6.63864 10.7L11.4194 5.91926C11.9271 5.41158 11.9271 4.58847 11.4194 4.08079C10.9117 3.57311 10.0886 3.57311 9.5809 4.08079L2.58094 11.0808Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeftThick;
