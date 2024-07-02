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
        d="M11.6367 4.63889C11.9882 4.28742 11.9882 3.71758 11.6367 3.36611C11.2853 3.01464 10.7154 3.01464 10.364 3.36611L2.36404 11.366C2.01258 11.7175 2.01258 12.2873 2.36404 12.6388L10.364 20.6387C10.7154 20.9902 11.2853 20.9902 11.6367 20.6387C11.9882 20.2873 11.9882 19.7174 11.6367 19.3659L4.27321 12.0024L11.6367 4.63889ZM21.1367 4.63928C21.4881 4.28781 21.4881 3.71797 21.1367 3.3665C20.7852 3.01503 20.2154 3.01503 19.8639 3.3665L11.864 11.3664C11.5125 11.7179 11.5125 12.2877 11.864 12.6392L19.8639 20.6391C20.2154 20.9906 20.7852 20.9906 21.1367 20.6391C21.4881 20.2876 21.4881 19.7178 21.1367 19.3663L13.7731 12.0028L21.1367 4.63928Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDoubleLeft;
