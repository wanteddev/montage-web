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
        d="M11.9242 15.5209C11.3406 15.5209 10.8587 15.0438 10.9226 14.4637C11.4077 10.0614 14.9298 10.3705 14.9298 7.7249C14.9298 6.15161 13.6853 5.14189 11.9242 5.14189C10.4171 5.14189 9.39364 5.86732 9.0478 7.14843C8.8957 7.71186 8.44538 8.19454 7.86179 8.19454C7.2782 8.19454 6.79347 7.71772 6.88836 7.1419C7.2914 4.69612 9.13523 3.16942 11.9242 3.16942C14.8594 3.16942 17.0432 4.86011 17.0432 7.7249C17.0432 11.2891 13.6467 11.0731 13.0651 14.4665C12.9665 15.0417 12.5077 15.5209 11.9242 15.5209Z"
        fill="currentColor"
      />
      <path
        d="M10.4683 19.2307C10.4683 20.076 11.0788 20.6866 11.9242 20.6866C12.7695 20.6866 13.38 20.076 13.38 19.2307C13.38 18.3853 12.7695 17.7748 11.9242 17.7748C11.0788 17.7748 10.4683 18.3853 10.4683 19.2307Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconQuestion;
