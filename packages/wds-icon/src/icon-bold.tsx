import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBold = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.64996 20.4998C7.80988 20.4998 7.38984 20.4998 7.06898 20.3363C6.78674 20.1925 6.55727 19.963 6.41346 19.6807C6.24997 19.3599 6.24997 18.9398 6.24997 18.0998V5.89887C6.24997 5.0588 6.24997 4.63876 6.41346 4.31789C6.55727 4.03565 6.78674 3.80618 7.06898 3.66237C7.38984 3.49888 7.80988 3.49888 8.64996 3.49888H11.9395C15.1565 3.49888 17.2933 5.26002 17.2933 7.86651C17.2933 9.65113 16.2836 10.8957 14.4755 11.4592V11.5532C16.8354 12.0815 18.1622 13.5256 18.1622 15.686C18.1622 18.5742 15.814 20.4998 12.3152 20.4998H8.64996ZM12.3387 18.5742C14.6868 18.5742 16.0488 17.4471 16.0488 15.5451C16.0488 13.6431 14.6164 12.5159 12.1508 12.5159H8.31637V18.5742H12.3387ZM11.7751 10.6374C13.9354 10.6374 15.18 9.67461 15.18 8.03088C15.18 6.38715 14.0059 5.4244 11.9629 5.4244H8.31637V10.6374H11.7751Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBold;
