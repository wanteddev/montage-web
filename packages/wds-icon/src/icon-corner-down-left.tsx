import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCornerDownLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.2 3.90038C19.697 3.90038 20.1 4.30332 20.1 4.80038V6.10035C20.1 7.57863 20.1 8.74319 20.0234 9.68036C19.9453 10.6365 19.783 11.4349 19.4133 12.1605C18.8093 13.3459 17.8455 14.3097 16.6601 14.9137C15.9345 15.2834 15.1361 15.4457 14.18 15.5238C13.2428 15.6004 12.0783 15.6004 10.6 15.6004H6.9728L9.9364 18.5639C10.2879 18.9154 10.2879 19.4853 9.9364 19.8367C9.58492 20.1882 9.01508 20.1882 8.66361 19.8367L4.16362 15.3367C3.81215 14.9853 3.81215 14.4154 4.16362 14.064L8.66361 9.56397C9.01508 9.2125 9.58492 9.2125 9.9364 9.56397C10.2879 9.91544 10.2879 10.4853 9.9364 10.8368L6.9728 13.8004H10.56C12.087 13.8004 13.1781 13.7997 14.0334 13.7298C14.8782 13.6608 15.4134 13.5287 15.8429 13.3099C16.6897 12.8785 17.3781 12.19 17.8095 11.3433C18.0284 10.9138 18.1604 10.3786 18.2294 9.53379C18.2993 8.67848 18.3 7.58736 18.3 6.06038V4.80038C18.3 4.30332 18.7029 3.90038 19.2 3.90038Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCornerDownLeft;
