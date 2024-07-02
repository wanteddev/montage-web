import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBlankColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
      <rect
        x="5.99997"
        y="5.99997"
        width="11.9999"
        height="11.9999"
        rx="2"
        fill="url(#paint0_linear_6_216)"
      />
      <path
        d="M9.34488 3.24996C9.34488 2.75291 9.74782 2.34996 10.2449 2.34996H13.7423C14.2393 2.34996 14.6423 2.75291 14.6423 3.24996C14.6423 3.74701 14.2393 4.14995 13.7423 4.14995H10.2449C9.74782 4.14995 9.34488 3.74701 9.34488 3.24996Z"
        fill="url(#paint1_linear_6_216)"
      />
      <path
        d="M7.64706 3.23565C7.66212 3.73248 7.27157 4.14744 6.77474 4.16249C5.91794 4.18846 5.56102 4.25634 5.30677 4.3871L5.29767 4.39178C4.9118 4.58471 4.59079 4.90676 4.373 5.32209C4.24307 5.57618 4.17555 5.93357 4.14967 6.78756C4.13462 7.28439 3.71965 7.67494 3.22283 7.65989C2.726 7.64483 2.33545 7.22987 2.35051 6.73304C2.37636 5.88001 2.43801 5.14885 2.77357 4.49637L2.77631 4.49105C3.1536 3.76927 3.73721 3.16075 4.48821 2.784C5.13951 2.45054 5.86921 2.38912 6.72022 2.36333C7.21705 2.34827 7.63201 2.73883 7.64706 3.23565Z"
        fill="url(#paint2_linear_6_216)"
      />
      <path
        d="M16.3401 3.23565C16.3551 2.73883 16.7701 2.34827 17.2669 2.36333C18.1179 2.38912 18.8476 2.45054 19.4989 2.784C20.2499 3.16074 20.8335 3.76928 21.2108 4.49106L21.2136 4.49636C21.5491 5.14884 21.6108 5.88001 21.6366 6.73304C21.6517 7.22987 21.2611 7.64483 20.7643 7.65989C20.2675 7.67494 19.8525 7.28439 19.8375 6.78756C19.8116 5.93357 19.7441 5.57619 19.6141 5.3221C19.3964 4.90677 19.0754 4.58466 18.6895 4.39173L18.6803 4.38715C18.4261 4.25639 18.0692 4.18846 17.2124 4.16249C16.7156 4.14744 16.325 3.73248 16.3401 3.23565Z"
        fill="url(#paint3_linear_6_216)"
      />
      <path
        d="M3.25009 9.34475C3.74714 9.34475 4.15008 9.74769 4.15008 10.2447V13.7421C4.15008 14.2392 3.74714 14.6421 3.25009 14.6421C2.75304 14.6421 2.35009 14.2392 2.35009 13.7421V10.2447C2.35009 9.74769 2.75304 9.34475 3.25009 9.34475Z"
        fill="url(#paint4_linear_6_216)"
      />
      <path
        d="M20.737 9.34475C21.2341 9.34475 21.637 9.74769 21.637 10.2447V13.7421C21.637 14.2392 21.2341 14.6421 20.737 14.6421C20.24 14.6421 19.837 14.2392 19.837 13.7421V10.2447C19.837 9.74769 20.24 9.34475 20.737 9.34475Z"
        fill="url(#paint5_linear_6_216)"
      />
      <path
        d="M20.7773 16.3399C21.2741 16.355 21.6646 16.77 21.6496 17.2668C21.6237 18.1198 21.5621 18.851 21.2265 19.5035L21.2238 19.5088C20.8464 20.2306 20.2628 20.8392 19.5117 21.2159C18.8605 21.5493 18.1308 21.6107 17.2799 21.6365C16.783 21.6516 16.3681 21.261 16.353 20.7642C16.338 20.2673 16.7285 19.8524 17.2253 19.8373C18.0821 19.8114 18.4391 19.7435 18.6933 19.6127L18.7024 19.6081C19.0883 19.4151 19.4093 19.0931 19.6271 18.6777C19.757 18.4236 19.8245 18.0663 19.8504 17.2123C19.8655 16.7154 20.2804 16.3249 20.7773 16.3399Z"
        fill="url(#paint6_linear_6_216)"
      />
      <path
        d="M3.22283 16.3529C3.71965 16.3378 4.13462 16.7284 4.14967 17.2252C4.17564 18.082 4.24352 18.4389 4.37428 18.6932L4.37895 18.7023C4.57189 19.0882 4.89394 19.4092 5.30927 19.627C5.56337 19.7569 5.92074 19.8244 6.77474 19.8503C7.27157 19.8653 7.66212 20.2803 7.64706 20.7771C7.63201 21.274 7.21705 21.6645 6.72022 21.6495C5.86718 21.6236 5.13603 21.562 4.48355 21.2264L4.47823 21.2236C3.75646 20.8463 3.14792 20.2627 2.77117 19.5117C2.43771 18.8604 2.37629 18.1307 2.35051 17.2797C2.33545 16.7829 2.726 16.368 3.22283 16.3529Z"
        fill="url(#paint7_linear_6_216)"
      />
      <path
        d="M9.34488 20.7369C9.34488 20.2399 9.74782 19.8369 10.2449 19.8369H13.7423C14.2393 19.8369 14.6423 20.2399 14.6423 20.7369C14.6423 21.234 14.2393 21.6369 13.7423 21.6369H10.2449C9.74782 21.6369 9.34488 21.234 9.34488 20.7369Z"
        fill="url(#paint8_linear_6_216)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6_216"
          x1="11.9999"
          y1="5.99997"
          x2="11.9999"
          y2="17.9999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F7F7F8" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_6_216"
          x1="12"
          y1="2.34996"
          x2="12"
          y2="21.6499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_6_216"
          x1="12"
          y1="2.34996"
          x2="12"
          y2="21.6499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_6_216"
          x1="12"
          y1="2.34996"
          x2="12"
          y2="21.6499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_6_216"
          x1="12"
          y1="2.34996"
          x2="12"
          y2="21.6499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_6_216"
          x1="12"
          y1="2.34996"
          x2="12"
          y2="21.6499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_6_216"
          x1="12"
          y1="2.34996"
          x2="12"
          y2="21.6499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_6_216"
          x1="12"
          y1="2.34996"
          x2="12"
          y2="21.6499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_6_216"
          x1="12"
          y1="2.34996"
          x2="12"
          y2="21.6499"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
      </defs>
    </Box>
  );
});

export default IconBlankColor;
