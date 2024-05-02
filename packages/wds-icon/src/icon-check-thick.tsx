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
        d="M19.6694 6.58096C20.1771 7.08864 20.1771 7.91175 19.6694 8.41943L10.6694 17.4194C10.1618 17.9271 9.33864 17.9271 8.83096 17.4194L4.33096 12.9194C3.82327 12.4118 3.82327 11.5886 4.33096 11.081C4.83864 10.5733 5.66175 10.5733 6.16943 11.081L9.7502 14.6617L17.831 6.58096C18.3386 6.07327 19.1618 6.07327 19.6694 6.58096Z"
      />
    </Box>
  );
});

export default IconCheckThick;
