import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconQuestion = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9241 15.5214C11.3405 15.5214 10.8586 15.0443 10.9226 14.4642C11.4077 10.0619 14.9298 10.371 14.9298 7.7254C14.9298 6.15211 13.6853 5.14239 11.9241 5.14239C10.417 5.14239 9.39359 5.86782 9.04775 7.14893C8.89565 7.71236 8.44533 8.19504 7.86174 8.19504C7.27815 8.19504 6.79342 7.71822 6.88831 7.1424C7.29135 4.69661 9.13518 3.16991 11.9241 3.16991C14.8593 3.16991 17.0432 4.86061 17.0432 7.7254C17.0432 11.2896 13.6467 11.0736 13.065 14.467C12.9665 15.0422 12.5077 15.5214 11.9241 15.5214Z"
        fill="currentColor"
      />
      <path
        d="M10.4682 19.2312C10.4682 20.0765 11.0788 20.6871 11.9241 20.6871C12.7695 20.6871 13.38 20.0765 13.38 19.2312C13.38 18.3859 12.7695 17.7753 11.9241 17.7753C11.0788 17.7753 10.4682 18.3859 10.4682 19.2312Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconQuestion;
