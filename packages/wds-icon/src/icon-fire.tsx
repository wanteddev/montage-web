import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFire = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.49935 15.0996C8.49935 16.9996 10.0493 18.4996 11.9993 18.4996C13.9493 18.4996 15.4993 16.9996 15.4993 15.0996C15.4993 13.1997 13.9493 11.6997 11.9993 9.99967C10.0493 11.6997 8.49935 13.1997 8.49935 15.0996Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2641 1.83126C13.505 1.1326 12.3105 1.30584 11.7663 2.16298L8.81013 6.81901L8.11054 6.18938C7.48768 5.6288 6.48748 5.60006 5.85927 6.26207C3.96076 8.26272 2.84935 10.8745 2.84935 13.6001C2.84935 16.13 3.78867 18.3441 5.43185 19.9238C7.07293 21.5015 9.36675 22.4 11.9993 22.4C17.3278 22.4 21.1493 18.5154 21.1493 13.6001C21.1493 9.43733 18.49 5.72066 14.2641 1.83126ZM9.75911 8.6825L13.1857 3.28557C17.2582 7.06264 19.3493 10.2839 19.3493 13.6001C19.3493 17.4847 16.3707 20.6 11.9993 20.6C9.78189 20.6 7.95073 19.8485 6.67932 18.6262C5.41001 17.406 4.64934 15.6701 4.64934 13.6001C4.64934 11.4302 5.51074 9.31212 7.03385 7.642L8.39725 8.86906C8.59413 9.04625 8.85905 9.12771 9.12147 9.09177C9.38388 9.05582 9.61714 8.90611 9.75911 8.6825Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFire;
