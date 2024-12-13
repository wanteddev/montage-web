import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconAlignRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49984 4.60057C4.00279 4.60057 3.59984 5.00352 3.59984 5.50057C3.59984 5.99763 4.00279 6.40057 4.49984 6.40057H19.4998C19.9969 6.40057 20.3998 5.99763 20.3998 5.50057C20.3998 5.00352 19.9969 4.60057 19.4998 4.60057H4.49984Z"
        fill="currentColor"
      />
      <path
        d="M9.49983 8.93389C9.00277 8.93389 8.59983 9.33683 8.59983 9.83389C8.59983 10.3309 9.00277 10.7339 9.49983 10.7339H19.4998C19.9969 10.7339 20.3998 10.3309 20.3998 9.83389C20.3998 9.33683 19.9969 8.93389 19.4998 8.93389H9.49983Z"
        fill="currentColor"
      />
      <path
        d="M3.59984 14.1672C3.59984 13.6701 4.00279 13.2672 4.49984 13.2672H19.4998C19.9969 13.2672 20.3998 13.6701 20.3998 14.1672C20.3998 14.6642 19.9969 15.0672 19.4998 15.0672H4.49984C4.00279 15.0672 3.59984 14.6642 3.59984 14.1672Z"
        fill="currentColor"
      />
      <path
        d="M9.49983 17.6005C9.00277 17.6005 8.59983 18.0034 8.59983 18.5005C8.59983 18.9976 9.00277 19.4005 9.49983 19.4005H19.4998C19.9969 19.4005 20.3998 18.9976 20.3998 18.5005C20.3998 18.0034 19.9969 17.6005 19.4998 17.6005H9.49983Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignRight;
