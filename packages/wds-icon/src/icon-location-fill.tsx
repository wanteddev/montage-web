import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLocationFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.7342 21.3235C14.4597 20.7425 15.4296 19.9048 16.4026 18.8795C18.3087 16.8709 20.3998 13.9623 20.3998 10.7496C20.3998 6.11039 16.639 2.3496 11.9998 2.3496C7.36062 2.3496 3.59984 6.11039 3.59984 10.7496C3.59984 13.9623 5.69092 16.8709 7.59697 18.8795C8.56995 19.9048 9.53984 20.7425 10.2654 21.3235C10.6644 21.643 11.0706 21.957 11.4938 22.2443C11.7939 22.4473 12.2035 22.4482 12.504 22.2455C12.9279 21.9579 13.3346 21.6434 13.7342 21.3235ZM14.7499 10.7495C14.7499 12.2682 13.5187 13.4994 11.9999 13.4994C10.4811 13.4994 9.24994 12.2682 9.24994 10.7495C9.24994 9.23068 10.4811 7.99947 11.9999 7.99947C13.5187 7.99947 14.7499 9.23068 14.7499 10.7495Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLocationFill;
