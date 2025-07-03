import { useId } from 'react';

const IconDiamondGradient = () => {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        d="M3.88567 3.57256C3.87224 3.58869 3.85906 3.60465 3.8461 3.62034L3.80606 3.66867L1.5959 6.32086C1.43583 6.51286 1.28182 6.69761 1.17321 6.86748C1.15159 6.9013 1.13046 6.93646 1.11035 6.97302H6.71939L3.88567 3.57256Z"
        fill={`url(#${gradientId}-1)`}
      />
      <path
        d="M1.13094 8.17302C1.15425 8.21196 1.17874 8.24918 1.20375 8.28481C1.31957 8.44985 1.48139 8.62778 1.64957 8.81272L6.59376 14.2513C6.80331 14.4819 7.00043 14.6988 7.185 14.8526C7.25041 14.9072 7.32187 14.9604 7.4001 15.0077V8.17302H1.13094Z"
        fill={`url(#${gradientId}-2)`}
      />
      <path
        d="M8.6001 15.0077C8.67834 14.9604 8.74982 14.9072 8.81523 14.8526C8.9998 14.6988 9.19688 14.482 9.40642 14.2514L14.3507 8.81272C14.5188 8.62779 14.6807 8.44985 14.7965 8.28481C14.8215 8.24918 14.846 8.21196 14.8693 8.17302H8.6001V15.0077Z"
        fill={`url(#${gradientId}-3)`}
      />
      <path
        d="M14.8899 6.97302C14.8698 6.93646 14.8486 6.9013 14.827 6.86748C14.7184 6.69762 14.5644 6.51288 14.4044 6.32088L12.1942 3.66867L12.1541 3.62033C12.1412 3.60463 12.128 3.58867 12.1145 3.57253L9.2808 6.97302H14.8899Z"
        fill={`url(#${gradientId}-4)`}
      />
      <path
        d="M11.0483 2.9776C10.9522 2.97208 10.8588 2.97248 10.7717 2.97284L10.709 2.97302H5.29129L5.22852 2.97284C5.14139 2.97248 5.04801 2.97208 4.95192 2.9776L8.00009 6.63541L11.0483 2.9776Z"
        fill={`url(#${gradientId}-5)`}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-1`}
          x1="8.00012"
          y1="2.97266"
          x2="8.00012"
          y2="15.0077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-2`}
          x1="8.00012"
          y1="2.97266"
          x2="8.00012"
          y2="15.0077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-3`}
          x1="8.00012"
          y1="2.97266"
          x2="8.00012"
          y2="15.0077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-4`}
          x1="8.00012"
          y1="2.97266"
          x2="8.00012"
          y2="15.0077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-5`}
          x1="8.00012"
          y1="2.97266"
          x2="8.00012"
          y2="15.0077"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconDiamondGradient;
