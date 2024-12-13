import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.6367 4.63889C11.9881 4.28743 11.9881 3.71758 11.6367 3.36611C11.2852 3.01464 10.7154 3.01464 10.3639 3.36611L2.36396 11.366C2.01249 11.7175 2.01249 12.2874 2.36396 12.6388L10.3639 20.6388C10.7154 20.9902 11.2852 20.9902 11.6367 20.6388C11.9881 20.2873 11.9881 19.7174 11.6367 19.366L4.27313 12.0024L11.6367 4.63889ZM21.1366 4.63928C21.4881 4.28782 21.4881 3.71797 21.1366 3.3665C20.7851 3.01503 20.2153 3.01503 19.8638 3.3665L11.8639 11.3664C11.5124 11.7179 11.5124 12.2877 11.8639 12.6392L19.8638 20.6391C20.2153 20.9906 20.7851 20.9906 21.1366 20.6391C21.4881 20.2877 21.4881 19.7178 21.1366 19.3664L13.7731 12.0028L21.1366 4.63928Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDoubleLeft;
