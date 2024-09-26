import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFlipBackward = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.63682 5.13598C8.98829 4.78451 8.98829 4.21466 8.63682 3.86319C8.28535 3.51172 7.7155 3.51172 7.36403 3.86319L2.86405 8.36317C2.69527 8.53195 2.60045 8.76087 2.60045 8.99956C2.60045 9.23826 2.69527 9.46717 2.86405 9.63596L7.36403 14.1359C7.7155 14.4874 8.28535 14.4874 8.63682 14.1359C8.98829 13.7845 8.98829 13.2146 8.63682 12.8631L5.67381 9.90015H15.5C17.7643 9.90015 19.5999 11.7358 19.5999 14.0001C19.5999 16.2645 17.7643 18.1001 15.5 18.1001H12C11.5029 18.1001 11.1 18.503 11.1 19.0001C11.1 19.4972 11.5029 19.9001 12 19.9001H15.5C18.7584 19.9001 21.3999 17.2586 21.3999 14.0001C21.3999 10.7417 18.7584 8.10015 15.5 8.10015H5.67264L8.63682 5.13598Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFlipBackward;
