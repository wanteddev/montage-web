import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconHomeFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.4534 2.28468C11.7761 2.03792 12.2241 2.03792 12.5468 2.28468L21.0468 8.78462C21.2695 8.95491 21.4001 9.21922 21.4001 9.49955L21.4001 18.9294C21.4001 19.1837 21.4002 19.4258 21.3835 19.6297C21.3653 19.8521 21.3229 20.1072 21.193 20.3622C21.0109 20.7197 20.7202 21.0104 20.3627 21.1925C20.1077 21.3224 19.8526 21.3648 19.6302 21.383C19.4262 21.3997 19.1842 21.3996 18.9299 21.3996L12.9004 21.3996V14H11.1004V21.3996L5.07034 21.3996C4.81604 21.3996 4.57396 21.3997 4.37001 21.383C4.14761 21.3648 3.8925 21.3224 3.63752 21.1925C3.28001 21.0104 2.98935 20.7197 2.80719 20.3622C2.67727 20.1072 2.63489 19.8521 2.61671 19.6297C2.60005 19.4257 2.60007 19.1837 2.6001 18.9294L2.6001 9.49955C2.6001 9.21922 2.73072 8.95491 2.9534 8.78462L11.4534 2.28468Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHomeFill;
