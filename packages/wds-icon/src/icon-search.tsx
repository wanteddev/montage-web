import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconSearch = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99961 2.1001C5.63656 2.1001 2.09961 5.63705 2.09961 10.0001C2.09961 14.3631 5.63656 17.9001 9.99961 17.9001C11.8569 17.9001 13.5645 17.2592 14.9133 16.1864L19.8634 21.1365C20.2148 21.4879 20.7847 21.4879 21.1362 21.1365C21.4876 20.785 21.4876 20.2151 21.1362 19.8637L16.1861 14.9136C17.2587 13.5648 17.8996 11.8573 17.8996 10.0001C17.8996 5.63705 14.3627 2.1001 9.99961 2.1001ZM3.89961 10.0001C3.89961 6.63116 6.63067 3.9001 9.99961 3.9001C13.3685 3.9001 16.0996 6.63116 16.0996 10.0001C16.0996 13.369 13.3685 16.1001 9.99961 16.1001C6.63067 16.1001 3.89961 13.369 3.89961 10.0001Z"
      />
    </Box>
  );
});

export default IconSearch;
