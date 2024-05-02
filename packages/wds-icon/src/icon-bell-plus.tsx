import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBellPlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.09951 20.1H14.8995V21.9H9.09951V20.1Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.9 9.4998V7.7998H20.5V9.4998H22.2V11.0998H20.5V12.7998H18.9V11.0998H17.2V9.4998H18.9Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.64937 10.2501C6.64937 8.16524 7.17662 6.58299 8.06149 5.53695C8.929 4.51142 10.2246 3.9001 11.9994 3.9001C13.7741 3.9001 15.0697 4.51142 15.9372 5.53695C16.2817 5.9441 16.5719 6.43249 16.798 7.00014H18.7033C18.399 5.99981 17.9369 5.11378 17.3115 4.37443C16.054 2.88789 14.2246 2.1001 11.9994 2.1001C9.77413 2.1001 7.94473 2.88789 6.68724 4.37443C5.44711 5.84045 4.84936 7.88322 4.84936 10.2501L4.84937 11.0001C4.84937 13.4653 4.16613 14.9249 3.19301 15.8683C2.81146 16.2381 2.77186 16.7499 2.90825 17.1265C3.04695 17.5094 3.42705 17.9001 3.99892 17.9001H19.9998C20.5717 17.9001 20.9518 17.5094 21.0905 17.1265C21.2269 16.7499 21.1873 16.2381 20.8057 15.8683C20.3182 15.3957 19.9034 14.7935 19.6109 14.0002H17.7214C17.9437 14.7969 18.2624 15.4931 18.6681 16.1001H5.33065C6.18123 14.8273 6.64937 13.1629 6.64937 11.0001L6.64937 10.2501Z"
      />
    </Box>
  );
});

export default IconBellPlus;
