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
        d="M11.9242 15.5214C11.3406 15.5214 10.8587 15.0444 10.9226 14.4643C11.4077 10.0619 14.9298 10.3711 14.9298 7.72543C14.9298 6.15213 13.6853 5.14241 11.9242 5.14241C10.4171 5.14241 9.39363 5.86784 9.04779 7.14896C8.89569 7.71238 8.44537 8.19507 7.86177 8.19507C7.27818 8.19507 6.79344 7.71825 6.88833 7.14242C7.29138 4.69663 9.13521 3.16992 11.9242 3.16992C14.8594 3.16992 17.0432 4.86063 17.0432 7.72543C17.0432 11.2897 13.6467 11.0736 13.0651 14.4671C12.9665 15.0423 12.5077 15.5214 11.9242 15.5214Z"
        fill="currentColor"
      />
      <path
        d="M10.4683 19.2313C10.4683 20.0766 11.0788 20.6872 11.9242 20.6872C12.7695 20.6872 13.38 20.0766 13.38 19.2313C13.38 18.3859 12.7695 17.7754 11.9242 17.7754C11.0788 17.7754 10.4683 18.3859 10.4683 19.2313Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconQuestion;
