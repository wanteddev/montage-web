import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCirclePoint = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.31947 15.3806C9.31947 15.8607 9.70861 16.2498 10.1886 16.2498C10.6687 16.2498 11.0578 15.8607 11.0578 15.3806V13.3721H12.2324C14.1704 13.3721 15.4977 12.2269 15.4977 10.5532C15.4977 8.89119 14.1704 7.746 12.2324 7.746H10.9195C10.3594 7.746 10.0794 7.746 9.86548 7.85499C9.67732 7.95086 9.52434 8.10384 9.42846 8.29201C9.31947 8.50592 9.31947 8.78594 9.31947 9.346V15.3806ZM12.2559 11.7865H11.0578V9.33165H12.2559C13.1896 9.33165 13.7476 9.78973 13.7476 10.5532C13.7476 11.3225 13.1896 11.7865 12.2559 11.7865Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.1001C6.53235 2.1001 2.09998 6.53248 2.09998 12.0001C2.09998 17.4677 6.53235 21.9001 12 21.9001C17.4676 21.9001 21.9 17.4677 21.9 12.0001C21.9 6.53248 17.4676 2.1001 12 2.1001ZM3.89998 12.0001C3.89998 7.52659 7.52647 3.9001 12 3.9001C16.4735 3.9001 20.1 7.52659 20.1 12.0001C20.1 16.4736 16.4735 20.1001 12 20.1001C7.52647 20.1001 3.89998 16.4736 3.89998 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePoint;
