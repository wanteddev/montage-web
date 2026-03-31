import { Box } from '@wanteddev/wds-engine';
import { forwardRef, useId } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 기본 표시를 위한 아이콘으로, 쓰지 않습니다.
 */
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
      <rect x="6" y="6" width="12" height="12" rx="2" fill={`url(#${id1})`} />
      <path
        d="M9.3449 3.2501C9.3449 2.75304 9.74784 2.3501 10.2449 2.3501H13.7423C14.2393 2.3501 14.6423 2.75304 14.6423 3.2501C14.6423 3.74715 14.2393 4.1501 13.7423 4.1501H10.2449C9.74784 4.1501 9.3449 3.74715 9.3449 3.2501Z"
        fill={`url(#${id2})`}
      />
      <path
        d="M7.64708 3.23579C7.66214 3.73262 7.27158 4.14758 6.77476 4.16264C5.91796 4.1886 5.56104 4.25649 5.30679 4.38724L5.29769 4.39192C4.91182 4.58486 4.5908 4.90691 4.37301 5.32224C4.24309 5.57633 4.17556 5.93372 4.14969 6.78772C4.13463 7.28455 3.71967 7.6751 3.22284 7.66005C2.72602 7.64499 2.33546 7.23003 2.35052 6.7332C2.37637 5.88016 2.43802 5.149 2.77358 4.49652L2.77632 4.49119C3.15361 3.76941 3.73723 3.16088 4.48822 2.78414C5.13952 2.45067 5.86923 2.38925 6.72024 2.36346C7.21706 2.34841 7.63203 2.73896 7.64708 3.23579Z"
        fill={`url(#${id3})`}
      />
      <path
        d="M16.3401 3.23579C16.3552 2.73896 16.7701 2.34841 17.2669 2.36346C18.118 2.38925 18.8477 2.45067 19.499 2.78413C20.25 3.16088 20.8336 3.76942 21.2108 4.4912L21.2136 4.49651C21.5492 5.14899 21.6108 5.88016 21.6367 6.7332C21.6517 7.23003 21.2612 7.64499 20.7643 7.66005C20.2675 7.6751 19.8526 7.28455 19.8375 6.78772C19.8116 5.93372 19.7441 5.57634 19.6142 5.32225C19.3964 4.90691 19.0754 4.58481 18.6895 4.39187L18.6804 4.3873C18.4261 4.25654 18.0692 4.1886 17.2124 4.16264C16.7156 4.14758 16.325 3.73262 16.3401 3.23579Z"
        fill={`url(#${id4})`}
      />
      <path
        d="M3.2501 9.34492C3.74716 9.34492 4.1501 9.74786 4.1501 10.2449V13.7423C4.1501 14.2394 3.74716 14.6423 3.2501 14.6423C2.75305 14.6423 2.35011 14.2394 2.35011 13.7423V10.2449C2.35011 9.74786 2.75305 9.34492 3.2501 9.34492Z"
        fill={`url(#${id5})`}
      />
      <path
        d="M20.7371 9.34492C21.2341 9.34492 21.6371 9.74786 21.6371 10.2449V13.7423C21.6371 14.2394 21.2341 14.6423 20.7371 14.6423C20.24 14.6423 19.8371 14.2394 19.8371 13.7423V10.2449C19.8371 9.74786 20.24 9.34492 20.7371 9.34492Z"
        fill={`url(#${id6})`}
      />
      <path
        d="M20.7773 16.3401C21.2741 16.3552 21.6647 16.7702 21.6496 17.267C21.6238 18.12 21.5621 18.8512 21.2266 19.5037L21.2238 19.509C20.8465 20.2308 20.2628 20.8394 19.5117 21.2161C18.8605 21.5495 18.1308 21.6109 17.2799 21.6367C16.7831 21.6518 16.3681 21.2612 16.3531 20.7644C16.338 20.2676 16.7286 19.8526 17.2254 19.8376C18.0822 19.8116 18.4391 19.7437 18.6933 19.6129L18.7024 19.6083C19.0883 19.4153 19.4093 19.0933 19.6271 18.6779C19.757 18.4239 19.8246 18.0665 19.8504 17.2125C19.8655 16.7156 20.2805 16.3251 20.7773 16.3401Z"
        fill={`url(#${id7})`}
      />
      <path
        d="M3.22284 16.3531C3.71967 16.338 4.13463 16.7286 4.14969 17.2254C4.17565 18.0822 4.24353 18.4392 4.37429 18.6934L4.37897 18.7025C4.57191 19.0884 4.89396 19.4094 5.30929 19.6272C5.56338 19.7571 5.92076 19.8246 6.77476 19.8505C7.27158 19.8656 7.66214 20.2805 7.64708 20.7774C7.63203 21.2742 7.21706 21.6647 6.72024 21.6497C5.8672 21.6238 5.13604 21.5622 4.48356 21.2266L4.47825 21.2239C3.75647 20.8466 3.14793 20.263 2.77119 19.512C2.43772 18.8607 2.37631 18.131 2.35052 17.2799C2.33546 16.7831 2.72602 16.3682 3.22284 16.3531Z"
        fill={`url(#${id8})`}
      />
      <path
        d="M9.3449 20.7371C9.3449 20.2401 9.74784 19.8371 10.2449 19.8371H13.7423C14.2393 19.8371 14.6423 20.2401 14.6423 20.7371C14.6423 21.2342 14.2393 21.6371 13.7423 21.6371H10.2449C9.74784 21.6371 9.3449 21.2342 9.3449 20.7371Z"
        fill={`url(#${id9})`}
      />
      <defs>
        <linearGradient
          id={id1}
          x1="12"
          y1="6"
          x2="12"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F7F7F8" />
        </linearGradient>
        <linearGradient
          id={id2}
          x1="12.0001"
          y1="2.3501"
          x2="12.0001"
          y2="21.6501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id3}
          x1="12.0001"
          y1="2.3501"
          x2="12.0001"
          y2="21.6501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id4}
          x1="12.0001"
          y1="2.3501"
          x2="12.0001"
          y2="21.6501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id5}
          x1="12.0001"
          y1="2.3501"
          x2="12.0001"
          y2="21.6501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id6}
          x1="12.0001"
          y1="2.3501"
          x2="12.0001"
          y2="21.6501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id7}
          x1="12.0001"
          y1="2.3501"
          x2="12.0001"
          y2="21.6501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id8}
          x1="12.0001"
          y1="2.3501"
          x2="12.0001"
          y2="21.6501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B84FF" />
          <stop offset="1" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient
          id={id9}
          x1="12.0001"
          y1="2.3501"
          x2="12.0001"
          y2="21.6501"
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
