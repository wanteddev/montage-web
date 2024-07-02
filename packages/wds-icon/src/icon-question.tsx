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
        d="M11.9242 15.5214C11.3406 15.5214 10.8587 15.0443 10.9226 14.4642C11.4077 10.0618 14.9298 10.371 14.9298 7.72539C14.9298 6.1521 13.6853 5.14238 11.9242 5.14238C10.4171 5.14238 9.39364 5.86781 9.0478 7.14892C8.8957 7.71235 8.44538 8.19503 7.86179 8.19503C7.2782 8.19503 6.79347 7.71821 6.88836 7.14239C7.2914 4.6966 9.13523 3.16991 11.9242 3.16991C14.8594 3.16991 17.0432 4.8606 17.0432 7.72539C17.0432 11.2896 13.6467 11.0736 13.0651 14.467C12.9665 15.0422 12.5077 15.5214 11.9242 15.5214Z"
        fill="currentColor"
      />
      <path
        d="M10.4683 19.2312C10.4683 20.0765 11.0788 20.6871 11.9242 20.6871C12.7695 20.6871 13.38 20.0765 13.38 19.2312C13.38 18.3858 12.7695 17.7753 11.9242 17.7753C11.0788 17.7753 10.4683 18.3858 10.4683 19.2312Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconQuestion;
