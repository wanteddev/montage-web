import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUpThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.08098 16.4191C3.58866 16.9268 4.41177 16.9268 4.91945 16.4191L12.0002 9.3384L19.0809 16.4191C19.5886 16.9268 20.4117 16.9268 20.9194 16.4191C21.4271 15.9115 21.4271 15.0884 20.9194 14.5807L12.9194 6.5807C12.4117 6.07302 11.5886 6.07302 11.081 6.5807L3.08098 14.5807C2.5733 15.0884 2.5733 15.9115 3.08098 16.4191Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpThick;
