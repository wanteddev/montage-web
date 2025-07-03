import { useId } from 'react';

const IconComponentGradient = () => {
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
        d="M1.2348 9.54117C0.883324 9.1897 0.883323 8.61985 1.2348 8.26837L3.23826 6.26491C3.58974 5.91343 4.15958 5.91343 4.51106 6.26491L6.51453 8.26837C6.866 8.61985 6.866 9.1897 6.51453 9.54117L4.51106 11.5446C4.15959 11.8961 3.58974 11.8961 3.23826 11.5446L1.2348 9.54117Z"
        fill={`url(#${gradientId}-1)`}
      />
      <path
        d="M5.36 13.6665C5.00853 13.315 5.00853 12.7452 5.36 12.3937L7.36347 10.3902C7.71494 10.0388 8.28479 10.0388 8.63626 10.3902L10.6397 12.3937C10.9912 12.7452 10.9912 13.315 10.6397 13.6665L8.63626 15.67C8.28479 16.0214 7.71494 16.0214 7.36347 15.67L5.36 13.6665Z"
        fill={`url(#${gradientId}-2)`}
      />
      <path
        d="M5.36 4.14403C5.00853 4.4955 5.00853 5.06535 5.36 5.41682L7.36347 7.42029C7.71494 7.77176 8.28479 7.77176 8.63626 7.42029L10.6397 5.41682C10.9912 5.06535 10.9912 4.4955 10.6397 4.14403L8.63626 2.14056C8.28479 1.78909 7.71494 1.78909 7.36347 2.14056L5.36 4.14403Z"
        fill={`url(#${gradientId}-3)`}
      />
      <path
        d="M9.48502 9.54182C9.13355 9.19035 9.13355 8.6205 9.48502 8.26903L11.4885 6.26556C11.84 5.91408 12.4098 5.91408 12.7613 6.26556L14.7648 8.26903C15.1162 8.6205 15.1162 9.19035 14.7648 9.54182L12.7613 11.5453C12.4098 11.8968 11.84 11.8968 11.4885 11.5453L9.48502 9.54182Z"
        fill={`url(#${gradientId}-4)`}
      />
      <defs>
        <linearGradient
          id={`${gradientId}-1`}
          x1="7.99977"
          y1="1.87695"
          x2="7.99977"
          y2="15.9336"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-2`}
          x1="7.99977"
          y1="1.87695"
          x2="7.99977"
          y2="15.9336"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-3`}
          x1="7.99977"
          y1="1.87695"
          x2="7.99977"
          y2="15.9336"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-4`}
          x1="7.99977"
          y1="1.87695"
          x2="7.99977"
          y2="15.9336"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB8F3" />
          <stop offset="1" stopColor="#DBD3FE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconComponentGradient;
