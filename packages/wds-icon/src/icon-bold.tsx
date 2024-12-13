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
        d="M8.64997 20.4998C7.80989 20.4998 7.38985 20.4998 7.06899 20.3363C6.78675 20.1925 6.55728 19.963 6.41347 19.6808C6.24998 19.3599 6.24998 18.9399 6.24998 18.0998V5.89888C6.24998 5.0588 6.24998 4.63877 6.41347 4.3179C6.55728 4.03566 6.78675 3.80619 7.06899 3.66238C7.38985 3.49889 7.80989 3.49889 8.64997 3.49889H11.9395C15.1565 3.49889 17.2933 5.26003 17.2933 7.86652C17.2933 9.65115 16.2836 10.8957 14.4755 11.4593V11.5532C16.8354 12.0815 18.1622 13.5257 18.1622 15.686C18.1622 18.5743 15.814 20.4998 12.3152 20.4998H8.64997ZM12.3387 18.5743C14.6869 18.5743 16.0488 17.4471 16.0488 15.5451C16.0488 13.6431 14.6164 12.5159 12.1508 12.5159H8.31638V18.5743H12.3387ZM11.7751 10.6374C13.9354 10.6374 15.18 9.67463 15.18 8.03089C15.18 6.38716 14.0059 5.4244 11.963 5.4244H8.31638V10.6374H11.7751Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBold;
