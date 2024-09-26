import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowUpThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.0808 2.5807C11.5885 2.07302 12.4116 2.07302 12.9192 2.5807L19.9192 9.58066C20.4269 10.0883 20.4269 10.9115 19.9192 11.4191C19.4115 11.9268 18.5884 11.9268 18.0807 11.4191L13.3 6.63839V20.4998C13.3 21.2178 12.718 21.7998 12 21.7998C11.282 21.7998 10.7 21.2178 10.7 20.4998V6.63839L5.91928 11.4191C5.4116 11.9268 4.58849 11.9268 4.08081 11.4191C3.57313 10.9115 3.57313 10.0883 4.08081 9.58066L11.0808 2.5807Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpThick;
