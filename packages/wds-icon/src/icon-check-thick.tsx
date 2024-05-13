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
        d="M19.6698 6.58096C20.1775 7.08864 20.1775 7.91175 19.6698 8.41943L10.6698 17.4194C10.1621 17.9271 9.339 17.9271 8.83132 17.4194L4.33132 12.9194C3.82364 12.4118 3.82364 11.5886 4.33132 11.081C4.839 10.5733 5.66212 10.5733 6.1698 11.081L9.75056 14.6617L17.8313 6.58096C18.339 6.07327 19.1621 6.07327 19.6698 6.58096Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheckThick;
