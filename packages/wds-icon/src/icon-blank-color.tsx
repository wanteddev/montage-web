import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useId } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBlankColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
  const id1 = useId();
  const id2 = useId();
  const id3 = useId();
  const id4 = useId();
  const id5 = useId();
  const id6 = useId();
  const id7 = useId();
  const id8 = useId();
  const id9 = useId();
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
        fill={`url(#${id1})`}
      />
      <path
        d="M9.34488 3.25008C9.34488 2.75303 9.74782 2.35009 10.2449 2.35009H13.7423C14.2393 2.35009 14.6423 2.75303 14.6423 3.25008C14.6423 3.74713 14.2393 4.15008 13.7423 4.15008H10.2449C9.74782 4.15008 9.34488 3.74713 9.34488 3.25008Z"
        fill={`url(#${id2})`}
      />
      <path
        d="M7.64706 3.23577C7.66212 3.7326 7.27157 4.14756 6.77474 4.16262C5.91794 4.18858 5.56102 4.25646 5.30677 4.38722L5.29767 4.3919C4.9118 4.58484 4.59079 4.90688 4.373 5.32221C4.24307 5.57631 4.17555 5.93369 4.14967 6.78769C4.13462 7.28451 3.71965 7.67506 3.22283 7.66001C2.726 7.64495 2.33545 7.22999 2.35051 6.73317C2.37636 5.88013 2.43801 5.14897 2.77357 4.49649L2.77631 4.49117C3.1536 3.7694 3.73721 3.16087 4.48821 2.78412C5.13951 2.45066 5.86921 2.38924 6.72022 2.36345C7.21705 2.3484 7.63201 2.73895 7.64706 3.23577Z"
        fill={`url(#${id3})`}
      />
      <path
        d="M16.3401 3.23577C16.3551 2.73895 16.7701 2.3484 17.2669 2.36345C18.1179 2.38924 18.8476 2.45066 19.4989 2.78412C20.2499 3.16086 20.8335 3.7694 21.2108 4.49118L21.2136 4.49648C21.5491 5.14896 21.6108 5.88013 21.6366 6.73317C21.6517 7.22999 21.2611 7.64495 20.7643 7.66001C20.2675 7.67506 19.8525 7.28451 19.8375 6.78769C19.8116 5.93369 19.7441 5.57631 19.6141 5.32222C19.3964 4.90689 19.0754 4.58479 18.6895 4.39185L18.6803 4.38727C18.4261 4.25651 18.0692 4.18858 17.2124 4.16262C16.7156 4.14756 16.325 3.7326 16.3401 3.23577Z"
        fill={`url(#${id4})`}
      />
      <path
        d="M3.25009 9.34487C3.74714 9.34487 4.15008 9.74781 4.15008 10.2449V13.7423C4.15008 14.2393 3.74714 14.6423 3.25009 14.6423C2.75304 14.6423 2.35009 14.2393 2.35009 13.7423V10.2449C2.35009 9.74781 2.75304 9.34487 3.25009 9.34487Z"
        fill={`url(#${id5})`}
      />
      <path
        d="M20.737 9.34487C21.2341 9.34487 21.637 9.74781 21.637 10.2449V13.7423C21.637 14.2393 21.2341 14.6423 20.737 14.6423C20.24 14.6423 19.837 14.2393 19.837 13.7423V10.2449C19.837 9.74781 20.24 9.34487 20.737 9.34487Z"
        fill={`url(#${id6})`}
      />
      <path
        d="M20.7773 16.3401C21.2741 16.3551 21.6646 16.7701 21.6496 17.2669C21.6237 18.1199 21.5621 18.8511 21.2265 19.5036L21.2238 19.5089C20.8464 20.2307 20.2628 20.8393 19.5117 21.216C18.8605 21.5494 18.1308 21.6108 17.2799 21.6366C16.783 21.6517 16.3681 21.2611 16.353 20.7643C16.338 20.2675 16.7285 19.8525 17.2253 19.8375C18.0821 19.8115 18.4391 19.7436 18.6933 19.6128L18.7024 19.6082C19.0883 19.4152 19.4093 19.0932 19.6271 18.6779C19.757 18.4238 19.8245 18.0664 19.8504 17.2124C19.8655 16.7156 20.2804 16.325 20.7773 16.3401Z"
        fill={`url(#${id7})`}
      />
      <path
        d="M3.22283 16.353C3.71965 16.338 4.13462 16.7285 4.14967 17.2253C4.17564 18.0821 4.24352 18.4391 4.37428 18.6933L4.37895 18.7024C4.57189 19.0883 4.89394 19.4093 5.30927 19.6271C5.56337 19.757 5.92074 19.8245 6.77474 19.8504C7.27157 19.8655 7.66212 20.2804 7.64706 20.7773C7.63201 21.2741 7.21705 21.6646 6.72022 21.6496C5.86718 21.6237 5.13603 21.5621 4.48355 21.2265L4.47823 21.2238C3.75646 20.8465 3.14792 20.2629 2.77117 19.5119C2.43771 18.8606 2.37629 18.1309 2.35051 17.2799C2.33545 16.783 2.726 16.3681 3.22283 16.353Z"
        fill={`url(#${id8})`}
      />
      <path
        d="M9.34488 20.737C9.34488 20.24 9.74782 19.837 10.2449 19.837H13.7423C14.2393 19.837 14.6423 20.24 14.6423 20.737C14.6423 21.2341 14.2393 21.637 13.7423 21.637H10.2449C9.74782 21.637 9.34488 21.2341 9.34488 20.737Z"
        fill={`url(#${id9})`}
      />
      <defs>
        <linearGradient
          id={id1}
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
          id={id2}
          x1="12"
          y1="2.35009"
          x2="12"
          y2="21.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id3}
          x1="12"
          y1="2.35009"
          x2="12"
          y2="21.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id4}
          x1="12"
          y1="2.35009"
          x2="12"
          y2="21.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id5}
          x1="12"
          y1="2.35009"
          x2="12"
          y2="21.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id6}
          x1="12"
          y1="2.35009"
          x2="12"
          y2="21.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id7}
          x1="12"
          y1="2.35009"
          x2="12"
          y2="21.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id8}
          x1="12"
          y1="2.35009"
          x2="12"
          y2="21.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id9}
          x1="12"
          y1="2.35009"
          x2="12"
          y2="21.65"
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
